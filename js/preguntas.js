// Banco de preguntas — Warisata: Saberes en Juego
// Cada ronda tiene un nombre, un color temático y una lista de preguntas.
// Cada pregunta: texto, 4 opciones, índice de la correcta (0-3) y segundos para responder.

const RONDAS = [
  {
    id: "fundamentos",
    nombre: "Fundamentos y Dimensiones",
    icono: "☀️",
    preguntas: [
      {
        texto: "¿Qué disciplina reflexiona crítica y profundamente sobre el sentido, los fundamentos y las finalidades de la educación?",
        opciones: ["La psicología educativa", "La filosofía de la educación", "La didáctica general", "La sociología del aula"],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "La educación integral concibe al ser humano en cuatro dimensiones. ¿Cuáles son?",
        opciones: [
          "Cuerpo, Mente, Espíritu y Emoción",
          "Ser, Saber, Hacer y Decidir",
          "Pensar, Sentir, Actuar y Recordar",
          "Individuo, Familia, Escuela y Estado",
        ],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "La Dimensión del SER se refiere principalmente a...",
        opciones: [
          "Los principios y valores expresados en la vida cotidiana",
          "El manejo de técnicas pedagógicas",
          "La memorización de contenidos",
          "La evaluación por exámenes",
        ],
        correcta: 0,
        tiempo: 20,
      },
      {
        texto: "La Dimensión del SABER abarca...",
        opciones: [
          "Optar y comprometerse",
          "Conocer, clasificar, conceptualizar y comprender",
          "Realizar y ejecutar tareas manuales",
          "Convivir en comunidad",
        ],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "La Dimensión del HACER alude a...",
        opciones: [
          "Las capacidades y habilidades para realizar, más allá de lo teórico",
          "Los valores espirituales",
          "La teoría pura sin práctica",
          "El respeto a la naturaleza únicamente",
        ],
        correcta: 0,
        tiempo: 20,
      },
      {
        texto: "La Dimensión del DECIDIR incorpora...",
        opciones: [
          "Solo la obediencia a las normas",
          "La capacidad de optar y comprometerse",
          "El aprendizaje memorístico",
          "La repetición de contenidos",
        ],
        correcta: 1,
        tiempo: 20,
      },
    ],
  },
  {
    id: "problemas",
    nombre: "Problemas Filosóficos de la Educación",
    icono: "⚡",
    preguntas: [
      {
        texto: "¿Cómo se llama el problema que impone una racionalidad única de origen occidental como si fuera universal?",
        opciones: ["Racionalidad hegemónica", "Pedagogía crítica", "Educación popular", "Interculturalidad"],
        correcta: 0,
        tiempo: 20,
      },
      {
        texto: "¿Qué pedagogo es reconocido por criticar el modelo de 'educación bancaria'?",
        opciones: ["John Dewey", "Paulo Freire", "Jean Piaget", "Lev Vygotsky"],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "El modelo de educación bancaria concibe al estudiante como...",
        opciones: [
          "Un sujeto activo y crítico",
          "Un miembro de la comunidad",
          "Un receptáculo vacío que hay que llenar de información",
          "Un investigador autónomo",
        ],
        correcta: 2,
        tiempo: 20,
      },
      {
        texto: "¿Cómo se llama el problema que genera un saber abstracto, desvinculado de la vida y la comunidad?",
        opciones: ["Mercantilización", "Descontextualización", "Interculturalidad", "Comunitarismo"],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "Frente al individualismo llevado al extremo, las Escuelas Indígenas e Integrales proponen una perspectiva...",
        opciones: ["Competitiva", "Comunitaria", "Bancaria", "Tecnocrática"],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "Según el texto, 'el conocimiento no se forja desde la individualidad, sino desde...'",
        opciones: ["La colectividad", "El mercado", "La tecnología", "La memoria"],
        correcta: 0,
        tiempo: 20,
      },
    ],
  },
  {
    id: "escuelas",
    nombre: "Escuelas Integrales y Escuelas Indígenas",
    icono: "🏔️",
    preguntas: [
      {
        texto: "¿En qué año se creó la Escuela Ayllu de Warisata?",
        opciones: ["1918", "1925", "1931", "1952"],
        correcta: 2,
        tiempo: 20,
      },
      {
        texto: "¿Quiénes fundaron la Escuela Ayllu de Warisata?",
        opciones: [
          "Avelino Siñani y Elizardo Pérez",
          "Simón Rodríguez y Andrés Bello",
          "Franz Tamayo y Gabriel René Moreno",
          "Elizardo Pérez y Paulo Freire",
        ],
        correcta: 0,
        tiempo: 20,
      },
      {
        texto: "Las Escuelas Integrales están influenciadas principalmente por...",
        opciones: [
          "La cosmovisión andina exclusivamente",
          "La educación popular y la pedagogía crítica",
          "El modelo bancario tradicional",
          "La educación religiosa colonial",
        ],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "Las Escuelas Indígenas recuperan, sobre todo...",
        opciones: [
          "Modelos educativos europeos",
          "La mercantilización del conocimiento",
          "Los saberes ancestrales y la cosmovisión andina",
          "La educación bancaria",
        ],
        correcta: 2,
        tiempo: 20,
      },
      {
        texto: "En la Escuela Ayllu de Warisata, la escuela era considerada...",
        opciones: [
          "Un espacio separado de la comunidad",
          "El centro articulador que reproducía la comunidad",
          "Un lugar solo para adultos",
          "Una institución puramente religiosa",
        ],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "¿Cuál es un punto en común entre las Escuelas Integrales y las Indígenas?",
        opciones: [
          "Ambas promueven el individualismo",
          "Ambas rechazan la descontextualización y el individualismo",
          "Ambas se basan solo en exámenes estandarizados",
          "Ambas ignoran la cultura local",
        ],
        correcta: 1,
        tiempo: 20,
      },
    ],
  },
  {
    id: "descolonizacion",
    nombre: "Descolonización e Interculturalidad",
    icono: "🌎",
    preguntas: [
      {
        texto: "La descolonización busca poner fin a estructuras impuestas como si fueran...",
        opciones: ["Temporales y locales", "Únicas y universales", "Opcionales", "Científicas exclusivamente"],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "Frente al 'pensamiento foráneo-ajeno', el texto propone construir...",
        opciones: [
          "Una filosofía educativa propia, desde nuestra cultura",
          "Una copia exacta de modelos europeos",
          "Un modelo puramente tecnológico",
          "Un sistema basado solo en exámenes",
        ],
        correcta: 0,
        tiempo: 20,
      },
      {
        texto: "El diálogo intercultural busca articular los saberes propios en complementariedad con...",
        opciones: ["El folclore turístico", "Los conocimientos universales", "La educación bancaria", "El individualismo"],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "Según la filosofía de la educación, el docente debería ser sobre todo...",
        opciones: [
          "El único dueño del conocimiento",
          "Un orientador y mediador del aprendizaje",
          "Un simple evaluador",
          "Un transmisor pasivo de datos",
        ],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "La formación docente propuesta en el texto debe incorporar significativamente...",
        opciones: [
          "Solo técnicas de evaluación",
          "Filosofía, historia, lengua y cosmovisión de los pueblos originarios",
          "Exclusivamente tecnología digital",
          "Normas administrativas",
        ],
        correcta: 1,
        tiempo: 20,
      },
    ],
  },
  {
    id: "vivirbien",
    nombre: "Vivir Bien y Principios Finales",
    icono: "🌿",
    preguntas: [
      {
        texto: "¿Cómo se dice 'Vivir Bien' en quechua?",
        opciones: ["Suma Qamaña", "Sumak Kawsay", "Ayni", "Pachakuti"],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "¿Cómo se dice 'Vivir Bien' en aymara?",
        opciones: ["Sumak Kawsay", "Suma Qamaña", "Tinkuy", "Yachay"],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "El Vivir Bien implica una vida en armonía con...",
        opciones: [
          "El mercado y la producción",
          "La comunidad, la naturaleza y el cosmos",
          "La tecnología y el individuo",
          "Solo la familia nuclear",
        ],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "Uno de los principios de una filosofía educativa propia es la reciprocidad y...",
        opciones: ["La competencia", "La complementariedad", "La mercantilización", "El aislamiento"],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "En definitiva, ¿qué tipo de educación busca construir esta propuesta filosófica?",
        opciones: [
          "Una educación más humana, comunitaria, intercultural y transformadora",
          "Una educación puramente técnica y estandarizada",
          "Una educación individualista y competitiva",
          "Una educación desconectada de la realidad social",
        ],
        correcta: 0,
        tiempo: 20,
      },
    ],
  },
];

// Iconos disponibles para representar equipos en el camino andino
const ICONOS_EQUIPO = ["🦙", "🦅", "🐆", "🌾", "⛰️", "🐍"];
const COLORES_EQUIPO = ["#e8a33d", "#c1502e", "#2f7a6f", "#b0456a", "#5b8c5a", "#7a5cc1"];
