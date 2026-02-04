"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, User, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao fazer login");
      }

      // Redirecionar para o dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/images/logo-cultura-builder.svg"
            alt="Cultura Builder"
            width={180}
            height={60}
            className="mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-white mb-2">Área da Equipe</h1>
          <p className="text-cb-text-muted text-sm">
            Acesso restrito ao dashboard interno
          </p>
        </div>

        {/* Formulário */}
        <div className="bg-cb-surface border border-cb-border rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Erro */}
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Usuário */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-cb-text-secondary mb-2">
                Usuário
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cb-text-muted" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-cb-surface-light border border-cb-border rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-cb-text-muted focus:outline-none focus:border-cb-orange transition-all"
                  placeholder="Digite seu usuário"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-cb-text-secondary mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cb-text-muted" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-cb-surface-light border border-cb-border rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-cb-text-muted focus:outline-none focus:border-cb-orange transition-all"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-orange text-white font-bold py-4 rounded-xl hover:brightness-110 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Entrar
                </>
              )}
            </button>
          </form>
        </div>

        {/* Link voltar */}
        <div className="text-center mt-6">
          <a
            href="/lps"
            className="text-cb-text-muted text-sm hover:text-cb-orange transition-colors"
          >
            ← Voltar para as Landing Pages
          </a>
        </div>
      </div>
    </main>
  );
}
