# 🦙 Warisata: Saberes en Juego

Juego didáctico web, cooperativo, estilo Kahoot, sobre filosofía de la educación
(Escuelas Integrales, Escuelas Indígenas, Warisata, Vivir Bien, descolonización,
las dimensiones Ser–Saber–Hacer–Decidir, etc).

- Una pantalla **anfitrión** (`host.html`) se proyecta en el pizarrón.
- Cada estudiante entra desde su celular a **jugador** (`jugar.html`), escaneando
  un código QR o escribiendo un código de sala de 4 letras.
- Todo se sincroniza en tiempo real con **Firebase Realtime Database** (gratis).
- Se guarda un **ranking histórico** entre partidas.

No hace falta backend propio ni servidor: todo es HTML/CSS/JS estático + Firebase.

---

## 1. Crear el proyecto de Firebase (10 minutos, gratis)

1. Ve a [console.firebase.google.com](https://console.firebase.google.com) e inicia
   sesión con una cuenta de Google.
2. Clic en **"Agregar proyecto"**. Ponle un nombre, por ejemplo `warisata-juego`.
   Puedes desactivar Google Analytics (no lo necesitas).
3. Dentro del proyecto, en el menú lateral: **Compilación (Build) → Realtime Database**.
4. Clic en **"Crear base de datos"**. Elige la ubicación más cercana y comienza en
   **"modo de prueba"** (test mode) — esto te da acceso abierto por 30 días, ideal
   para probar rápido. Antes de usarlo con estudiantes reales, aplica las reglas
   de seguridad de la sección 3.
5. Ahora ve a **Configuración del proyecto** (ícono de engranaje, arriba a la
   izquierda) → pestaña **General** → sección **"Tus apps"** → clic en el ícono
   `</>` (Web).
6. Ponle un apodo a la app (ej. "warisata-web") y clic en **"Registrar app"**.
   *No* actives Firebase Hosting (usaremos GitHub Pages).
7. Firebase te mostrará un bloque de código con un objeto `firebaseConfig`.
   Cópialo.
8. Abre el archivo `js/firebase-config.js` de este proyecto y reemplaza los
   valores de ejemplo por los que copiaste. Guarda el archivo.

## 2. Reglas de seguridad recomendadas

Cuando termines de probar el "modo de prueba", ve a **Realtime Database →
Reglas** y pega algo como esto (permite leer/escribir sin cuenta, pero evita que
cualquiera borre todo el árbol de un jalón):

```json
{
  "rules": {
    "salas": {
      "$sala": {
        ".read": true,
        ".write": true
      }
    },
    "ranking_global": {
      ".read": true,
      ".write": true,
      ".indexOn": ["puntaje"]
    }
  }
}
```

Esto es suficiente para uso en un aula. Si más adelante quieres endurecerlo
(por ejemplo, exigir Firebase Anonymous Auth antes de escribir), es un buen
siguiente paso, pero no es necesario para lanzar el juego.

## 3. Subir el proyecto a GitHub

Desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Primera versión de Warisata: Saberes en Juego"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/warisata-saberes-en-juego.git
git push -u origin main
```

(Reemplaza `TU_USUARIO` por tu usuario de GitHub. Si el repo aún no existe,
créalo primero en GitHub.com, sin README, y luego haz el push.)

## 4. Activar GitHub Pages

1. En tu repositorio de GitHub, ve a **Settings → Pages**.
2. En "Source", elige la rama `main` y la carpeta `/ (root)`.
3. Guarda. En un par de minutos tu juego estará disponible en:
   `https://TU_USUARIO.github.io/warisata-saberes-en-juego/`

Ese es el link que vas a compartir. La pantalla del anfitrión estará en
`.../host.html` y la de los jugadores en `.../jugar.html` (el QR ya apunta ahí
automáticamente).

## 5. Cómo se juega

1. El anfitrión abre `host.html` desde la compu conectada al proyector.
2. Elige modalidad (**por equipos** o **individual**) y da clic en "Crear sala".
3. Aparece un código de 4 letras y un QR grande.
4. Los estudiantes escanean el QR (o entran a `jugar.html` y escriben el
   código), ponen su nombre y, si es por equipos, eligen un equipo.
5. Cuando todos estén conectados, el anfitrión da clic en "Iniciar partida".
6. Cada pregunta tiene un tiempo límite; los estudiantes tocan su respuesta
   desde el celular. Los puntos dependen de acertar **y** de la velocidad
   (como en Kahoot).
7. Entre pregunta y pregunta se ve el **"Camino del Vivir Bien"**: un tablero
   donde cada equipo avanza según su puntaje acumulado.
8. Al final se puede guardar el equipo ganador en el **Top histórico**, que
   queda visible en la página de inicio (`index.html`) para todas las
   partidas futuras.

## 6. Personalizar las preguntas

Todas las preguntas están en `js/preguntas.js`, organizadas por rondas. Puedes
editar textos, agregar rondas nuevas o cambiar el tiempo de cada pregunta sin
tocar el resto del código — solo respeta el formato de cada objeto.

## 7. Probarlo en tu computadora antes de subirlo

Como el proyecto usa `fetch`/módulos de Firebase, es mejor no abrir los
archivos `.html` directamente con doble clic. Usa un servidor local simple:

```bash
# Si tienes Python instalado:
python3 -m http.server 8080
# Luego abre http://localhost:8080 en el navegador
```

O instala la extensión **"Live Server"** en VS Code y dale clic derecho a
`index.html` → "Open with Live Server".

---

Hecho con 🦙 para reforzar filosofía de la educación de forma divertida.
