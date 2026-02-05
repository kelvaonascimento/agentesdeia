export default function Home() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-4">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-orange rounded-xl flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="white" />
              <path d="M12 8L16 10.5V15.5L12 18L8 15.5V10.5L12 8Z" fill="#E8590C" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tight">
            CULTURA <span className="text-cb-orange">BUILDER</span>
          </span>
        </div>

        <div className="relative w-48 h-48 mx-auto mb-8">
          <div className="absolute inset-0 bg-cb-orange/20 rounded-full animate-pulse" />
          <div className="absolute inset-4 bg-cb-orange/10 rounded-full animate-pulse delay-100" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-20 h-20 text-cb-orange"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
          Em <span className="text-gradient-orange">Construção</span>
        </h1>

        <p className="text-cb-text-muted text-lg max-w-md mx-auto mb-8">
          Estamos preparando algo incrível para você. Em breve, uma nova
          experiência estará disponível aqui.
        </p>

        <div className="flex items-center justify-center gap-4">
          <div className="h-1 w-16 bg-cb-border rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-orange rounded-full animate-pulse" />
          </div>
          <span className="text-cb-text-muted text-sm">Quase lá...</span>
        </div>

        <p className="text-cb-text-muted text-sm mt-16">
          Cultura Builder &copy; {new Date().getFullYear()} | Hub de
          Inteligência Artificial
        </p>
      </div>
    </main>
  );
}
