/**
 * Veterinario Alfa Latinoamérica — Script de migración Supabase
 *
 * Uso:
 *   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key node supabase/migrate.js
 *
 * La service_role key la encuentras en:
 *   https://supabase.com/dashboard/project/xpjjolrznelyejflctvh/settings/api
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = 'https://xpjjolrznelyejflctvh.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('❌  Falta SUPABASE_SERVICE_ROLE_KEY en el entorno.');
  console.error('    Obténla en: https://supabase.com/dashboard/project/xpjjolrznelyejflctvh/settings/api');
  console.error('    Ejecución: SUPABASE_SERVICE_ROLE_KEY=eyJ... node supabase/migrate.js');
  process.exit(1);
}

const migrations = [
  '001_programa_leads.sql',
];

async function runSQL(sql, label) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ sql }),
  });

  if (!res.ok) {
    // Supabase Management API fallback
    const mgmtRes = await fetch(
      `https://api.supabase.com/v1/projects/xpjjolrznelyejflctvh/database/query`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ query: sql }),
      }
    );
    if (!mgmtRes.ok) {
      const err = await mgmtRes.text();
      throw new Error(`${label}: ${err}`);
    }
    console.log(`✅  ${label} — OK (via Management API)`);
    return;
  }
  console.log(`✅  ${label} — OK`);
}

async function migrate() {
  console.log('🚀  Veterinario Alfa Latinoamérica — Migraciones Supabase');
  console.log(`    Proyecto: xpjjolrznelyejflctvh\n`);

  for (const file of migrations) {
    const sql = readFileSync(join(__dirname, 'migrations', file), 'utf8');
    console.log(`⏳  Ejecutando ${file}...`);
    try {
      await runSQL(sql, file);
    } catch (e) {
      console.error(`❌  Error en ${file}:`, e.message);
      console.error('\n📋  Ejecuta el SQL manualmente en:');
      console.error('    https://supabase.com/dashboard/project/xpjjolrznelyejflctvh/sql');
      console.error('\nSQL a ejecutar:\n');
      console.log(sql);
    }
  }

  console.log('\n✨  Migración completa.');
}

migrate();
