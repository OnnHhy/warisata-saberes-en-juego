// Lógica de la pantalla del JUGADOR (jugar.html)
// Cada estudiante abre esta pantalla en su propio celular o laptop.

const vistaUnirse = document.getElementById("vista-unirse");
const vistaEspera = document.getElementById("vista-espera");
const vistaJuego = document.getElementById("vista-juego");
const vistaResultadoFinal = document.getElementById("vista-resultado-final");

let codigoSala = null;
let refSala = null;
let idJugador = generarIdJugador();
let modoActual = "equipos";
let equipoElegido = 0;
let indicePreguntaVisto = -1;
let inicioPregunta = null;
let yaRespondioEstaPregunta = false;

// Precargar el código de sala si vino en la URL (?sala=XXXX)
const params = new URLSearchParams(window.location.search);
if (params.get("sala")) {
  document.getElementById("input-codigo").value = params.get("sala").toUpperCase();
}

document.getElementById("btn-unirse").addEventListener("click", unirseASala);

function unirseASala() {
  const codigo = document.getElementById("input-codigo").value.trim().toUpperCase();
  const nombre = document.getElementById("input-nombre").value.trim();
  const errorEl = document.getElementById("error-unirse");
  errorEl.textContent = "";

  if (!codigo || !nombre) {
    errorEl.textContent = "Escribe el código de sala y tu nombre.";
    return;
  }

  refSala = db.ref("salas/" + codigo);

  refSala.once("value", (snap) => {
    const sala = snap.val();
    if (!sala) {
      errorEl.textContent = "No encontramos esa sala. Revisa el código.";
      return;
    }
    if (sala.estado !== "lobby") {
      errorEl.textContent = "Esta partida ya comenzó. Pide al anfitrión una sala nueva.";
      return;
    }

    codigoSala = codigo;
    modoActual = sala.modo || "equipos";

    if (modoActual === "equipos") {
      mostrarSelectorEquipo(nombre);
    } else {
      registrarJugador(nombre, null);
    }
  });
}

function mostrarSelectorEquipo(nombre) {
  vistaUnirse.classList.add("oculto");
  const cont = document.getElementById("vista-elegir-equipo");
  cont.classList.remove("oculto");

  const grilla = document.getElementById("grilla-equipos-jugador");
  grilla.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    const btn = document.createElement("button");
    btn.className = "boton";
    btn.style.background = COLORES_EQUIPO[i % COLORES_EQUIPO.length];
    btn.style.color = "#17122b";
    btn.textContent = `${ICONOS_EQUIPO[i % ICONOS_EQUIPO.length]} Equipo ${i + 1}`;
    btn.addEventListener("click", () => {
      equipoElegido = i;
      cont.classList.add("oculto");
      registrarJugador(nombre, i);
    });
    grilla.appendChild(btn);
  }
}

function registrarJugador(nombre, equipo) {
  const datos = { nombre, conectado: Date.now() };
  if (equipo !== null) datos.equipo = equipo;

  refSala.child("jugadores/" + idJugador).set(datos).then(() => {
    document.getElementById("vista-unirse").classList.add("oculto");
    document.getElementById("vista-elegir-equipo").classList.add("oculto");
    vistaEspera.classList.remove("oculto");
    document.getElementById("nombre-confirmado").textContent = nombre;

    if (equipo !== null) {
      const banner = document.getElementById("banner-equipo-jugador");
      banner.classList.remove("oculto");
      banner.style.background = COLORES_EQUIPO[equipo % COLORES_EQUIPO.length];
      banner.textContent = `${ICONOS_EQUIPO[equipo % ICONOS_EQUIPO.length]} Estás en el Equipo ${equipo + 1}`;
    }

    escucharEstadoSala();
  });
}

function escucharEstadoSala() {
  refSala.on("value", (snap) => {
    const sala = snap.val();
    if (!sala) return;

    if (sala.estado === "jugando" && sala.indicePregunta > -1 && sala.indicePregunta !== indicePreguntaVisto) {
      indicePreguntaVisto = sala.indicePregunta;
      mostrarPregunta(indicePreguntaVisto);
    }

    if (sala.estado === "final") {
      mostrarResultadoFinal(sala.equipos || {});
    }
  });
}

function mostrarPregunta(indice) {
  const p = obtenerPreguntaPlana(indice);
  if (!p) return;

  yaRespondioEstaPregunta = false;
  inicioPregunta = Date.now();

  vistaEspera.classList.add("oculto");
  vistaResultadoFinal.classList.add("oculto");
  vistaJuego.classList.remove("oculto");

  document.getElementById("pregunta-jugador-numero").textContent = `Pregunta ${indice + 1}`;
  document.getElementById("pregunta-jugador-texto").textContent = p.texto;

  const grilla = document.getElementById("grilla-opciones-jugador");
  grilla.innerHTML = "";
  document.getElementById("confirmacion-jugador").classList.add("oculto");
  grilla.classList.remove("oculto");

  p.opciones.forEach((op, i) => {
    const btn = document.createElement("button");
    btn.className = `opcion op-${i}`;
    btn.textContent = op;
    btn.addEventListener("click", () => responder(i, p));
    grilla.appendChild(btn);
  });
}

function responder(indiceOpcion, pregunta) {
  if (yaRespondioEstaPregunta) return;
  yaRespondioEstaPregunta = true;

  const segundosUsados = (Date.now() - inicioPregunta) / 1000;
  const tiempoRestante = Math.max(0, pregunta.tiempo - segundosUsados);

  refSala.child("respuestas/" + idJugador).set({
    opcion: indiceOpcion,
    tiempoRestante,
  });

  document.getElementById("grilla-opciones-jugador").classList.add("oculto");
  document.getElementById("confirmacion-jugador").classList.remove("oculto");
}

function obtenerPreguntaPlana(indiceGlobal) {
  let acumulado = 0;
  for (const ronda of RONDAS) {
    if (indiceGlobal < acumulado + ronda.preguntas.length) {
      return ronda.preguntas[indiceGlobal - acumulado];
    }
    acumulado += ronda.preguntas.length;
  }
  return null;
}

function mostrarResultadoFinal(equipos) {
  vistaJuego.classList.add("oculto");
  vistaEspera.classList.add("oculto");
  vistaResultadoFinal.classList.remove("oculto");

  const claveEquipo = modoActual === "equipos" ? equipoElegido : idJugador;
  const miEquipo = equipos[claveEquipo];
  const lista = Object.values(equipos).sort((a, b) => (b.puntaje || 0) - (a.puntaje || 0));
  const puesto = lista.findIndex((e) => miEquipo && e.puntaje === miEquipo.puntaje) + 1;

  document.getElementById("puntaje-final-jugador").textContent = miEquipo ? miEquipo.puntaje || 0 : 0;
  document.getElementById("puesto-final-jugador").textContent = puesto || "-";
}
