/**
 * Veterinario Alfa Latinoamérica — Configuración principal
 *
 * NODE_ID identifica el nodo regional activo.
 * Cambiar este valor activa el nodo correspondiente definido en regions.js.
 *
 * Valores válidos: 'latam' | 'co' | 'ec' | 'pe' | 've' | 'mx' | 'es' | 'otros'
 */

export const NODE_ID = process.env.NODE_ID || 'latam';

export const APP = {
  name:        'Veterinario Alfa',
  nameFull:    'Veterinario Alfa Latinoamérica',
  slogan:      'Alfa no es un título. Es lo que construyes cuando dejas de sobrevivir.',
  metaDesc:    'Programa de desarrollo profesional, empresarial y mental para veterinarios de Latinoamérica. Cobra lo que vales. Lidera tu clínica. Cuida tu mente.',
  domain:      'veterinarioalfa.vitalvetcrv.com.co',
  supabaseUrl: 'https://xpjjolrznelyejflctvh.supabase.co',
  nodeId:      NODE_ID,
};
