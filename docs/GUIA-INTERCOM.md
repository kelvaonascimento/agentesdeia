# Guia de Configuração do Intercom

**Projeto:** Workshop Agente de IA - E-mail Marketing  
**Data:** 28/01/2026

---

## 1. Criar Segmentos

### Segmento 1: Leads do Workshop (Pré-Evento)
1. Acesse **Contacts → Segments**
2. Clique em **New segment**
3. Configure:
   - **Nome:** `Workshop Agente IA - Inscritos`
   - **Filtro:** `Tag` → `is` → `workshop-agente-ia-fev26`
4. Salve

### Segmento 2: Participantes do Workshop (Pós-Evento)
1. Crie outro segmento
2. Configure:
   - **Nome:** `Workshop Agente IA - Participantes`
   - **Filtro:** `Tag` → `is` → `workshop-participantes-fev26`
3. Salve

> **Nota:** A tag `workshop-participantes-fev26` será aplicada manualmente ou via integração após o evento

---

## 2. Subir os E-mails

Para cada e-mail (1 a 6):

### Passo a Passo

1. Acesse **Outbound → Messages**
2. Clique em **New message**
3. Selecione **Email**
4. Configure:
   - **From:** Diana Camila Caldeira (ou equipe)
   - **Subject:** (copie da tabela abaixo)
   - **Reply-to:** dianamila0109@gmail.com

### Opção A: Usar Editor Visual do Intercom
1. No editor, monte o e-mail visualmente
2. Use os componentes: Heading, Text, Button, Divider
3. Aplique as cores:
   - Background: `#0A0A0A`
   - Texto: `#D4D4D4`
   - Títulos: `#FFFFFF`
   - Destaque/CTA: `#E8590C`

### Opção B: Copiar HTML
1. Acesse `http://localhost:3000/emails/preview`
2. Inspecione o elemento (F12)
3. Copie o HTML do e-mail desejado
4. No Intercom, use o modo "Code" para colar

### Personalização
Use a variável do Intercom para o nome:
```
{{first_name | default: "Empreendedor"}}
```

---

## 3. Cronograma de Disparo

| E-mail | Data | Hora | Assunto | Segmento |
|--------|------|------|---------|----------|
| 1 | 24/01 (D-7) | 09:00 | Está aberto: Crie seu primeiro Agente de IA (por R$167) | Inscritos |
| 2 | 26/01 (D-5) | 10:00 | Não, você não precisa ser dev. | Inscritos |
| 3 | 28/01 (D-3) | 11:00 | O que a Marina fez com o agente de IA dela... | Inscritos |
| 4 | 30/01 (D-1) | 19:00 | Última chamada: as inscrições para o workshop encerram amanhã. | Inscritos |
| 5 | 01/02 (D+1) | 10:00 | [Gravação] Workshop Agentes de IA + Sua Oferta Especial | Participantes |
| 6 | 02/02 (D+2) | 18:00 | Últimas 24h para usar seu desconto de R$500 no Cultura Builder | Participantes |

---

## 4. Configurar Disparo

### Opção A: Series (Automação)
Se seu plano permite Series:

1. Acesse **Outbound → Series**
2. Clique em **New series**
3. Nome: `Workshop Agente IA - Sequência de Vendas`
4. Crie o fluxo:
   ```
   [Trigger: Tag adicionada = workshop-agente-ia-fev26]
        ↓
   [Wait: até 24/01 às 09:00] → [Send Email 1]
        ↓
   [Wait: 2 dias] → [Send Email 2]
        ↓
   [Wait: 2 dias] → [Send Email 3]
        ↓
   [Wait: 2 dias] → [Send Email 4]
   ```

5. Crie outra Series para pós-evento:
   ```
   [Trigger: Tag adicionada = workshop-participantes-fev26]
        ↓
   [Send Email 5 imediatamente]
        ↓
   [Wait: 1 dia] → [Send Email 6]
   ```

### Opção B: Disparo Manual Agendado
Se não tiver Series:

1. Crie cada e-mail como **Message**
2. Em **Audience**, selecione o segmento correto
3. Em **Schedule**, configure:
   - **Send:** `at a specific time`
   - **Date:** (conforme cronograma)
   - **Time:** (conforme cronograma)
   - **Timezone:** America/Sao_Paulo

---

## 5. Teste Antes do Lançamento

### Checklist de Teste

- [ ] Criar contato de teste com sua tag
- [ ] Enviar cada e-mail para si mesmo
- [ ] Verificar:
  - [ ] Nome personalizado aparece corretamente
  - [ ] Links funcionam (CTA, redes sociais)
  - [ ] Layout responsivo no mobile
  - [ ] Cores e fontes corretas
  - [ ] Não cai no spam

### Como Enviar Teste
1. Na mensagem, clique em **Preview**
2. Selecione **Send test email**
3. Digite seu e-mail
4. Verifique na caixa de entrada

---

## 6. Links Importantes

| Recurso | URL |
|---------|-----|
| Preview dos E-mails | http://localhost:3000/emails/preview |
| Exportar Dados | http://localhost:3000/emails/export |
| Checkout Workshop (R$167) | https://payment-link-v3.pagar.me/pl_roLp6MW3jl0YomOTw8tPxD2zbgEA4wxN |
| Grupo WhatsApp VIP | https://chat.whatsapp.com/Dm7j5XHA83v3bwEqiH6vv8 |
| Cultura Builder (Upsell) | https://culturabuilder.com |

---

## 7. Pendências

- [ ] Substituir `#VIDEO_URL` no E-mail 5 pelo link real da gravação
- [ ] Atualizar links das LPs se necessário
- [ ] Definir quem aplica a tag `workshop-participantes-fev26` após o evento

---

## 8. Suporte

Em caso de dúvidas sobre o Intercom:
- [Documentação Intercom](https://www.intercom.com/help)
- [API Reference](https://developers.intercom.com/docs)
