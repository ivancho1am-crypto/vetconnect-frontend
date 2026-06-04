/**
 * Veterinario Alfa Latinoamérica — Nodos Regionales
 *
 * Define la estructura de todos los nodos del ecosistema.
 * Para activar un nodo: establece NODE_ID en Railway (variables de entorno).
 *
 * Estructura del nodo:
 *   id:        identificador único del nodo
 *   name:      nombre completo visible
 *   slug:      slug para URL y subdirectorio
 *   subdomain: subdominio asignado en vitalvetcrv.com.co
 *   country:   código ISO 3166-1 alpha-2
 *   status:    'active' | 'planned' | 'inactive'
 */

export const REGIONS = [
  {
    id:        'latam',
    name:      'Veterinario Alfa Latinoamérica',
    slug:      'veterinarioalfa',
    subdomain: 'veterinarioalfa.vitalvetcrv.com.co',
    country:   'LATAM',
    status:    'active',
    isHub:     true,
  },
  {
    id:        'co',
    name:      'Veterinario Alfa Colombia',
    slug:      'veterinarioalfacolombia',
    subdomain: 'veterinarioalfacolombia.vitalvetcrv.com.co',
    country:   'CO',
    status:    'planned',
    isHub:     false,
  },
  {
    id:        'ec',
    name:      'Veterinario Alfa Ecuador',
    slug:      'veterinarioalfaecuador',
    subdomain: 'veterinarioalfaecuador.vitalvetcrv.com.co',
    country:   'EC',
    status:    'planned',
    isHub:     false,
  },
  {
    id:        'pe',
    name:      'Veterinario Alfa Perú',
    slug:      'veterinarioalfaperu',
    subdomain: 'veterinarioalfaperu.vitalvetcrv.com.co',
    country:   'PE',
    status:    'planned',
    isHub:     false,
  },
  {
    id:        've',
    name:      'Veterinario Alfa Venezuela',
    slug:      'veterinarioalfavenezuela',
    subdomain: 'veterinarioalfavenezuela.vitalvetcrv.com.co',
    country:   'VE',
    status:    'planned',
    isHub:     false,
  },
  {
    id:        'mx',
    name:      'Veterinario Alfa México',
    slug:      'veterinarioalfamexico',
    subdomain: 'veterinarioalfamexico.vitalvetcrv.com.co',
    country:   'MX',
    status:    'planned',
    isHub:     false,
  },
  {
    id:        'es',
    name:      'Veterinario Alfa España',
    slug:      'veterinarioalfaespana',
    subdomain: 'veterinarioalfaespana.vitalvetcrv.com.co',
    country:   'ES',
    status:    'planned',
    isHub:     false,
  },
  {
    id:        'otros',
    name:      'Veterinario Alfa Internacional',
    slug:      'veterinarioalfaotros',
    subdomain: 'veterinarioalfaotros.vitalvetcrv.com.co',
    country:   'INTL',
    status:    'planned',
    isHub:     false,
  },
];

export const ACTIVE_REGION = REGIONS.find(r => r.status === 'active');
export const getRegion = (id) => REGIONS.find(r => r.id === id);
