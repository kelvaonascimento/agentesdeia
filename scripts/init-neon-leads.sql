-- Cole este SQL no Neon: SQL Editor > New query > Execute
-- Tabela de leads (inscrições do formulário)

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  source TEXT DEFAULT 'workshop-agente-ia-fev26'
);

-- Índice para buscar por email (evitar duplicatas se quiser)
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);

-- Comentário
COMMENT ON TABLE leads IS 'Leads capturados pelo formulário (LP Workshop Agente IA)';
