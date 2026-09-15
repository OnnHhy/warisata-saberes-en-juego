// Utilidades compartidas entre host.js y jugador.js

// Genera un código de sala legible, ej: "K7QX"
function generarCodigoSala() {
  const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin caracteres confusos (0,O,1,I)
  let codigo = "";
  for (let i = 0; i < 4; i++) {
    codigo += letras[Math.floor(Math.random() * letras.length)];
  }
  return codigo;
}

// Genera un id corto para identificar a un jugador en este dispositivo
function generarIdJugador() {
  return "j" + Math.random().toString(36).slice(2, 10);
}

// Calcula puntos según el tiempo de respuesta (estilo Kahoot):
// más rápido y correcto = más puntos. Máximo 1000, mínimo 500 si acierta.
function calcularPuntos(tiempoRestante, tiempoTotal, esCorrecta) {
  if (!esCorrecta) return 0;
  const proporcion = Math.max(0, Math.min(1, tiempoRestante / tiempoTotal));
  return Math.round(500 + proporcion * 500);
}

// Construye la URL para que un jugador se una a una sala
function urlDeSala(codigo) {
  const base = window.location.href.replace(/host\.html.*$/, "jugar.html");
  return `${base}?sala=${codigo}`;
}

// Devuelve un color de contraste simple (para texto sobre fondos de color)
function esColorClaro(hex) {
  const c = hex.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminancia > 0.6;
}
