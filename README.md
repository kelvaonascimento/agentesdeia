This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Variáveis de ambiente (.env.local)

Para o dashboard com vendas reais (Pagar.me) e demais integrações:

- **Dashboard / Auth:** `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `AUTH_SECRET`
- **Login (CORS):** `ALLOWED_ORIGINS` (opcional) — lista de origens permitidas separadas por vírgula (ex.: `https://seu-dominio.com,https://www.seu-dominio.com`). Se não definir, usa localhost e `VERCEL_URL`.
- **Google Analytics (GA4):** `GA4_PROPERTY_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`
- **Meta Ads:** `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID`
- **Pagar.me (vendas reais):** `PAGARME_SECRET_KEY` — use a **chave secreta de produção** para que o dashboard mostre só vendas confirmadas (pagas). Em ambiente de teste, pedidos de teste não entram se você usar a chave de produção.
- **Pagar.me – filtrar por produto (opcional):** `PAGARME_PRODUCT_CODES` — se você tem mais de um produto no Pagar.me e quer que o dashboard mostre só as vendas de um deles, defina aqui os **códigos dos itens** separados por vírgula (ex.: `WORKSHOP-AGENTE,workshop-ia`). Os códigos são os que você usa ao criar o pedido/item no Pagar.me. Se não definir, entram todos os pedidos da conta.

### Segurança (checklist)

- **Dashboard e APIs protegidos no servidor:** o middleware Next.js (`src/middleware.ts`) redireciona `/dashboard` para `/login` e retorna 401 para `/api/analytics/*`, `/api/leads` e `/api/chat` quando não há cookie de autenticação válido (proteção server-side, não só client-side).
- **Content-Security-Policy (CSP), X-Content-Type-Options e X-Frame-Options:** configurados em `next.config.ts` (headers globais) para mitigar XSS, MIME sniffing e clickjacking.
- **CORS no login:** `/api/auth/login` não usa wildcard; as origens permitidas vêm de `ALLOWED_ORIGINS` ou, se vazio, de localhost e `VERCEL_URL`.
- **Rate limiting no login:** até 5 tentativas por IP a cada 15 minutos em `/api/auth/login` para reduzir risco de força bruta.
- **Cookie de auth:** `httpOnly`, `secure` em produção, `sameSite: lax`.

### Como configurar a chave do Pagar.me

1. Acesse o [dashboard Pagar.me](https://dashboard.pagar.me) e faça login.
2. Vá em **Configurações** (ou **Desenvolvimento**) → **Chaves**.
3. Selecione o ambiente **Produção**.
4. Clique em **Revelar** na **Chave secreta** (começa com `sk_`) e copie.
5. No projeto:
   - **Local:** crie/edite o arquivo `.env.local` na raiz e adicione:
     ```env
     PAGARME_SECRET_KEY=sk_sua_chave_aqui
     ```
   - **Produção (Vercel):** em **Settings** → **Environment Variables**, adicione `PAGARME_SECRET_KEY` com o mesmo valor.
6. Reinicie o servidor (`npm run dev`) ou faça um novo deploy. O dashboard na aba **Google** mostrará a seção **Vendas reais (Pagar.me)** com confirmadas, pendentes e receita.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
