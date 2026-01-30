# Checkup completo do projeto – Landing Pages Workshop Agente de IA

**Data:** 28/01/2026  
**Stack:** Next.js 16, React 19, Tailwind CSS 4, TypeScript

---

## 1. Visão geral

| Item | Status |
|------|--------|
| **Páginas** | 12 rotas (home + 9 LPs + obrigado + workshop principal) |
| **Componentes** | 13 componentes reutilizáveis |
| **Linter** | 0 erros reportados |
| **Imagens expert** | caio-1 a caio-5 presentes em `/public/images/expert/` |

---

## 2. Página a página

### **`/` (Home – índice de LPs)**

- **Função:** Lista todas as LPs com link, tag e descrição.
- **Pontos positivos:** Estrutura clara, uso de `key={i}` (ideal seria key estável, ex. `page.path`), responsivo.
- **Ajustes sugeridos:**
  - Trocar `key={i}` por `key={page.path}` nos cards.
  - A home não tem `metadata` própria; herda do `layout.tsx` (OK para índice interno).

---

### **`/workshop-agente-ia` (LP1 – principal)**

- **Seções:** Hero 2 colunas, strip expert, “Chega de teoria”, Partners, TargetAudience, Steps, ExpertSection(3), BonusGarantia, FAQ, CTA final, Footer.
- **Pontos positivos:** Conteúdo completo, CountdownTimer, formulário com `id="inscricao"`, imagens com `priority` no hero.
- **Ajustes:**
  - Linha 166: `<PartnersSection />      <TargetAudience />` — dois componentes na mesma linha (só formatação).
  - Imagem no “expert intro strip” (caio-5): `Image` com `fill` mas o pai não tem `position: relative` — o pai é `div` com classes; no seu caso o `relative` está no `div` do avatar. Verificar se em todos os usos de `fill` o container tem `relative` e dimensões.

---

### **`/lp2-urgencia`**

- **Foco:** Urgência, countdown, barra de vagas 87%, timeline de fechamento.
- **Pontos positivos:** Variantes de seções (compact, cards, horizontal, side) bem usadas.
- **Observação:** Barra de vagas está fixa em 87% (hardcoded) — esperado para LP; depois pode vir de CMS/API.

---

### **`/lp3-expert`**

- **Foco:** Caio em destaque, citação, bio, “O que você vai construir”.
- **Pontos positivos:** Sem ExpertSection compartilhado no hero (conteúdo próprio), quote e bio claros.
- **Ortografia:** “vao” → “vão”, “e” → “é” na citação (linha 98) e no título “Quem e” (linha 118).
- **Ortografia:** “é muito mais” na bio (linha 122) — acento em “é”.

---

### **`/lp4-prova-social`**

- **Foco:** Depoimentos em grid, caso “Antes/Depois”, números (6.793+, 100+, 4.9).
- **Pontos positivos:** 6 depoimentos, seção antes/depois, estrelas.
- **Ortografia:** “ja” → “já”, “PROXIMO” no botão → “PRÓXIMO” (se quiser acentuar em CTAs).

---

### **`/lp5-minimalista`**

- **Foco:** Poucos elementos, pricing card, lista “O que está incluso”.
- **Pontos positivos:** Sem Countdown no hero (proposital), sem BonusGarantia separado (garantia no card).
- **Observação:** Componente `SectionTitle` existe mas não é usado nas LPs; várias páginas repetem padrão de título — poderia padronizar com `SectionTitle` onde fizer sentido.

---

### **`/lp6-storytelling`**

- **Foco:** História do Rafael, antes/depois “Espectador vs Builder”, 3 momentos.
- **Pontos positivos:** Narrativa clara, quote de caso real.
- **Ortografia:** “so” → “só”, “e” → “é” em “E complexo” (LP8), “transformacao” → “transformação” no botão.

---

### **`/lp7-video-first`**

- **Foco:** Placeholder de vídeo no hero (imagem + botão play), cards “O que você vai construir”.
- **Pontos positivos:** Hero orientado a mídia, imagem de fundo com opacidade.
- **Acessibilidade:** O “play” é apenas visual; se for link para vídeo, usar `<a>` ou `<button>` com texto tipo “Assistir ao convite do Caio” e manter o ícone.

---

### **`/lp8-faq-focused`**

- **Foco:** Mitos vs realidade, FAQ em destaque, pricing card.
- **Pontos positivos:** Quebra de objeções bem estruturada.
- **Ortografia:** “E muito” → “É muito”, “E complexo” → “É complexo” na lista de mitos.
- **Ortografia:** “duvida” no subtítulo do FAQ → “dúvida”.

---

### **`/lp9-countdown`**

- **Foco:** Barra fixa inferior com countdown + CTA, vagas 87%, etapas de fechamento.
- **Pontos positivos:** Sticky bar no bottom, `#inscricao` correto.
- **Layout:** `mb-16` na última section antes do Footer para o conteúdo não ficar atrás da barra fixa — já existe (mb-16), OK.
- **ExpertSection:** Usa `imageIndex={5}`; existe `caio-5.png`, OK.

---

### **`/lp10-mobile-cta`**

- **Foco:** CTA fixo só no mobile (`sm:hidden`), cards compactos, chips 90min/0 código/R$167.
- **Pontos positivos:** Sticky CTA mobile, formulário `hidden sm:block` no hero (evita duplicar no mobile).
- **Problema:** `PartnersSection variant="compact"` aparece **duas vezes** (por volta das linhas 145 e 203). Recomendação: remover uma das ocorrências.
- **Ortografia:** “funcional é um template” → “funcional e um template” (linha 39).
- **LP10:** Não usa StepsSection, TargetAudience nem ExpertSection “oficial”; tem bloco próprio do Caio — proposital para mobile, OK.

---

### **`/obrigado`**

- **Função:** Confirmação + entrada no grupo VIP (WhatsApp) + data/horário/preparação.
- **Problema crítico:** Link do WhatsApp é placeholder: `https://chat.whatsapp.com/SEU_LINK_AQUI`. É preciso substituir pelo link real do grupo.
- **Ortografia:** “Parabens” → “Parabéns”, “recebera” → “receberá”, “preparacao” → “preparação”, “duvida” → “dúvida”.
- **Observação:** Não usa StickyBar (proposital em página de obrigado), OK.

---

## 3. Componentes

### **Header**
- Client component, scroll → glass. Logo Next/Image, link `#inscricao`. OK.

### **StickyBar**
- Aparece após scroll > 400px, countdown inline, CTA `#inscricao`. OK.

### **LeadCaptureForm**
- **Variantes:** default, compact, inline. Nome, e-mail, telefone; submit simula 800ms e redireciona para `/obrigado`.
- **Problema:** Nenhum dado é enviado a backend/API; é apenas simulação. Para produção é necessário:
  - Endpoint (API route ou serviço externo) para salvar lead.
  - Envio dos dados antes do `router.push("/obrigado")`.
- **Acessibilidade:** Labels associados aos inputs (via `htmlFor` + `id`) melhorariam leitura por leitores de tela.

### **CountdownTimer**
- **targetDate:** `2026-02-28T14:00:00-03:00`. Hydration: só renderiza após `mounted` (evita mismatch). Variantes default, compact, large, inline. OK.

### **CTAButton**
- **Problema:** Default `href = "#inscrição"` (com ç). Em todo o projeto o id usado é `id="inscricao"` (sem ç). Quem usar CTAButton sem passar `href` terá âncora que não encontra o bloco. **Correção:** alterar default para `href="#inscricao"`.
- **Uso:** CTAButton não é usado em nenhuma página no momento; só existe o componente.

### **ExpertSection**
- **Variantes:** default, side, minimal. **imageIndex** 1–5 → `caio-{imageIndex}.png`. Todas as imagens existem. OK.

### **FAQ**
- **Variantes:** default (accordion), cards. `faqData` com 6 perguntas; texto com “Nao”, “recebera”, “podera” etc. — acentos podem ser corrigidos para padrão editorial.
- **Cards:** `max-h-40` na resposta aberta pode cortar texto longo; considerar `max-h-96` ou `max-h-none` se necessário.

### **Footer**
- Logo, copyright, links “Termos de Uso” e “Privacidade” com `href="#"`. Em produção, apontar para páginas reais.

### **BonusGarantia**
- Variantes default e stacked. Textos com “recebera”, “podera”, “ate” — acentos para revisão.

### **PartnersSection**
- Variantes default e compact. Imagem única `partners-nvidia-aws.png` usada nos dois cards (AWS e NVIDIA) com `clipPath`/objectPosition. OK.

### **SectionTitle**
- Badge, title, highlight, subtitle, align. **Observação:** `subtitle` usa `mx-auto`; quando `align="left"`, o subtitle continua centralizado. Se quiser subtitle alinhado à esquerda, condicionar `mx-auto` ao `align === "center"`.

### **StepsSection**
- Variantes default, horizontal, timeline. Textos com “Inteligencia”, “decisoes”, “estara” — acentos para revisão.

### **TargetAudience**
- Variantes default, cards, minimal. Textos com “indispensavel”, “Visionario”, “negocio” — acentos para revisão.

---

## 4. Layout e estilos

### **layout.tsx**
- `lang="pt-BR"`, fontes Geist + Geist Mono, metadata global (título, description, keywords, openGraph). OK.
- **Sugestão:** Páginas específicas (ex.: `/obrigado`) podem ter `export const metadata` próprio (título “Obrigado | Cultura Builder”) para SEO/share.

### **globals.css**
- Tailwind 4, variáveis CSS (cores, fontes), animações (glow-pulse, float, fade-in-up, etc.), utilitárias (text-gradient-orange, bg-hero-gradient, btn-glow, etc.). Scroll suave, scrollbar customizada. OK.
- **Observação:** `@keyframes btn-glow-pulse` está definido; classe `.btn-glow` usada no LeadCaptureForm. Consistente.

---

## 5. Configuração e build

| Arquivo | Status |
|---------|--------|
| **package.json** | Next 16, React 19, framer-motion, lucide-react. Script `"lint": "eslint"` — pode não rodar em nenhum arquivo; comum ser `"lint": "next lint"` ou `"eslint ."`. |
| **next.config.ts** | Vazio (só tipo). OK. |
| **tsconfig.json** | paths `@/*` → `./src/*`, strict. OK. |
| **eslint.config.mjs** | next/core-web-vitals + next/typescript. OK. |

---

## 6. Resumo de ações recomendadas

### Crítico (produção)
1. **Obrigado:** Trocar `https://chat.whatsapp.com/SEU_LINK_AQUI` pelo link real do grupo WhatsApp.
2. **LeadCaptureForm:** Integrar com API/backend para persistir nome, e-mail e telefone antes de redirecionar para `/obrigado`.

### Importante
3. **CTAButton:** Alterar default de `href="#inscrição"` para `href="#inscricao"`.
4. **LP10:** Remover uma das duas chamadas a `PartnersSection` (duplicada).

### Revisão de texto (ortografia/acentuação)
5. Revisar em todo o projeto: “e” → “é”, “ja” → “já”, “recebera” → “receberá”, “podera” → “poderá”, “duvida” → “dúvida”, “preparacao” → “preparação”, “Parabens” → “Parabéns”, “ate” → “até”, “so” → “só”, “transformacao” → “transformação”, “Inteligencia”, “decisoes”, “estara”, “indispensavel”, “Visionario”, “negocio”, etc., conforme padrão editorial.
6. **LP10:** “funcional é um template” → “funcional e um template” (conjunção, não “é”).

### Melhorias
7. **Home:** Usar `key={page.path}` em vez de `key={i}` na lista de páginas.
8. **Formulário:** Adicionar `<label>` com `htmlFor` nos inputs do LeadCaptureForm (acessibilidade).
9. **Footer:** Atualizar links “Termos de Uso” e “Privacidade” para URLs reais quando existirem.
10. **Script lint:** Ajustar para `next lint` ou `eslint .` (e rodar em diretório desejado) para garantir checagem em todo o código.
11. **SectionTitle (subtitle):** Quando `align="left"`, remover `mx-auto` do subtitle para alinhar à esquerda (se for o comportamento desejado).
12. **Metadata por rota:** Considerar `metadata` específico em `/obrigado` (e outras rotas importantes) para título e descrição próprios.

---

## 7. Conclusão

O projeto está bem estruturado: 12 rotas, componentes reutilizáveis com variantes, design system em CSS, imagens do expert e parceiros presentes. Não há erros de lint. Os pontos críticos para ir ao ar são: **link real do WhatsApp na página de obrigado** e **integração do formulário com backend**. Os demais itens são correções de texto, acessibilidade, consistência de âncora no CTAButton e pequenos ajustes de layout e script de lint.
