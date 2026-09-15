// Banco de preguntas — Warisata: Saberes en Juego
// Cada ronda tiene un nombre, un color temático y una lista de preguntas.
// Cada pregunta: texto, 4 opciones, índice de la correcta (0-3) y segundos para responder.
//
// El banco completo tiene ~90 preguntas repartidas en 6 rondas temáticas.
// En cada partida NO se usan las 90: se elige al azar un subconjunto (ver
// PREGUNTAS_POR_PARTIDA más abajo), en orden aleatorio, así que cada partida
// es distinta y las preguntas no se memorizan de antemano.
//
// Para agregar más preguntas en el futuro, solo hay que sumar objetos nuevos
// dentro de la ronda que corresponda, respetando el mismo formato.

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
        texto: "Más que describir métodos o técnicas, la filosofía de la educación busca responder preguntas como...",
        opciones: [
          "¿Cuántas horas debe durar una clase?",
          "¿Qué software conviene usar en el aula?",
          "¿Para qué educamos y qué tipo de ser humano queremos formar?",
          "¿Cómo calificar un examen estandarizado?",
        ],
        correcta: 2,
        tiempo: 22,
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
          "El manejo de técnicas pedagógicas",
          "La memorización de contenidos",
          "La evaluación por exámenes",
          "Los principios y valores expresados en la vida cotidiana",
        ],
        correcta: 3,
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
          "El aprendizaje memorístico",
          "La capacidad de optar y comprometerse",
          "La repetición de contenidos",
        ],
        correcta: 2,
        tiempo: 20,
      },
      {
        texto: "La visión integral del ser humano (Ser-Saber-Hacer-Decidir), lejos de copiar enfoques foráneos, se asienta principalmente en...",
        opciones: [
          "Un modelo importado sin adaptación",
          "La vida y la cosmovisión de los pueblos indígenas",
          "La teoría de Delors aplicada tal cual",
          "Un enfoque puramente académico",
        ],
        correcta: 1,
        tiempo: 24,
      },
      {
        texto: "Cuando la educación se concentra únicamente en lo cognitivo, según un documento del Ministerio de Educación de Bolivia, se produce...",
        opciones: [
          "Un refuerzo del divorcio entre la escuela y la realidad",
          "Una mejora inmediata en la disciplina escolar",
          "Un acercamiento mayor a la vida comunitaria",
          "Una reducción de la carga horaria docente",
        ],
        correcta: 0,
        tiempo: 22,
      },
      {
        texto: "La filosofía de la educación analiza principios como la ética, la libertad y la justicia sobre todo para...",
        opciones: [
          "Diseñar exámenes más difíciles",
          "Cuestionar si la enseñanza aporta al desarrollo integral o reproduce desigualdades",
          "Reducir el número de materias",
          "Estandarizar los uniformes escolares",
        ],
        correcta: 1,
        tiempo: 24,
      },
      {
        texto: "Toda práctica educativa, según la filosofía de la educación, refleja siempre...",
        opciones: [
          "Una determinada concepción del ser humano y de la sociedad que se busca construir",
          "Únicamente el presupuesto disponible",
          "Una moda pedagógica pasajera",
          "El calendario escolar vigente",
        ],
        correcta: 0,
        tiempo: 22,
      },
      {
        texto: "¿Cuál de las siguientes NO es una de las cuatro dimensiones de la educación integral?",
        opciones: ["Ser", "Hacer", "Competir", "Decidir"],
        correcta: 2,
        tiempo: 18,
      },
      {
        texto: "La Dimensión del Hacer busca, sobre todo, superar...",
        opciones: [
          "El conocimiento puramente teórico sin práctica",
          "La convivencia comunitaria",
          "La reflexión ética",
          "La identidad cultural",
        ],
        correcta: 0,
        tiempo: 20,
      },
      {
        texto: "En Bolivia, la reflexión filosófica sobre la educación adquiere especial importancia debido, sobre todo, a...",
        opciones: [
          "La cercanía con otros países",
          "La diversidad cultural y lingüística del país",
          "El tamaño reducido de su territorio",
          "La cantidad de universidades privadas",
        ],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "Educar, desde la filosofía de la educación, no significa únicamente...",
        opciones: [
          "Transmitir información o desarrollar capacidades técnicas",
          "Construir identidad y formas de relacionarse con los demás",
          "Formar valores y actitudes",
          "Comprender la propia cultura",
        ],
        correcta: 0,
        tiempo: 22,
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
      {
        texto: "La racionalidad hegemónica, de carácter instrumental, ha generado según el texto un malestar de la modernidad marcado sobre todo por...",
        opciones: [
          "El fortalecimiento de la vida comunitaria",
          "El individualismo extremo y el atomismo social",
          "El resurgimiento de saberes ancestrales",
          "La disminución del consumo",
        ],
        correcta: 1,
        tiempo: 24,
      },
      {
        texto: "Según documentos educativos bolivianos, los saberes de los pueblos indígena originarios han sido históricamente...",
        opciones: [
          "Promovidos por la ciencia tradicional",
          "Relegados y despreciados por la ciencia heredada de los colonizadores",
          "Incorporados sin resistencia al currículo oficial",
          "Reconocidos como saber universal desde el inicio",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "El modelo de educación bancaria, según el texto, se agrava en la actualidad debido, en particular, a...",
        opciones: [
          "La creciente mercantilización de los saberes",
          "La disminución de estudiantes",
          "El aumento de escuelas comunitarias",
          "La reducción del uso de exámenes",
        ],
        correcta: 0,
        tiempo: 22,
      },
      {
        texto: "Frente a la mercantilización del conocimiento, el texto plantea la necesidad de una educación...",
        opciones: [
          "Puramente utilitaria",
          "Liberadora, que promueva el placer del conocimiento por el conocimiento",
          "Enfocada solo en resultados de examen",
          "Centrada en la competencia entre estudiantes",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "La descontextualización de la educación se manifiesta cuando el aprendizaje se desarrolla...",
        opciones: [
          "En estrecha relación con la comunidad",
          "Al margen de la cotidianidad, sin conexión con lo social, político y económico",
          "A partir de proyectos productivos locales",
          "Dentro del calendario agrícola de la región",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "En el ámbito indígena, la descontextualización educativa ha significado históricamente que la escuela funcionara como...",
        opciones: [
          "Un puente entre culturas en igualdad de condiciones",
          "Un espacio de fortalecimiento de la lengua originaria",
          "Un instrumento de despojo cultural",
          "Un centro de producción agrícola comunitaria",
        ],
        correcta: 2,
        tiempo: 22,
      },
      {
        texto: "La tradición educativa occidental, al llevar al extremo la autonomía individual, corre el riesgo de...",
        opciones: [
          "Fortalecer la solidaridad comunitaria",
          "Debilitar la solidaridad y el sentido de pertenencia a una comunidad",
          "Aumentar el diálogo intercultural",
          "Reforzar la cosmovisión andina",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "¿Cuál de estos NO aparece en el texto como uno de los problemas filosóficos centrales de la educación?",
        opciones: ["Racionalidad hegemónica", "Educación bancaria", "Exceso de innovación tecnológica", "Descontextualización"],
        correcta: 2,
        tiempo: 20,
      },
      {
        texto: "Aprender, desde la perspectiva comunitaria de las Escuelas Indígenas e Integrales, significa principalmente...",
        opciones: [
          "Memorizar contenidos de forma individual",
          "Compartir experiencias, dialogar y construir conocimiento junto a otros",
          "Competir por las mejores calificaciones",
          "Aislarse para concentrarse mejor",
        ],
        correcta: 1,
        tiempo: 22,
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
      {
        texto: "Las Escuelas Integrales se conciben, según el texto, como espacios de...",
        opciones: [
          "Neutralidad frente a los modelos económicos",
          "Resistencia y lucha frente a la ideología capitalista",
          "Adaptación total al mercado laboral",
          "Aislamiento de la vida social",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "En la filosofía de la Escuela Integral, el eje del proceso educativo es...",
        opciones: [
          "El trabajo, entendido en su concepto más amplio",
          "La evaluación permanente",
          "La disciplina escolar",
          "El uso de tecnología digital",
        ],
        correcta: 0,
        tiempo: 22,
      },
      {
        texto: "La Escuela Ayllu de Warisata se organizó, entre otros, en torno a principios como...",
        opciones: [
          "El aula, el pizarrón y el examen final",
          "El trabajo, la chacra, la ulaka y el taller",
          "La biblioteca y el laboratorio únicamente",
          "El internado y la disciplina militar",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "El ideario de Elizardo Pérez concebía la escuela, sobre todo, como un espacio que...",
        opciones: [
          "Reproducía a la comunidad y era su centro articulador",
          "Debía mantenerse alejado de la vida cotidiana",
          "Servía únicamente para formar mano de obra",
          "Reemplazaba por completo a la familia",
        ],
        correcta: 0,
        tiempo: 22,
      },
      {
        texto: "Las escuelas indígenas actuales se inspiran, además de la reciprocidad y la complementariedad, en una relación respetuosa con...",
        opciones: [
          "El mercado global",
          "La tecnología de punta",
          "La naturaleza y las espiritualidades",
          "Los sistemas educativos europeos",
        ],
        correcta: 2,
        tiempo: 22,
      },
      {
        texto: "¿Cuál es una diferencia principal entre las Escuelas Integrales y las Escuelas Indígenas, según el texto?",
        opciones: [
          "Las integrales nacen de movimientos magisteriales y la pedagogía crítica; las indígenas, de la cosmovisión de los pueblos originarios",
          "Las integrales rechazan todo trabajo comunitario",
          "Las indígenas se basan únicamente en Paulo Freire",
          "No existe ninguna diferencia entre ambas",
        ],
        correcta: 0,
        tiempo: 24,
      },
      {
        texto: "Tanto las Escuelas Integrales como las Indígenas rechazan en común...",
        opciones: [
          "La descontextualización, el individualismo y la mercantilización de la educación",
          "El trabajo comunitario",
          "La interculturalidad",
          "La educación crítica",
        ],
        correcta: 0,
        tiempo: 22,
      },
      {
        texto: "La educación indígena, según el texto, se fundamenta en una filosofía de vida basada en...",
        opciones: [
          "El individualismo productivo",
          "Principios comunitarios y las leyes del cosmos",
          "La competencia entre comunidades",
          "La estandarización curricular",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "¿En qué país se ubica la Escuela Ayllu de Warisata?",
        opciones: ["Bolivia", "Perú", "Ecuador", "México"],
        correcta: 0,
        tiempo: 18,
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
        texto: "La descolonización, según documentos educativos bolivianos, implica erradicar la exclusión y la discriminación racial mediante una educación...",
        opciones: [
          "Concientizadora, emancipadora y liberadora",
          "Estrictamente técnica",
          "Basada solo en la repetición de contenidos",
          "Centrada en la competencia individual",
        ],
        correcta: 0,
        tiempo: 22,
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
        tiempo: 22,
      },
      {
        texto: "La identidad que busca fortalecer la descolonización educativa surge, según el texto, desde...",
        opciones: [
          "Las tendencias educativas globales",
          "La memoria colectiva de las distintas culturas ancestrales",
          "Los estándares internacionales de calidad",
          "Los planes de estudio importados",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "El diálogo intercultural, más que imponer una cultura sobre otra, busca principalmente...",
        opciones: [
          "La complementariedad entre saberes propios y conocimientos universales",
          "La sustitución total de una cultura por otra",
          "El aislamiento cultural de cada pueblo",
          "La eliminación de las lenguas originarias",
        ],
        correcta: 0,
        tiempo: 22,
      },
      {
        texto: "La ausencia de una filosofía educativa propia en América Latina genera, según el texto, profesionales con...",
        opciones: [
          "Un fuerte arraigo a su comunidad",
          "Un pensamiento foráneo-ajeno, incapaces de comprender su propia realidad",
          "Mayor conexión con los saberes ancestrales",
          "Una formación totalmente intercultural",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "Construir una filosofía educativa propia se presenta en el texto como...",
        opciones: [
          "Un lujo académico prescindible",
          "Una exigencia ética y política",
          "Una tendencia pasajera",
          "Una tarea exclusiva del Estado",
        ],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "La descolonización de la educación implica poner fin a estructuras impuestas por el mundo occidental dominante, presentadas como...",
        opciones: ["Diversas y flexibles", "Provisionales", "Únicas y universales", "Opcionales para cada escuela"],
        correcta: 2,
        tiempo: 20,
      },
      {
        texto: "¿Cuál de estas opciones describe mejor la interculturalidad educativa propuesta en el texto?",
        opciones: [
          "La imposición de un solo modelo cultural",
          "El diálogo entre culturas que articula saberes propios y universales",
          "La eliminación total del conocimiento occidental",
          "La enseñanza exclusiva en lenguas originarias",
        ],
        correcta: 1,
        tiempo: 24,
      },
      {
        texto: "Los saberes de los pueblos originarios, según el texto, constituyen...",
        opciones: [
          "Meras curiosidades folclóricas",
          "Sistemas de pensamiento complejos, no simples curiosidades",
          "Conocimientos ya superados",
          "Un aporte solo simbólico",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "La recuperación de saberes ancestrales tiene como propósito principal...",
        opciones: [
          "Repensar la educación desde una filosofía propia",
          "Reemplazar toda la ciencia moderna",
          "Volver exactamente al pasado precolonial",
          "Reducir el papel de la escuela",
        ],
        correcta: 0,
        tiempo: 22,
      },
      {
        texto: "¿Qué autor es mencionado en el texto como referente de la crítica a la educación bancaria dentro del proceso de descolonización pedagógica?",
        opciones: ["John Dewey", "Paulo Freire", "Jean Piaget", "Michel Foucault"],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "La interculturalidad en la educación boliviana responde principalmente a...",
        opciones: [
          "Una exigencia de organismos internacionales",
          "La diversidad de pueblos, culturas y naciones del país",
          "La necesidad de estandarizar el idioma",
          "Una moda pedagógica reciente",
        ],
        correcta: 1,
        tiempo: 22,
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
          "Una educación puramente técnica y estandarizada",
          "Una educación individualista y competitiva",
          "Una educación desconectada de la realidad social",
          "Una educación más humana, comunitaria, intercultural y transformadora",
        ],
        correcta: 3,
        tiempo: 22,
      },
      {
        texto: "El principio de integralidad y holismo implica formar al ser humano en todas sus dimensiones, en armonía con...",
        opciones: [
          "El mercado laboral",
          "La naturaleza y el cosmos",
          "Los exámenes estandarizados",
          "La tecnología digital",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "El comunitarismo, como principio educativo, sostiene que la educación es responsabilidad de...",
        opciones: [
          "Únicamente el Estado",
          "Solo la familia",
          "Toda la comunidad, no solo del individuo",
          "Exclusivamente el docente",
        ],
        correcta: 2,
        tiempo: 22,
      },
      {
        texto: "El principio de 'vida y realidad' plantea que la educación debe estar...",
        opciones: [
          "Alejada de la vida cotidiana para concentrarse en la teoría",
          "Abierta para la vida y de la vida, partiendo de la realidad de los estudiantes",
          "Basada únicamente en contenidos universales",
          "Restringida al aula y al pizarrón",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "¿Cuál de los siguientes NO figura entre los principios de una filosofía educativa propia mencionados en el texto?",
        opciones: ["Reciprocidad", "Comunitarismo", "Competencia individual", "Vivir Bien"],
        correcta: 2,
        tiempo: 20,
      },
      {
        texto: "El Vivir Bien, como horizonte educativo, se opone principalmente a una visión de desarrollo basada en...",
        opciones: [
          "La reciprocidad comunitaria",
          "La acumulación material desligada de la comunidad y la naturaleza",
          "El equilibrio con el cosmos",
          "El respeto a la Madre Tierra",
        ],
        correcta: 1,
        tiempo: 24,
      },
      {
        texto: "La complementariedad, como principio andino, se refiere sobre todo a...",
        opciones: [
          "La eliminación de las diferencias",
          "La competencia entre opuestos",
          "La idea de que los opuestos se equilibran y se necesitan mutuamente",
          "La superioridad de un saber sobre otro",
        ],
        correcta: 2,
        tiempo: 22,
      },
      {
        texto: "Según el texto, la filosofía educativa debe orientarse al Vivir Bien, lo cual implica una relación armónica entre comunidad, naturaleza y...",
        opciones: ["El mercado", "El cosmos", "La tecnología", "El Estado"],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "El respeto por la Madre Tierra aparece en las conclusiones del texto como parte de...",
        opciones: [
          "Un tema ambiental aislado",
          "Los fundamentos de una filosofía educativa propia",
          "Una recomendación opcional",
          "Un contenido exclusivo de ciencias naturales",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "La solidaridad y el equilibrio, junto con la reciprocidad, forman parte de...",
        opciones: [
          "Los principios de una filosofía educativa desde nuestra cultura",
          "Un modelo educativo bancario",
          "Una estrategia exclusivamente económica",
          "Un reglamento escolar",
        ],
        correcta: 0,
        tiempo: 22,
      },
      {
        texto: "La propuesta filosófica analizada busca, en definitiva, una educación más humana, comunitaria, intercultural y...",
        opciones: ["Competitiva", "Transformadora", "Estandarizada", "Individualista"],
        correcta: 1,
        tiempo: 20,
      },
    ],
  },
  {
    id: "docencia",
    nombre: "Formación Docente y Contexto Boliviano",
    icono: "📚",
    preguntas: [
      {
        texto: "La formación docente, según el texto, no puede limitarse únicamente a...",
        opciones: [
          "El dominio de técnicas y estrategias pedagógicas",
          "La comprensión de la realidad social y cultural",
          "El conocimiento de la cosmovisión andina",
          "La reflexión crítica sobre la propia práctica",
        ],
        correcta: 0,
        tiempo: 22,
      },
      {
        texto: "Un estudio citado sobre la filosofía andina en la formación docente plantea que los futuros educadores comprendan...",
        opciones: [
          "Solo la teoría occidental",
          "Tanto la teoría de Occidente como la cosmovisión andina",
          "Únicamente normas administrativas",
          "Solo metodologías digitales",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "El docente, desde la filosofía de la educación, no debe ser visto únicamente como quien transmite conocimiento, sino como un...",
        opciones: [
          "Simple evaluador de exámenes",
          "Orientador y mediador del aprendizaje",
          "Único dueño del conocimiento",
          "Transmisor pasivo de datos",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "Reconocer que docentes y estudiantes pueden aprender unos de otros permite establecer relaciones de aula más...",
        opciones: ["Jerárquicas", "Democráticas y participativas", "Distantes", "Autoritarias"],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "Uno de los objetivos de estructurar una concepción andina en la formación docente es que el futuro educador aprenda a...",
        opciones: [
          "Imponer su criterio sobre los estudiantes",
          "Respetar la decisión de los estudiantes",
          "Evitar el diálogo intercultural",
          "Priorizar solo el conocimiento occidental",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "En contextos plurinacionales e interculturales como el boliviano, se espera que el docente desarrolle una comprensión crítica de...",
        opciones: [
          "La realidad social, cultural e histórica en la que enseña",
          "Únicamente el currículo oficial",
          "Solo los resultados de evaluaciones estandarizadas",
          "Las tendencias educativas de otros países",
        ],
        correcta: 0,
        tiempo: 24,
      },
      {
        texto: "Según las conclusiones del texto, construir una educación propia significa, entre otras cosas...",
        opciones: [
          "Homogeneizar todas las culturas del país",
          "Fortalecer la identidad cultural y formar personas comprometidas con su comunidad",
          "Reducir la diversidad cultural",
          "Priorizar exclusivamente el mercado laboral",
        ],
        correcta: 1,
        tiempo: 24,
      },
      {
        texto: "El análisis del texto concluye que los modelos educativos tradicionales presentan dificultades cuando...",
        opciones: [
          "Se vinculan demasiado con la comunidad",
          "Reducen el aprendizaje a lo cognitivo y lo descontextualizan de la realidad",
          "Incorporan saberes ancestrales",
          "Fomentan el diálogo intercultural",
        ],
        correcta: 1,
        tiempo: 24,
      },
      {
        texto: "Las Escuelas Integrales e Indígenas, pese a sus diferencias de origen, coinciden en la necesidad de...",
        opciones: [
          "Superar una educación que ignore la cultura y los saberes propios de los pueblos",
          "Eliminar todo trabajo comunitario",
          "Basarse únicamente en exámenes",
          "Copiar modelos educativos extranjeros",
        ],
        correcta: 0,
        tiempo: 22,
      },
      {
        texto: "Recuperar los saberes indígenas no significa, según el texto...",
        opciones: [
          "Fortalecer la identidad cultural",
          "Rechazar por completo los conocimientos universales",
          "Repensar la educación",
          "Dialogar entre culturas",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "El texto concluye que educar no consiste únicamente en transmitir conocimientos, sino en formar seres humanos capaces de...",
        opciones: [
          "Memorizar y repetir contenidos",
          "Pensar, actuar, decidir y convivir en sociedad",
          "Competir por mejores calificaciones",
          "Aislarse para estudiar mejor",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "La preparación de los educadores debe permitirles integrar los conocimientos occidentales con...",
        opciones: [
          "Los saberes ancestrales de los pueblos originarios",
          "Solo tecnología de punta",
          "Exclusivamente normas administrativas",
          "Contenidos de otros países desarrollados",
        ],
        correcta: 0,
        tiempo: 22,
      },
      {
        texto: "¿Qué papel cumplen los educadores según el texto en la transmisión cultural?",
        opciones: [
          "Un papel secundario frente a la tecnología",
          "Un papel esencial en la transmisión de conocimientos, valores e identidades culturales",
          "Ningún papel relevante",
          "Un papel limitado solo a la evaluación",
        ],
        correcta: 1,
        tiempo: 22,
      },
      {
        texto: "Bolivia es descrita en el texto, en el marco de esta reflexión educativa, como un país...",
        opciones: ["Culturalmente homogéneo", "Plurinacional e intercultural", "Sin diversidad lingüística", "Aislado culturalmente"],
        correcta: 1,
        tiempo: 20,
      },
      {
        texto: "La transformación de la formación docente que propone el texto busca, ante todo, que el educador...",
        opciones: [
          "Se limite a aplicar un manual fijo",
          "Desarrolle una comprensión crítica de su contexto y una práctica intercultural",
          "Evite cualquier reflexión filosófica",
          "Se enfoque solo en la disciplina",
        ],
        correcta: 1,
        tiempo: 24,
      },
    ],
  },
];

// Iconos disponibles para representar equipos en el camino andino
const ICONOS_EQUIPO = ["🦙", "🦅", "🐆", "🌾", "⛰️", "🐍"];
const COLORES_EQUIPO = ["#e8a33d", "#c1502e", "#2f7a6f", "#b0456a", "#5b8c5a", "#7a5cc1"];

// Puntos fijos por respuesta correcta (ya no depende de la velocidad)
const PUNTOS_POR_RESPUESTA_CORRECTA = 5;

// Cuántas preguntas se juegan por partida (se eligen al azar del banco completo)
const PREGUNTAS_POR_PARTIDA = 10;

// Aplana todas las rondas en una sola lista, agregando el nombre/ícono de su ronda
function obtenerTodasLasPreguntas() {
  const todas = [];
  RONDAS.forEach((ronda) => {
    ronda.preguntas.forEach((p) => {
      todas.push({ ...p, rondaNombre: ronda.nombre, rondaIcono: ronda.icono });
    });
  });
  return todas;
}

// Baraja (Fisher-Yates) y devuelve `cantidad` preguntas al azar, sin repetir
function elegirPreguntasAleatorias(cantidad) {
  const todas = obtenerTodasLasPreguntas();
  const barajadas = [...todas];
  for (let i = barajadas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [barajadas[i], barajadas[j]] = [barajadas[j], barajadas[i]];
  }
  return barajadas.slice(0, Math.min(cantidad, barajadas.length));
}
