-- ============================================================
-- Veterinario Alfa Latinoamérica — Migración 001
-- Tabla: programa_leads (Registro de Interés Programa Alfa)
-- ============================================================

CREATE TABLE IF NOT EXISTS programa_leads (
  id                uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre            text        NOT NULL CHECK (nombre !~ '<[^>]*>'),
  apellido          text        NOT NULL CHECK (apellido !~ '<[^>]*>'),
  email             text        NOT NULL CHECK (email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  indicativo        text,
  telefono          text,
  pais              text        NOT NULL,
  tipo_profesional  text        NOT NULL CHECK (
    tipo_profesional IN ('Médico Veterinario', 'Médico Veterinario Zootecnista')
  ),
  matricula         text,
  anios_ejerciendo  text        NOT NULL,
  universidad       text        NOT NULL CHECK (universidad !~ '<[^>]*>'),
  fuente            text        DEFAULT 'programa_alfa_web',
  estado            text        DEFAULT 'pendiente' CHECK (
    estado IN ('pendiente', 'contactado', 'inscrito', 'descartado')
  ),
  notas             text,
  created_at        timestamptz DEFAULT now()
);

-- Índices útiles para el CRM
CREATE INDEX IF NOT EXISTS idx_programa_leads_email   ON programa_leads(email);
CREATE INDEX IF NOT EXISTS idx_programa_leads_pais    ON programa_leads(pais);
CREATE INDEX IF NOT EXISTS idx_programa_leads_estado  ON programa_leads(estado);
CREATE INDEX IF NOT EXISTS idx_programa_leads_created ON programa_leads(created_at DESC);

-- ── RLS ──────────────────────────────────────────────────────
ALTER TABLE programa_leads ENABLE ROW LEVEL SECURITY;

-- Anon puede INSERT (registro desde la web)
CREATE POLICY "insert_programa_lead" ON programa_leads
  FOR INSERT TO anon
  WITH CHECK (
    nombre       IS NOT NULL AND nombre       !~ '<[^>]*>' AND
    apellido     IS NOT NULL AND apellido     !~ '<[^>]*>' AND
    email        IS NOT NULL AND email        ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' AND
    pais         IS NOT NULL AND
    tipo_profesional IS NOT NULL AND
    anios_ejerciendo IS NOT NULL AND
    universidad  IS NOT NULL AND universidad  !~ '<[^>]*>'
  );

-- Solo service_role puede leer y administrar
CREATE POLICY "select_service_only" ON programa_leads
  FOR SELECT TO service_role USING (true);

CREATE POLICY "update_service_only" ON programa_leads
  FOR UPDATE TO service_role USING (true);

CREATE POLICY "delete_service_only" ON programa_leads
  FOR DELETE TO service_role USING (true);

-- ── Comentarios para documentación ───────────────────────────
COMMENT ON TABLE  programa_leads IS 'Registros de interés en el Programa Alfa — Veterinario Alfa Latinoamérica';
COMMENT ON COLUMN programa_leads.fuente IS 'Origen del registro: programa_alfa_web, whatsapp, etc.';
COMMENT ON COLUMN programa_leads.estado IS 'Estado CRM: pendiente → contactado → inscrito / descartado';
