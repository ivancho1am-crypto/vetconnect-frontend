/**
 * Veterinario Alfa Latinoamérica — Config cliente
 * Expone configuración de marca al frontend estático.
 */
const VA = {
  name:     'Veterinario Alfa',
  nameFull: 'Veterinario Alfa Latinoamérica',
  slogan:   'Alfa no es un título. Es lo que construyes cuando dejas de sobrevivir.',
  nodeId:   'latam',
  domain:   'veterinarioalfa.vitalvetcrv.com.co',
};
if (typeof window !== 'undefined') window.VA = VA;
