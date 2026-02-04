import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Cultura Builder",
  description:
    "Política de Privacidade do Workshop Agente IA - Como o Cultura Builder coleta, usa e protege suas informações.",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" aria-hidden />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Política de Privacidade
          </h1>
          <p className="text-cb-text-muted text-sm mb-10">
            Workshop Agente IA · Última atualização: fevereiro de 2026
          </p>

          <article className="bg-cb-surface border border-cb-border rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8 text-cb-text-secondary">
            <p className="text-cb-text-secondary leading-relaxed">
              Esta Política de Privacidade descreve como o Cultura Builder (&quot;nós&quot;, &quot;nosso&quot; ou &quot;Cultura Builder&quot;) coleta, usa e protege as informações pessoais dos participantes do Workshop Agente IA. Ao se inscrever e participar do workshop, você concorda com as práticas descritas nesta política.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cb-orange rounded-full" />
                1. Informações Coletadas
              </h2>
              <p className="mb-3">Coletamos as seguintes informações pessoais dos participantes durante o processo de inscrição no Workshop Agente IA:</p>
              <ul className="list-disc pl-6 space-y-2 text-cb-text-muted">
                <li><strong className="text-cb-text-secondary">Informações de Contato:</strong> Nome completo, endereço de e-mail e número de telefone WhatsApp.</li>
                <li><strong className="text-cb-text-secondary">Informações de Pagamento:</strong> Dados de pagamento são processados por plataformas de terceiros, e o Cultura Builder não armazena diretamente informações sensíveis de cartão de crédito.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cb-orange rounded-full" />
                2. Como Usamos Suas Informações
              </h2>
              <p className="mb-3">As informações coletadas são utilizadas para os seguintes propósitos:</p>
              <ul className="list-disc pl-6 space-y-2 text-cb-text-muted">
                <li><strong className="text-cb-text-secondary">Processamento da Inscrição:</strong> Para confirmar sua participação no Workshop Agente IA. (Base legal: execução de contrato, Art. 7º, V, LGPD)</li>
                <li><strong className="text-cb-text-secondary">Comunicação:</strong> Para enviar e-mails de confirmação, links de acesso ao workshop, informações importantes sobre o evento e comunicações relacionadas via e-mail e WhatsApp. (Base legal: execução de contrato, Art. 7º, V, LGPD)</li>
                <li><strong className="text-cb-text-secondary">Suporte ao Cliente:</strong> Para responder a dúvidas, fornecer assistência e resolver quaisquer problemas relacionados à sua participação. (Base legal: execução de contrato, Art. 7º, V, LGPD)</li>
                <li><strong className="text-cb-text-secondary">Marketing e Promoção:</strong> Com seu consentimento, podemos usar seu e-mail e WhatsApp para enviar informações sobre futuros workshops, cursos, produtos ou serviços do Cultura Builder que possam ser do seu interesse. Você pode optar por não receber essas comunicações a qualquer momento. (Base legal: consentimento, Art. 7º, I, LGPD)</li>
                <li><strong className="text-cb-text-secondary">Melhoria de Serviços:</strong> Para analisar o perfil dos participantes e o desempenho do workshop, visando aprimorar nossos produtos e serviços. (Base legal: legítimo interesse, Art. 7º, IX, LGPD)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cb-orange rounded-full" />
                3. Compartilhamento de Informações
              </h2>
              <p className="mb-3">Não vendemos, alugamos ou trocamos suas informações pessoais com terceiros. No entanto, podemos compartilhar suas informações com:</p>
              <ul className="list-disc pl-6 space-y-2 text-cb-text-muted">
                <li><strong className="text-cb-text-secondary">Provedores de Serviços:</strong> Empresas que nos auxiliam na operação do workshop, como plataformas de pagamento, serviços de e-mail marketing, plataformas de comunicação (WhatsApp) e provedores de hospedagem de vídeo. Esses provedores são contratualmente obrigados a proteger suas informações e usá-las apenas para os fins para os quais foram contratados.</li>
                <li><strong className="text-cb-text-secondary">Obrigações Legais:</strong> Podemos divulgar suas informações se exigido por lei ou em resposta a processos legais válidos, como ordens judiciais ou intimações.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cb-orange rounded-full" />
                4. Segurança dos Dados
              </h2>
              <p className="text-cb-text-secondary leading-relaxed">
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhuma transmissão de dados pela internet ou sistema de armazenamento eletrônico é 100% segura. Embora nos esforcemos para proteger suas informações, não podemos garantir sua segurança absoluta.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cb-orange rounded-full" />
                5. Seus Direitos
              </h2>
              <p className="mb-3">Você tem o direito de:</p>
              <ul className="list-disc pl-6 space-y-2 text-cb-text-muted">
                <li><strong className="text-cb-text-secondary">Acessar:</strong> Solicitar acesso às suas informações pessoais que mantemos.</li>
                <li><strong className="text-cb-text-secondary">Corrigir:</strong> Solicitar a correção de informações imprecisas ou incompletas.</li>
                <li><strong className="text-cb-text-secondary">Excluir:</strong> Solicitar a exclusão de suas informações pessoais, sujeito a certas exceções legais.</li>
                <li><strong className="text-cb-text-secondary">Opor-se:</strong> Opor-se ao processamento de suas informações pessoais para fins de marketing direto.</li>
              </ul>
              <p className="mt-4 text-cb-text-secondary">
                Para exercer qualquer um desses direitos, entre em contato conosco através do e-mail fornecido abaixo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cb-orange rounded-full" />
                6. Cookies e Tecnologias de Rastreamento
              </h2>
              <p className="text-cb-text-secondary leading-relaxed">
                Nosso site pode utilizar cookies e outras tecnologias de rastreamento para melhorar sua experiência de navegação, analisar o tráfego do site e personalizar conteúdo. Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cb-orange rounded-full" />
                7. Alterações a Esta Política de Privacidade
              </h2>
              <p className="text-cb-text-secondary leading-relaxed">
                Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas de informação. Notificaremos você sobre quaisquer alterações significativas publicando a nova política em nosso site e atualizando a data da &quot;Última Atualização&quot;. Recomendamos que você revise esta política regularmente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cb-orange rounded-full" />
                8. Contato
              </h2>
              <p className="mb-4 text-cb-text-secondary">
                Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre nossas práticas de dados, entre em contato conosco:
              </p>
              <div className="bg-cb-surface-light border border-cb-border rounded-xl p-5 text-cb-text-secondary">
                <p className="font-semibold text-white">Cultura Builder</p>
                <p>CULTURA BUILDER EDUCACAO E TECNOLOGIA LTDA</p>
                <p>CNPJ: 62.995.760/0001-33</p>
                <p>
                  E-mail:{" "}
                  <a href="mailto:financeiro@culturabuilder.com" className="text-cb-orange hover:underline">
                    financeiro@culturabuilder.com
                  </a>
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
