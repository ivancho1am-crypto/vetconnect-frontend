/**
 * Veterinario Alfa Latinoamérica — Nodos regionales (cliente)
 * Solo lectura — sin lógica condicional activa todavía.
 */
const VA_REGIONS = [
  { id:'latam', name:'Veterinario Alfa Latinoamérica', country:'LATAM', status:'active',  isHub:true  },
  { id:'co',    name:'Veterinario Alfa Colombia',       country:'CO',    status:'planned', isHub:false },
  { id:'ec',    name:'Veterinario Alfa Ecuador',        country:'EC',    status:'planned', isHub:false },
  { id:'pe',    name:'Veterinario Alfa Perú',           country:'PE',    status:'planned', isHub:false },
  { id:'ve',    name:'Veterinario Alfa Venezuela',      country:'VE',    status:'planned', isHub:false },
  { id:'mx',    name:'Veterinario Alfa México',         country:'MX',    status:'planned', isHub:false },
  { id:'es',    name:'Veterinario Alfa España',         country:'ES',    status:'planned', isHub:false },
  { id:'otros', name:'Veterinario Alfa Internacional',  country:'INTL',  status:'planned', isHub:false },
];
if (typeof window !== 'undefined') window.VA_REGIONS = VA_REGIONS;
