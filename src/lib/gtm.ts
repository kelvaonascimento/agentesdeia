/**
 * Google Tag Manager - Utilitários de Tracking
 * Workshop Agentes de IA - Cultura Builder
 */

// Utilitário genérico para enviar events ao GTM
export const trackEvent = (eventData: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push(eventData);
  }
};

// Events específicos do funil
export const gtm = {
  /**
   * Page View - Landing Page
   */
  pageView: (pageName: string, variant: string) => {
    trackEvent({
      event: "page_view_lp",
      page_type: "landing_page",
      page_name: pageName,
      page_url: window.location.pathname,
      page_variant: variant,
    });
  },

  /**
   * CTA Click
   */
  ctaClick: (location: string, text: string) => {
    trackEvent({
      event: "cta_click",
      cta_location: location,
      cta_text: text,
      page_url: window.location.pathname,
    });
  },

  /**
   * Form Start - Usuário começou a preencher
   */
  formStart: (formId: string, variant: string) => {
    trackEvent({
      event: "form_start",
      form_id: formId,
      form_variant: variant,
      page_url: window.location.pathname,
    });
  },

  /**
   * Form Submit - Lead captado
   */
  formSubmit: (formId: string, source: string) => {
    trackEvent({
      event: "form_submit",
      form_id: formId,
      lead_source: source,
      conversion_value: 167,
    });
  },

  /**
   * Form Error - Erro no formulário
   */
  formError: (errorMessage: string, field: string) => {
    trackEvent({
      event: "form_error",
      error_message: errorMessage,
      form_field: field,
      page_url: window.location.pathname,
    });
  },

  /**
   * Checkout Initiated - Redirecionamento para Pagar.me
   */
  checkoutInitiated: () => {
    trackEvent({
      event: "checkout_initiated",
      checkout_url: "https://payment-link-v3.pagar.me/pl_roLp6MW3jl0YomOTw8tPxD2zbgEA4wxN",
      product_name: "Workshop Agente de IA",
      product_price: 167,
      currency: "BRL",
    });
  },

  /**
   * Purchase - Conversão confirmada
   */
  purchase: (transactionId: string = "unknown") => {
    trackEvent({
      event: "purchase",
      transaction_id: transactionId,
      value: 167.0,
      currency: "BRL",
      items: [
        {
          item_id: "workshop-agente-ia",
          item_name: "Workshop Agente de IA",
          price: 167.0,
          quantity: 1,
        },
      ],
    });
  },

  /**
   * WhatsApp Click - Botão grupo VIP
   */
  whatsappClick: () => {
    trackEvent({
      event: "whatsapp_click",
      link_url: "https://chat.whatsapp.com/Dm7j5XHA83v3bwEqiH6vv8",
      cta_text: "ENTRAR NO GRUPO VIP DO WHATSAPP",
    });
  },

  /**
   * Scroll Depth - Profundidade de rolagem
   */
  scrollDepth: (percentage: number) => {
    trackEvent({
      event: "scroll_depth",
      scroll_percentage: percentage,
      page_url: window.location.pathname,
    });
  },

  /**
   * FAQ Click - Interação com perguntas frequentes
   */
  faqClick: (question: string, action: "open" | "close") => {
    trackEvent({
      event: "faq_click",
      faq_question: question,
      faq_action: action,
    });
  },

  /**
   * Countdown View - Visualização do contador
   */
  countdownView: (variant: string, timeRemaining: string) => {
    trackEvent({
      event: "countdown_view",
      countdown_variant: variant,
      time_remaining: timeRemaining,
    });
  },

  /**
   * Sticky Bar Click - Clique na barra fixa
   */
  stickyBarClick: () => {
    trackEvent({
      event: "sticky_bar_click",
      cta_location: "sticky_bar",
      page_url: window.location.pathname,
    });
  },
};

// Declaração de tipos para TypeScript
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
    gtag?: (...args: unknown[]) => void;
  }
}
