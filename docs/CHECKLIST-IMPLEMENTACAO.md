# Checklist de Implementação - Workshop Agente de IA

**Projeto:** Landing Pages + E-mail Marketing + Integração Intercom  
**Data de criação:** 28/01/2026  
**Evento:** 28/02/2026 às 14h

---

## Fase 1: Integração Formulário → Intercom
> Conectar as LPs ao Intercom para capturar leads

- [x] **1.1** Criar API route `/api/subscribe` no projeto Next.js ✅
- [x] **1.2** Configurar envio de dados para Intercom (nome, email, telefone) ✅
- [x] **1.3** Criar tag `workshop-agente-ia-fev26` no Intercom ✅ (criada automaticamente pela API)
- [x] **1.4** Aplicar tag automaticamente ao criar/atualizar contato ✅
- [x] **1.5** Atualizar `LeadCaptureForm` para usar a nova API route ✅
- [x] **1.6** Testar fluxo completo: formulário → Intercom → página obrigado ✅
- [x] **1.7** Verificar se lead aparece no Intercom com a tag correta ✅

**✅ FASE 1 COMPLETA!** (Testado com dianamila07@hotmail.com - contato criado com tag)

---

## Fase 2: Template Base de E-mail
> Criar layout padrão com identidade visual do Cultura Builder

- [x] **2.1** Criar estrutura de pastas `/src/emails/` ✅
- [x] **2.2** Criar template base (`BaseTemplate.tsx`) com:
  - [x] Cabeçalho com logo Cultura Builder ✅
  - [x] Área de conteúdo dinâmico ✅
  - [x] Rodapé com links do hub e redes sociais ✅
  - [x] Cores: laranja #E8590C, fundo escuro #0A0A0A ✅
  - [x] Fontes: Arial/Helvetica (compatível com e-mail) ✅
- [x] **2.3** Criar componentes reutilizáveis:
  - [x] `EmailButton` (CTA) ✅
  - [x] `EmailHeading` ✅
  - [x] `EmailText` ✅
  - [x] `EmailDivider` ✅
  - [x] `EmailHighlight` ✅ (extra)
  - [x] `EmailList` ✅ (extra)
- [x] **2.4** Testar renderização - Preview em `/emails/preview` ✅

**✅ FASE 2 COMPLETA!** Componentes criados em `src/emails/components/`

---

## Fase 3: Sequência de E-mails de Venda (D-7 a D-1)
> Criar os 4 e-mails da fase de carrinho aberto

### E-mail 1: Abertura do Carrinho (D-7)
- [x] **3.1** Assunto: "Está aberto: Crie seu primeiro Agente de IA (por R$167)" ✅
- [x] **3.2** Copy completo conforme doc ✅
- [x] **3.3** CTA: "Quero Garantir Minha Vaga e Criar Meu Agente de IA" ✅
- [x] **3.4** Design aplicado no template base ✅

### E-mail 2: Quebra de Objeção (D-5)
- [x] **3.5** Assunto: "Não, você não precisa ser dev." ✅
- [x] **3.6** Copy sobre "Vibe Coding" e não precisar de código ✅
- [x] **3.7** CTA: "Sim, quero criar meu agente de IA sem código" ✅
- [x] **3.8** Design aplicado no template base ✅

### E-mail 3: Prova Social (D-3)
- [x] **3.9** Assunto: "O que a Marina fez com o agente de IA dela..." ✅
- [x] **3.10** Copy com case de sucesso (Marina, consultora de marketing) ✅
- [x] **3.11** CTA: "Quero ter o mesmo poder da Marina" ✅
- [x] **3.12** Design com lista numerada estilizada ✅

### E-mail 4: Urgência Final (D-1)
- [x] **3.13** Assunto: "Última chamada: as inscrições encerram amanhã." ✅
- [x] **3.14** Copy curto com box de destaque + timer visual ✅
- [x] **3.15** CTA: "Quero garantir minha vaga antes que encerre" ✅
- [x] **3.16** Design aplicado no template base ✅

**✅ FASE 3 COMPLETA!** Templates em `src/emails/templates/`

---

## Fase 4: Sequência Pós-Evento (D+1 a D+2)
> E-mails de upsell para o high-ticket

### E-mail 5: Gravação + Oferta Upsell (D+1)
- [x] **4.1** Assunto: "[Gravação] Workshop Agentes de IA + Sua Oferta Especial" ✅
- [x] **4.2** Placeholder para vídeo (link da gravação) ✅ 📍
- [x] **4.3** Oferta: De R$2.998 por R$2.498 (R$500 off) ✅
- [x] **4.4** CTA: "Quero continuar minha jornada e me tornar um Builder" ✅
- [x] **4.5** Design com box de oferta + timer 48h ✅

### E-mail 6: Última Chance Upsell (D+2)
- [x] **4.6** Assunto: "Últimas 24h para usar seu desconto de R$500" ✅
- [x] **4.7** Copy de urgência com box de reflexão + lista de benefícios ✅
- [x] **4.8** CTA: "Não quero perder meu desconto de R$500" ✅
- [x] **4.9** Design com banner de urgência laranja ✅

**✅ FASE 4 COMPLETA!** Templates em `src/emails/templates/`
📍 **Pendente:** Substituir `#VIDEO_URL` pelo link real da gravação

---

## Fase 5: Configuração no Intercom
> Subir os e-mails e configurar disparo

**📋 Guia completo criado:** `docs/GUIA-INTERCOM.md`
**📋 HTMLs dos emails:** `docs/emails-html/`
**🔗 Página de exportação:** `http://localhost:3000/emails/export`

### Emails configurados (11 no total):
- [x] **5.1** E-mail 1 - Abertura Carrinho (31/01 - Imediato) ✅ **AO VIVO**
- [x] **5.2** E-mail 2 - Quebra de Objeção (03/02) ✅ Agendado
- [x] **5.3** E-mail 3 - Prova Social (06/02) ✅ Agendado
- [x] **5.4** E-mail 4 - Preview do Valor (10/02) ✅ Agendado
- [x] **5.5** E-mail 5 - Educação (14/02) ✅ Agendado
- [x] **5.6** E-mail 6 - Bastidores (18/02) ✅ Agendado
- [x] **5.7** E-mail 7 - Lembrete D-7 (21/02) ✅ Agendado
- [x] **5.8** E-mail 8 - Escassez D-3 (25/02) ✅ Agendado
- [x] **5.9** E-mail 9 - Urgência D-1 (27/02) ✅ Agendado
- [x] **5.10** E-mail 10 - Gravação + Upsell (01/03) ✅ Agendado 📍 aguardando link vídeo
- [x] **5.11** E-mail 11 - Última Chance Upsell (02/03) ✅ Agendado

### Configurações aplicadas:
- [x] Remetente: Cultura Builder (bruno@culturabuilder.com) ✅
- [x] Tag de público: workshop-agente-ia-fev26 ✅
- [x] Envio único por pessoa ✅
- [x] Datas de início e fim configuradas ✅

**✅ FASE 5 COMPLETA!** (30/01/2026)

---

## Fase 6: Ajustes nas LPs
> Correções identificadas no diagnóstico

- [x] **6.1** Atualizar link do WhatsApp na página `/obrigado` ✅ (placeholder + TODO)
- [x] **6.2** `CTAButton` já estava correto (`#inscricao`) ✅
- [x] **6.3** Remover `PartnersSection` duplicado na LP10 ✅
- [ ] **6.4** Revisar acentuação nos textos (opcional, baixa prioridade)

**✅ FASE 6 COMPLETA!** (item 6.4 é opcional)
📍 **Pendente:** Substituir link do WhatsApp em `/obrigado`

---

## Fase 7: Testes Finais
> Garantir que tudo funciona antes do lançamento

- [ ] **7.1** Teste completo do formulário em todas as LPs
- [ ] **7.2** Verificar se lead chega no Intercom com dados corretos
- [ ] **7.3** Enviar e-mail de teste para si mesmo (cada um dos 11)
- [ ] **7.4** Verificar visualização em:
  - [ ] Gmail (web)
  - [ ] Gmail (mobile)
  - [ ] Outlook
- [ ] **7.5** Testar página de obrigado e link do WhatsApp
- [ ] **7.6** Validar contador regressivo (data 28/02)

---

## Cronograma Sugerido

| Fase | Descrição | Tempo estimado |
|------|-----------|----------------|
| 1 | Integração Formulário → Intercom | ~1h |
| 2 | Template Base de E-mail | ~2h |
| 3 | 4 E-mails de Venda | ~2h |
| 4 | 2 E-mails Pós-Evento | ~1h |
| 5 | Configuração no Intercom | ~1h (você faz) |
| 6 | Ajustes nas LPs | ~30min |
| 7 | Testes Finais | ~1h |

**Total estimado:** ~8-9 horas de trabalho

---

## Notas

- **Prioridade máxima:** Fase 1 (integração) e Fase 3 (e-mails de venda)
- **Pode ser feito depois:** Fase 4 (pós-evento) e Fase 6 (ajustes menores)
- **Dependência externa:** Fase 5 depende de você acessar o Intercom

---

## Status

- **Criado em:** 28/01/2026
- **Última atualização:** 30/01/2026
- **Progresso geral:** ~95% (Faltam apenas testes finais e pendências menores)

### Arquivos criados/modificados:
- `src/app/api/subscribe/route.ts` - API route para integração Intercom
- `src/components/LeadCaptureForm.tsx` - Atualizado para usar a API
- `.env.local` - Token do Intercom configurado
- `docs/emails-html/` - 11 HTMLs de email responsivos
- `docs/emails-html/GUIA-EMAILS.md` - Guia de referência dos emails

### Emails no Intercom:
- **E-mail 1:** AO VIVO ✅
- **E-mails 2-11:** AGENDADOS ✅

### Pendências finais:
- 📍 Substituir `#LINK_GRAVACAO` no Email 10 (após workshop)
- 📍 Substituir link do WhatsApp em `/obrigado`
- 📍 Testes finais (Fase 7)
