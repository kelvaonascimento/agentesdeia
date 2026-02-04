import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-cb-surface border-t border-cb-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image
            src="/images/logo-cultura-builder.svg"
            alt="Cultura Builder"
            width={140}
            height={47}
            className="h-6 w-auto"
          />
          <p className="text-cb-text-muted text-xs text-center">
            Cultura Builder &copy; {new Date().getFullYear()}. Todos os direitos reservados. Hub de Inteligência Artificial.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/termos"
              className="text-cb-text-muted text-xs sm:text-sm hover:text-cb-orange transition-colors"
            >
              Termos de Uso
            </Link>
            <Link
              href="/politica-de-privacidade"
              className="text-cb-text-muted text-xs sm:text-sm hover:text-cb-orange transition-colors"
            >
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
