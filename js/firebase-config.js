// ============================================================
// CONFIGURACIÓN DE FIREBASE
// ============================================================
// 1. Ve a https://console.firebase.google.com
// 2. Crea un proyecto nuevo (gratis).
// 3. Dentro del proyecto: Compilación > Realtime Database > Crear base de datos
//    (elige modo de prueba para empezar).
// 4. Ve a Configuración del proyecto (ícono de engranaje) > tus apps > "</>" (Web).
// 5. Registra la app y copia el objeto "firebaseConfig" que te da Firebase.
// 6. Pega esos valores AQUÍ ABAJO, reemplazando los de ejemplo.
//
// Instrucciones completas y reglas de seguridad recomendadas en README.md
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyDu3pCr6ixPAx2lbOMzv33H3FCH8uxy7gE",
  authDomain: "warisata-juego.firebaseapp.com",
  databaseURL: "https://warisata-juego-default-rtdb.firebaseio.com",
  projectId: "warisata-juego",
  storageBucket: "warisata-juego.firebasestorage.app",
  messagingSenderId: "542256319895",
  appId: "1:542256319895:web:a3b64be4762506c96488d2",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
