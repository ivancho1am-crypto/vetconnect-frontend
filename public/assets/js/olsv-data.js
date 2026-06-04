/**
 * OLSV — Observatorio Latinoamericano de Salud Veterinaria
 * Datos estáticos del estudio · Actualizar aquí para reflejar en toda la web
 * Nota: NO incluir conteos exactos de personas — solo porcentajes y categorías.
 */

const OLSV = {
  nombre:    'Observatorio Latinoamericano de Salud Veterinaria',
  sigla:     'OLSV',
  tagline:   'Investigación para transformar la realidad del médico veterinario en Latinoamérica',
  fundacion: '2024',
  pais:      'Colombia',
  instrumento: 'Score OLSV Latam',
  area:      'Clínica de pequeñas especies',
  tipo:      'Salud pública aplicada a medicina veterinaria',
  estado:    'En curso',

  paises: [
    { nombre:'Colombia',   iso:'CO', emoji:'🇨🇴', activo:true  },
    { nombre:'México',     iso:'MX', emoji:'🇲🇽', activo:true  },
    { nombre:'Ecuador',    iso:'EC', emoji:'🇪🇨', activo:true  },
    { nombre:'Perú',       iso:'PE', emoji:'🇵🇪', activo:true  },
    { nombre:'Venezuela',  iso:'VE', emoji:'🇻🇪', activo:true  },
    { nombre:'Argentina',  iso:'AR', emoji:'🇦🇷', activo:true  },
    { nombre:'Chile',      iso:'CL', emoji:'🇨🇱', activo:true  },
    { nombre:'España',     iso:'ES', emoji:'🇪🇸', activo:true  },
  ],

  // Hallazgos — solo porcentajes, sin conteos exactos
  hallazgos: [
    {
      icono: '🧠',
      stat:  '82%',
      titulo: 'Desgaste moderado o superior',
      texto:  'La mayoría de los evaluados reportó algún nivel de desgaste, con predominio en rango moderado-alto. El desgaste en la profesión veterinaria no es la excepción — es el patrón.',
    },
    {
      icono: '💰',
      stat:  '36%',
      titulo: 'Dimensión financiera: la más afectada',
      texto:  'La dificultad para establecer y defender honorarios profesionales apareció como el factor de estrés más frecuente e invisibilizado en todos los países participantes.',
    },
    {
      icono: '⏳',
      stat:  '3 de 4',
      titulo: 'Normalización de la sobrecarga',
      texto:  'Tres de cada cuatro participantes identificó haber normalizado situaciones de carga laboral que, evaluadas objetivamente, superan los umbrales recomendados de bienestar profesional.',
    },
    {
      icono: '🌐',
      stat:  '8 países',
      titulo: 'Patrón regional, no local',
      texto:  'El aislamiento profesional y la ausencia de redes de apoyo fue señalado como factor amplificador en todos los países participantes — validando que el problema trasciende fronteras.',
    },
  ],

  // Datos para las métricas de alcance (no exponer conteo exacto)
  metricas: [
    { valor: '8 países',  label: 'De habla hispana · LATAM + España' },
    { valor: 'Desde 2024', label: 'Estudio activo · En curso'        },
    { valor: '82%',        label: 'De evaluados con desgaste medible' },
    { valor: 'Área clínica', label: 'Pequeñas especies · Consulta veterinaria' },
  ],

  fundador: {
    nombre:   'Dr. Iván Durán',
    titulo:   'Médico Veterinario · Universidad de La Salle · Colombia',
    bio:      'Veterinario clínico especializado en cirugía de alta complejidad y medicina avanzada en pequeñas especies. Fundador de Clínica VitalVet CRV (Barbosa, Santander) y del programa Veterinario Alfa. Investiga el síndrome de desgaste emocional en veterinarios desde la neurociencia, el desarrollo personal y las herramientas empresariales.',
    iniciales: 'ID',
  },
};

if (typeof window !== 'undefined') window.OLSV = OLSV;
