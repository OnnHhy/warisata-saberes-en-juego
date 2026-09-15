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
let indicePreguntaGlobal = -1; // índice dentro de las preguntas elegidas para ESTA partida
let preguntasJuego = []; // subconjunto aleatorio de preguntas para esta partida (ver preguntas.js)
let timerInterval = null;
let respuestasYaCalificadas = false;

document.getElementById("btn-crear-sala").addEventListener("click", crearSala);
document.getElementById("btn-modo-equipos").addEventListener("click", () => seleccionarModo("equipos"));
document.getElementById("btn-modo-individual").addEventListener("click", () => seleccionarModo("individual"));
document.getElementById("btn-iniciar-juego").addEventListener("click", iniciarJuego);
document.getElementById("btn-siguiente").addEventListener("click", pasarASiguientePregunta);
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

  // Se elige, al azar, el subconjunto de preguntas de ESTA partida y se guarda
  // en la sala para que el anfitrión y todos los jugadores vean exactamente
  // las mismas preguntas, en el mismo orden.
  preguntasJuego = elegirPreguntasAleatorias(PREGUNTAS_POR_PARTIDA);

  const estadoInicial = {
    estado: "lobby",
    modo: modoJuego,
    creada: Date.now(),
    indicePregunta: -1,
    jugadores: {},
    equipos: {},
    respuestas: {},
    resultados: {},
    preguntas: preguntasJuego,
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
  // Ya no se puede volver al menú principal una vez arrancó la partida
  document.querySelectorAll(".enlace-volver").forEach((el) => el.classList.add("oculto"));

  refSala.child("jugadores").once("value", (snap) => {
    const jugadoresOriginales = snap.val() || {};
    const jugadores = {};
    Object.entries(jugadoresOriginales).forEach(([id, j]) => {
      jugadores[id] = { ...j, puntaje: 0 };
    });

    const equipos = {};
    if (modoJuego === "equipos") {
      Object.entries(jugadores).forEach(([id, j]) => {
        const eq = j.equipo;
        if (!equipos[eq]) {
          equipos[eq] = { nombre: "Equipo " + (parseInt(eq, 10) + 1), puntaje: 0 };
        }
      });
    } else {
      Object.entries(jugadores).forEach(([id, j]) => {
        equipos[id] = { nombre: j.nombre, puntaje: 0 };
      });
    }

    refSala.update({ jugadores, equipos, estado: "jugando" }).then(() => {
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

  if (indicePreguntaGlobal >= preguntasJuego.length) {
    mostrarFinal();
    return;
  }

  const p = preguntasJuego[indicePreguntaGlobal];

  refSala.update({
    indicePregunta: indicePreguntaGlobal,
    estado: "jugando",
    respuestas: {},
    resultados: {},
  });

  vistaRanking.classList.add("oculto");
  vistaPregunta.classList.remove("oculto");
  document.getElementById("btn-siguiente").classList.add("oculto");

  document.getElementById("ronda-actual").textContent = `${p.rondaIcono} ${p.rondaNombre}`;
  document.getElementById("numero-pregunta").textContent = `Pregunta ${indicePreguntaGlobal + 1} de ${preguntasJuego.length}`;
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

  // Marcar visualmente la opción correcta en la pantalla del anfitrión
  const grilla = document.getElementById("grilla-opciones-host");
  Array.from(grilla.children).forEach((el, i) => {
    el.classList.toggle("correcta", i === p.correcta);
    el.classList.toggle("incorrecta", i !== p.correcta);
  });

  refSala.once("value", (snap) => {
    const sala = snap.val() || {};
    const jugadores = sala.jugadores || {};
    const respuestas = sala.respuestas || {};
    const resultados = {};

    // Se recorre a TODOS los jugadores conectados (no solo a quienes
    // respondieron), así quien no contesta a tiempo también queda marcado
    // como incorrecto en vez de quedar "sin calificar".
    Object.entries(jugadores).forEach(([idJugador, jugador]) => {
      const r = respuestas[idJugador];
      const respondio = !!r;
      const esCorrecta = respondio && r.opcion === p.correcta;
      const puntos = calcularPuntos(esCorrecta);

      jugadores[idJugador] = {
        ...jugador,
        puntaje: (jugador.puntaje || 0) + puntos,
      };

      resultados[idJugador] = {
        respondio,
        correcta: esCorrecta,
        puntos,
        opcionElegida: respondio ? r.opcion : null,
        opcionCorrecta: p.correcta,
      };
    });

    // El puntaje de cada equipo se recalcula como la suma de sus miembros
    const equipos = {};
    if (modoJuego === "equipos") {
      Object.values(jugadores).forEach((j) => {
        const eq = j.equipo;
        if (!equipos[eq]) equipos[eq] = { nombre: "Equipo " + (parseInt(eq, 10) + 1), puntaje: 0 };
        equipos[eq].puntaje += j.puntaje || 0;
      });
    } else {
      Object.entries(jugadores).forEach(([idJugador, j]) => {
        equipos[idJugador] = { nombre: j.nombre, puntaje: j.puntaje || 0 };
      });
    }

    refSala.update({ jugadores, equipos, resultados }).then(() => {
      setTimeout(() => mostrarRanking(equipos, jugadores), 1800);
    });
  });
}

function mostrarRanking(equipos, jugadores) {
  vistaPregunta.classList.add("oculto");
  vistaRanking.classList.remove("oculto");

  const listaEquipos = Object.entries(equipos)
    .filter(([, e]) => e)
    .sort((a, b) => (b[1].puntaje || 0) - (a[1].puntaje || 0));

  const maxPuntaje = Math.max(1, ...listaEquipos.map(([, e]) => e.puntaje || 0));

  // Camino andino: posicionar cada equipo según su puntaje relativo
  const camino = document.getElementById("camino");
  camino.querySelectorAll(".marcador-equipo").forEach((el) => el.remove());

  listaEquipos.forEach(([id, e], idx) => {
    const marcador = document.createElement("div");
    marcador.className = "marcador-equipo";
    const porcentaje = 6 + (e.puntaje / maxPuntaje) * 86;
    marcador.style.left = porcentaje + "%";
    marcador.innerHTML = `<span>${ICONOS_EQUIPO[idx % ICONOS_EQUIPO.length]}</span><span class="etiqueta">${e.nombre}</span>`;
    camino.appendChild(marcador);
  });

  // Ranking principal (equipos en modo equipos, jugadores en modo individual)
  document.getElementById("titulo-ranking-principal").textContent =
    modoJuego === "equipos" ? "🏆 Ranking de equipos" : "🏆 Ranking";

  const olEquipos = document.getElementById("lista-ranking-host");
  olEquipos.innerHTML = "";
  listaEquipos.forEach(([id, e], idx) => {
    const li = document.createElement("li");
    li.innerHTML = `<span><span class="puesto">#${idx + 1}</span>${e.nombre}</span><span>${e.puntaje || 0} pts</span>`;
    olEquipos.appendChild(li);
  });

  // Ranking individual adicional (solo tiene sentido mostrarlo aparte en modo equipos)
  const bloqueIndividual = document.getElementById("bloque-ranking-individual");
  if (modoJuego === "equipos") {
    bloqueIndividual.classList.remove("oculto");
    const listaJugadores = Object.values(jugadores || {}).sort((a, b) => (b.puntaje || 0) - (a.puntaje || 0));
    const olInd = document.getElementById("lista-ranking-individual");
    olInd.innerHTML = "";
    listaJugadores.forEach((j, idx) => {
      const li = document.createElement("li");
      const equipoTexto = j.equipo !== undefined ? ` · Equipo ${parseInt(j.equipo, 10) + 1}` : "";
      li.innerHTML = `<span><span class="puesto">#${idx + 1}</span>${j.nombre}${equipoTexto}</span><span>${j.puntaje || 0} pts</span>`;
      olInd.appendChild(li);
    });
  } else {
    bloqueIndividual.classList.add("oculto");
  }

  const esUltima = indicePreguntaGlobal + 1 >= preguntasJuego.length;
  document.getElementById("btn-siguiente").classList.remove("oculto");
  document.getElementById("btn-siguiente").textContent = esUltima ? "Ver resultado final 🏁" : "Siguiente pregunta →";
}

function mostrarFinal() {
  vistaPregunta.classList.add("oculto");
  vistaRanking.classList.add("oculto");
  vistaFinal.classList.remove("oculto");
  refSala.update({ estado: "final" });

  refSala.once("value", (snap) => {
    const sala = snap.val() || {};
    const equipos = sala.equipos || {};
    const jugadores = sala.jugadores || {};

    const listaEquipos = Object.values(equipos).sort((a, b) => (b.puntaje || 0) - (a.puntaje || 0));
    const ol = document.getElementById("lista-final");
    ol.innerHTML = "";
    listaEquipos.forEach((e, idx) => {
      const li = document.createElement("li");
      li.innerHTML = `<span><span class="puesto">#${idx + 1}</span>${e.nombre}</span><span>${e.puntaje || 0} pts</span>`;
      ol.appendChild(li);
    });

    if (listaEquipos.length) {
      document.getElementById("nombre-ganador").textContent = listaEquipos[0].nombre;
    }

    document.getElementById("titulo-final-principal").textContent =
      modoJuego === "equipos" ? "🏆 Equipos" : "🏆 Resultado";

    const bloqueIndividualFinal = document.getElementById("bloque-final-individual");
    if (modoJuego === "equipos") {
      bloqueIndividualFinal.classList.remove("oculto");
      const listaJugadores = Object.values(jugadores).sort((a, b) => (b.puntaje || 0) - (a.puntaje || 0));
      const olInd = document.getElementById("lista-final-individual");
      olInd.innerHTML = "";
      listaJugadores.forEach((j, idx) => {
        const li = document.createElement("li");
        const equipoTexto = j.equipo !== undefined ? ` · Equipo ${parseInt(j.equipo, 10) + 1}` : "";
        li.innerHTML = `<span><span class="puesto">#${idx + 1}</span>${j.nombre}${equipoTexto}</span><span>${j.puntaje || 0} pts</span>`;
        olInd.appendChild(li);
      });
    } else {
      bloqueIndividualFinal.classList.add("oculto");
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
