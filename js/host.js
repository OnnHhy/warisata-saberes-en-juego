// Lógica de la pantalla del ANFITRIÓN (host.html)
// El host proyecta esta pantalla en el pizarrón/proyector del aula.

const vistaInicio = document.getElementById("vista-inicio");
const vistaLobby = document.getElementById("vista-lobby");
const vistaPregunta = document.getElementById("vista-pregunta");
const vistaRanking = document.getElementById("vista-ranking");
const vistaFinal = document.getElementById("vista-final");

let codigoSala = null;
let refSala = null;
let modoJuego = "equipos"; // "equipos" | "individual"
let indicePreguntaGlobal = -1; // índice acumulado entre todas las rondas
let preguntasPlanas = []; // todas las preguntas de todas las rondas, en orden
let timerInterval = null;
let respuestasYaCalificadas = false;

// Aplana todas las rondas en una sola lista de preguntas con su info de ronda
RONDAS.forEach((ronda) => {
  ronda.preguntas.forEach((p) => {
    preguntasPlanas.push({ ...p, rondaNombre: ronda.nombre, rondaIcono: ronda.icono });
  });
});

document.getElementById("btn-crear-sala").addEventListener("click", crearSala);
document.getElementById("btn-modo-equipos").addEventListener("click", () => seleccionarModo("equipos"));
document.getElementById("btn-modo-individual").addEventListener("click", () => seleccionarModo("individual"));
document.getElementById("btn-iniciar-juego").addEventListener("click", iniciarJuego);
document.getElementById("btn-siguiente").addEventListener("click", pasarASiguientePregunta);
document.getElementById("btn-ver-final").addEventListener("click", mostrarFinal);
document.getElementById("btn-guardar-top").addEventListener("click", guardarEnRankingGlobal);
document.getElementById("btn-nueva-partida").addEventListener("click", () => location.reload());

function seleccionarModo(modo) {
  modoJuego = modo;
  document.getElementById("btn-modo-equipos").classList.toggle("secundario", modo !== "equipos");
  document.getElementById("btn-modo-individual").classList.toggle("secundario", modo !== "individual");
}

function crearSala() {
  codigoSala = generarCodigoSala();
  refSala = db.ref("salas/" + codigoSala);

  const estadoInicial = {
    estado: "lobby",
    modo: modoJuego,
    creada: Date.now(),
    indicePregunta: -1,
    jugadores: {},
    equipos: {},
    respuestas: {},
  };

  refSala.set(estadoInicial).then(() => {
    document.getElementById("codigo-mostrado").textContent = codigoSala;
    const enlace = urlDeSala(codigoSala);
    document.getElementById("enlace-sala").href = enlace;
    document.getElementById("enlace-sala").textContent = enlace;

    // Generar QR con la librería qrcode.js (cargada en host.html)
    const qrDiv = document.getElementById("qr");
    qrDiv.innerHTML = "";
    new QRCode(qrDiv, { text: enlace, width: 180, height: 180, colorDark: "#17122b", colorLight: "#f2e9d8" });

    vistaInicio.classList.add("oculto");
    vistaLobby.classList.remove("oculto");

    escucharLobby();
  });
}

function escucharLobby() {
  refSala.child("jugadores").on("value", (snap) => {
    const jugadores = snap.val() || {};
    renderizarLobby(jugadores);
  });
}

function renderizarLobby(jugadores) {
  const contenedor = document.getElementById("grilla-lobby");
  contenedor.innerHTML = "";
  const total = Object.keys(jugadores).length;
  document.getElementById("contador-jugadores").textContent = total;

  if (modoJuego === "equipos") {
    // Agrupar por equipo
    const grupos = {};
    Object.values(jugadores).forEach((j) => {
      grupos[j.equipo] = grupos[j.equipo] || [];
      grupos[j.equipo].push(j.nombre);
    });
    Object.keys(grupos).forEach((equipo) => {
      const idx = parseInt(equipo, 10);
      const div = document.createElement("div");
      div.className = "chip-equipo";
      div.style.background = COLORES_EQUIPO[idx % COLORES_EQUIPO.length];
      div.innerHTML = `${ICONOS_EQUIPO[idx % ICONOS_EQUIPO.length]} Equipo ${idx + 1}
        <div class="miembros">${grupos[equipo].join(", ")}</div>`;
      contenedor.appendChild(div);
    });
  } else {
    Object.values(jugadores).forEach((j, idx) => {
      const div = document.createElement("div");
      div.className = "chip-equipo";
      div.style.background = COLORES_EQUIPO[idx % COLORES_EQUIPO.length];
      div.textContent = `${ICONOS_EQUIPO[idx % ICONOS_EQUIPO.length]} ${j.nombre}`;
      contenedor.appendChild(div);
    });
  }

  document.getElementById("btn-iniciar-juego").disabled = total === 0;
}

function iniciarJuego() {
  refSala.child("jugadores").once("value", (snap) => {
    const jugadores = snap.val() || {};
    const equipos = {};

    if (modoJuego === "equipos") {
      const idsPorEquipo = {};
      Object.entries(jugadores).forEach(([id, j]) => {
        idsPorEquipo[j.equipo] = idsPorEquipo[j.equipo] || [];
        idsPorEquipo[j.equipo].push(id);
      });
      Object.keys(idsPorEquipo).forEach((eq) => {
        equipos[eq] = { nombre: "Equipo " + (parseInt(eq, 10) + 1), puntaje: 0 };
      });
    } else {
      Object.entries(jugadores).forEach(([id, j], idx) => {
        equipos[id] = { nombre: j.nombre, puntaje: 0 };
      });
    }

    refSala.update({ equipos, estado: "jugando" }).then(() => {
      vistaLobby.classList.add("oculto");
      vistaPregunta.classList.remove("oculto");
      indicePreguntaGlobal = -1;
      pasarASiguientePregunta();
    });
  });
}

function pasarASiguientePregunta() {
  indicePreguntaGlobal++;
  respuestasYaCalificadas = false;
  clearInterval(timerInterval);

  if (indicePreguntaGlobal >= preguntasPlanas.length) {
    mostrarFinal();
    return;
  }

  const p = preguntasPlanas[indicePreguntaGlobal];

  refSala.update({
    indicePregunta: indicePreguntaGlobal,
    estado: "jugando",
    respuestas: {},
  });

  vistaRanking.classList.add("oculto");
  vistaPregunta.classList.remove("oculto");
  document.getElementById("btn-siguiente").classList.add("oculto");

  document.getElementById("ronda-actual").textContent = `${p.rondaIcono} ${p.rondaNombre}`;
  document.getElementById("numero-pregunta").textContent = `Pregunta ${indicePreguntaGlobal + 1} de ${preguntasPlanas.length}`;
  document.getElementById("texto-pregunta").textContent = p.texto;

  const grilla = document.getElementById("grilla-opciones-host");
  grilla.innerHTML = "";
  p.opciones.forEach((op, i) => {
    const btn = document.createElement("div");
    btn.className = `opcion op-${i}`;
    btn.textContent = op;
    grilla.appendChild(btn);
  });

  let restante = p.tiempo;
  const barra = document.getElementById("barra-tiempo");
  barra.style.transition = "none";
  barra.style.width = "100%";
  // forzar reflow para reiniciar animación
  void barra.offsetWidth;
  barra.style.transition = `width ${p.tiempo}s linear`;
  requestAnimationFrame(() => (barra.style.width = "0%"));

  timerInterval = setInterval(() => {
    restante--;
    if (restante <= 0) {
      clearInterval(timerInterval);
      calificarPregunta(p);
    }
  }, 1000);

  // Si ya respondieron todos antes de que acabe el tiempo, calificar antes
  refSala.child("respuestas").off();
  refSala.child("respuestas").on("value", (snap) => {
    const respuestas = snap.val() || {};
    refSala.child("jugadores").once("value", (snapJ) => {
      const totalJugadores = Object.keys(snapJ.val() || {}).length;
      if (totalJugadores > 0 && Object.keys(respuestas).length >= totalJugadores && !respuestasYaCalificadas) {
        clearInterval(timerInterval);
        calificarPregunta(p);
      }
    });
  });
}

function calificarPregunta(p) {
  if (respuestasYaCalificadas) return;
  respuestasYaCalificadas = true;

  // Marcar visualmente la opción correcta
  const grilla = document.getElementById("grilla-opciones-host");
  Array.from(grilla.children).forEach((el, i) => {
    el.classList.toggle("correcta", i === p.correcta);
    el.classList.toggle("incorrecta", i !== p.correcta);
  });

  refSala.once("value", (snap) => {
    const sala = snap.val();
    const jugadores = sala.jugadores || {};
    const respuestas = sala.respuestas || {};
    const equipos = sala.equipos || {};
    const tiempoTotal = p.tiempo;

    Object.entries(respuestas).forEach(([idJugador, r]) => {
      const jugador = jugadores[idJugador];
      if (!jugador) return;
      const claveEquipo = modoJuego === "equipos" ? jugador.equipo : idJugador;
      const esCorrecta = r.opcion === p.correcta;
      const puntos = calcularPuntos(r.tiempoRestante, tiempoTotal, esCorrecta);

      // Para que en modo equipos no se sumen puntos varias veces por la misma
      // pregunta, solo se cuenta la primera respuesta correcta del equipo.
      if (!equipos[claveEquipo]) return;
      if (modoJuego === "equipos") {
        equipos[claveEquipo]._yaSumo = equipos[claveEquipo]._yaSumo || {};
        if (equipos[claveEquipo]._yaSumo[p.texto]) return;
        equipos[claveEquipo]._yaSumo[p.texto] = true;
      }
      equipos[claveEquipo].puntaje = (equipos[claveEquipo].puntaje || 0) + puntos;
    });

    refSala.child("equipos").set(equipos).then(() => {
      setTimeout(() => mostrarRanking(equipos), 1800);
    });
  });
}

function mostrarRanking(equipos) {
  vistaPregunta.classList.add("oculto");
  vistaRanking.classList.remove("oculto");

  const lista = Object.entries(equipos)
    .filter(([, e]) => e)
    .sort((a, b) => (b[1].puntaje || 0) - (a[1].puntaje || 0));

  const maxPuntaje = Math.max(1, ...lista.map(([, e]) => e.puntaje || 0));

  // Camino andino: posicionar cada equipo según su puntaje relativo
  const camino = document.getElementById("camino");
  camino.querySelectorAll(".marcador-equipo").forEach((el) => el.remove());

  lista.forEach(([id, e], idx) => {
    const marcador = document.createElement("div");
    marcador.className = "marcador-equipo";
    const porcentaje = 6 + (e.puntaje / maxPuntaje) * 86;
    marcador.style.left = porcentaje + "%";
    marcador.innerHTML = `<span>${ICONOS_EQUIPO[idx % ICONOS_EQUIPO.length]}</span><span class="etiqueta">${e.nombre}</span>`;
    camino.appendChild(marcador);
  });

  // Lista de ranking textual
  const ol = document.getElementById("lista-ranking-host");
  ol.innerHTML = "";
  lista.forEach(([id, e], idx) => {
    const li = document.createElement("li");
    li.innerHTML = `<span><span class="puesto">#${idx + 1}</span>${e.nombre}</span><span>${e.puntaje || 0} pts</span>`;
    ol.appendChild(li);
  });

  const esUltima = indicePreguntaGlobal + 1 >= preguntasPlanas.length;
  document.getElementById("btn-siguiente").classList.remove("oculto");
  document.getElementById("btn-siguiente").textContent = esUltima ? "Ver resultado final 🏁" : "Siguiente pregunta →";
}

function mostrarFinal() {
  vistaPregunta.classList.add("oculto");
  vistaRanking.classList.add("oculto");
  vistaFinal.classList.remove("oculto");
  refSala.update({ estado: "final" });

  refSala.child("equipos").once("value", (snap) => {
    const equipos = snap.val() || {};
    const lista = Object.values(equipos).sort((a, b) => (b.puntaje || 0) - (a.puntaje || 0));
    const ol = document.getElementById("lista-final");
    ol.innerHTML = "";
    lista.forEach((e, idx) => {
      const li = document.createElement("li");
      li.innerHTML = `<span><span class="puesto">#${idx + 1}</span>${e.nombre}</span><span>${e.puntaje || 0} pts</span>`;
      ol.appendChild(li);
    });

    if (lista.length) {
      document.getElementById("nombre-ganador").textContent = lista[0].nombre;
    }
  });
}

function guardarEnRankingGlobal() {
  refSala.child("equipos").once("value", (snap) => {
    const equipos = snap.val() || {};
    const lista = Object.values(equipos).sort((a, b) => (b.puntaje || 0) - (a.puntaje || 0));
    if (!lista.length) return;
    const ganador = lista[0];

    db.ref("ranking_global").push({
      nombre: ganador.nombre,
      puntaje: ganador.puntaje || 0,
      fecha: Date.now(),
      sala: codigoSala,
    }).then(() => {
      document.getElementById("btn-guardar-top").disabled = true;
      document.getElementById("btn-guardar-top").textContent = "¡Guardado en el Top! 🏆";
    });
  });
}
