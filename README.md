# VetConnect Pro LATAM

Plataforma de desarrollo profesional para médicos veterinarios de Latinoamérica.

## Stack

| Capa | Tecnología |
|------|------------|
| Frontend | HTML5 / CSS3 / Vanilla JS (sin frameworks) |
| Servidor | Node.js + Express (Railway) |
| Base de datos | Supabase (PostgreSQL) |
| Email | WordPress REST API personalizada |
| CDN | Railway + CNAME en cPanel |

## Estructura

```
vetconnect-pro-latam/
├── public/               ← Sitio estático completo
│   ├── index.html        ← Home principal
│   ├── test.html         ← Landing del test iScore
│   ├── iscore.html       ← Test 41 preguntas (nativo)
│   ├── programa.html     ← Programa Alfa + formulario
│   ├── metodologia.html  ← Metodología 10 pilares
│   ├── nosotros.html     ← Historia del equipo
│   ├── recursos.html     ← Centro de recursos
│   ├── blog.html         ← 6 artículos basados en datos
│   ├── articulo-1..6.html
│   ├── dashboard.html    ← Dashboard analytics (privado)
│   ├── vetconnect.css    ← CSS compartido
│   └── logos/            ← Logos del ecosistema
├── supabase/
│   ├── migrations/
│   │   └── 001_programa_leads.sql
│   └── migrate.js        ← Script de migración
├── server.js             ← Express para Railway
├── package.json
├── .env.example
└── .gitignore
```

## Supabase — Tablas

| Tabla | Propósito |
|-------|-----------|
| `iscore_responses` | Respuestas del test iScore LATAM |
| `programa_leads` | Registros de interés Programa Alfa |

### Crear tabla programa_leads

```bash
# Opción 1: Script automático
SUPABASE_SERVICE_ROLE_KEY=tu_key node supabase/migrate.js

# Opción 2: SQL Editor en dashboard.supabase.com
# Ejecutar: supabase/migrations/001_programa_leads.sql
```

## Deploy

```bash
# Desarrollo local
npm install
npm run dev

# Producción (Railway auto-deploys desde GitHub main)
git push origin main
```

## Dominio

`vetconnectpro.vitalvetcrv.com.co` → CNAME → Railway domain

## Edge Functions (Supabase)

- `dashboard-data` — Proxy seguro para el dashboard de analytics

---

© 2026 VetConnect Pro LATAM · Ivan Durán Monroy, MV
