import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | Cultura Builder",
  description:
    "Termos de Uso do Workshop Agente IA - Regras e condições de participação no workshop oferecido pelo Cultura Builder.",
};

export default function TermosPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" aria-hidden />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Termos de Uso
          </h1>
          <p className="text-cb-text-muted text-sm mb-10">
            Workshop Agente IA · Fevereiro de 2026
          </p>

          <article className="bg-cb-surface border border-cb-border rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8 text-cb-text-secondary">
            <p className="text-cb-text-secondary leading-relaxed">
              Bem-vindo ao Workshop Agente IA, oferecido pelo Cultura Builder. Ao adquirir e participar deste workshop, você concorda com os seguintes Termos de Uso. Por favor, leia-os atentamente.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cb-orange rounded-full" />
                1. Objeto do Workshop
              </h2>
              <p className="text-cb-text-secondary leading-relaxed">
                O Workshop Agente IA é um evento online e ao vivo, com duração de aproximadamente 90 minutos, focado em ensinar os participantes a criar seu primeiro Agente de IA, mesmo sem conhecimento prévio em programação. O workshop inclui a apresentação de uma metodologia, a construção prática de um agente e a disponibilização de um template &apos;Plug-and-Play&apos; como bônus.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cb-orange rounded-full" />
                2. Aquisição e Acesso
              </h2>
              <div className="space-y-3 text-cb-text-secondary">
                <p><strong className="text-white">2.1. Preço:</strong> O valor de aquisição do Workshop Agente IA é de R$ 167,00 (cento e sessenta e sete reais).</p>
                <p><strong className="text-white">2.2. Confirmação:</strong> A vaga no workshop será confirmada após a efetivação do pagamento. O participante receberá um e-mail de confirmação e será adicionado a um grupo VIP no WhatsApp para comunicação e envio do link de acesso.</p>
                <p><strong className="text-white">2.3. Acesso:</strong> O acesso ao workshop ao vivo será fornecido por e-mail e via grupo VIP no WhatsApp 1 hora antes do evento. Caso o participante não possa assistir ao vivo, terá acesso à gravação completa do workshop.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cb-orange rounded-full" />
                3. Conteúdo e Propriedade Intelectual
              </h2>
              <div className="space-y-3 text-cb-text-secondary">
                <p><strong className="text-white">3.1. Conteúdo:</strong> Todo o conteúdo apresentado no workshop, incluindo, mas não se limitando a, vídeos, materiais didáticos, templates, scripts e metodologias (Vibe Coding), é de propriedade exclusiva do Cultura Builder.</p>
                <p><strong className="text-white">3.2. Uso Pessoal:</strong> O participante tem permissão para usar o conhecimento e os materiais (incluindo o template &apos;Plug-and-Play&apos;) para fins pessoais e de desenvolvimento profissional. É estritamente proibida a reprodução, distribuição, revenda ou compartilhamento do conteúdo do workshop, no todo ou em parte, sem a autorização expressa do Cultura Builder.</p>
                <p><strong className="text-white">3.3. Certificado:</strong> Os participantes que concluírem o workshop receberão um certificado digital de participação do Cultura Builder.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cb-orange rounded-full" />
                4. Garantia de Satisfação e Reembolso
              </h2>
              <div className="space-y-3 text-cb-text-secondary">
                <p><strong className="text-white">4.1. Garantia:</strong> O Cultura Builder oferece uma garantia de satisfação de 7 (sete) dias. Se, ao final do workshop, o participante sentir que o conteúdo não entregou a transformação prometida, poderá solicitar o reembolso integral do valor pago.</p>
                <p><strong className="text-white">4.2. Procedimento de Reembolso:</strong> Para solicitar o reembolso, o participante deverá enviar um e-mail para financeiro@culturabuilder.com em até 7 (sete) dias corridos após a realização do workshop, informando o desejo de reembolso. O valor será processado e devolvido integralmente.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cb-orange rounded-full" />
                5. Responsabilidades do Participante
              </h2>
              <div className="space-y-3 text-cb-text-secondary">
                <p><strong className="text-white">5.1. Informações:</strong> O participante é responsável por fornecer informações precisas e atualizadas no momento da inscrição (nome completo, e-mail, WhatsApp).</p>
                <p><strong className="text-white">5.2. Conexão:</strong> É responsabilidade do participante garantir uma conexão de internet estável e equipamentos adequados para participar do workshop online.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cb-orange rounded-full" />
                6. Disposições Gerais
              </h2>
              <div className="space-y-3 text-cb-text-secondary">
                <p><strong className="text-white">6.1. Alterações:</strong> O Cultura Builder reserva-se o direito de modificar estes Termos de Uso a qualquer momento, mediante aviso prévio aos participantes.</p>
                <p><strong className="text-white">6.2. Foro:</strong> Fica eleito o foro da comarca de Presidente Prudente/SP para dirimir quaisquer dúvidas ou litígios decorrentes destes Termos de Uso.</p>
              </div>
              <p className="mt-4 text-cb-text-secondary">
                Ao participar do Workshop Agente IA, você declara ter lido, compreendido e concordado com estes Termos de Uso.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-cb-orange rounded-full" />
                Contato
              </h2>
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
