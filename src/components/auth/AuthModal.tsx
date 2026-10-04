import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

type Mode = "login" | "register";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: Mode;
}

export function AuthModal({
  open,
  onOpenChange,
  defaultMode = "login",
}: AuthModalProps) {
  const { login, register, isLoading } = useAuth();
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [error, setError] = useState("");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function resetForm() {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  }

  function switchMode(next: Mode) {
    setMode(next);
    resetForm();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (mode === "register") {
      if (!name.trim()) return setError("Nome é obrigatório.");
      if (password !== confirmPassword)
        return setError("As senhas não coincidem.");
      if (password.length < 6)
        return setError("A senha deve ter pelo menos 6 caracteres.");
    }

    if (!email.includes("@")) return setError("E-mail inválido.");
    if (!password) return setError("Senha é obrigatória.");

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      onOpenChange(false);
      resetForm();
    } catch (err: unknown) {
      const msg =
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "error" in err.response.data
          ? String((err.response.data as { error: string }).error)
          : mode === "login"
            ? "E-mail ou senha incorretos."
            : "Não foi possível criar a conta.";
      setError(msg);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-sm">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-bold tracking-widest text-white">
            KURIO
          </span>
        </div>

        <DialogHeader>
          <DialogTitle>
            {mode === "login" ? "Entrar na sua conta" : "Criar conta"}
          </DialogTitle>
          <DialogDescription>
            {mode === "login"
              ? "Bem-vindo de volta ao marketplace de NFTs."
              : "Junte-se à comunidade Kurio."}
          </DialogDescription>
        </DialogHeader>

        {/* Tab switcher */}
        <div className="flex border-b border-kurio-border/40 mb-4">
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`flex-1 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              mode === "login"
                ? "border-kurio-selected text-kurio-selected"
                : "border-transparent text-kurio-text-muted hover:text-white"
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => switchMode("register")}
            className={`flex-1 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              mode === "register"
                ? "border-kurio-selected text-kurio-selected"
                : "border-transparent text-kurio-text-muted hover:text-white"
            }`}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === "register" && (
            <div>
              <label className="text-xs text-kurio-text-muted mb-1 block">
                Nome completo
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                autoComplete="name"
                className="bg-[#2a1510] border-kurio-border/50 text-white placeholder:text-kurio-text-muted focus-visible:ring-kurio-selected"
              />
            </div>
          )}

          <div>
            <label className="text-xs text-kurio-text-muted mb-1 block">
              E-mail
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              autoComplete="email"
              className="bg-[#2a1510] border-kurio-border/50 text-white placeholder:text-kurio-text-muted focus-visible:ring-kurio-selected"
            />
          </div>

          <div>
            <label className="text-xs text-kurio-text-muted mb-1 block">
              Senha
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === "login" ? "••••••••" : "Mínimo 6 caracteres"}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              className="bg-[#2a1510] border-kurio-border/50 text-white placeholder:text-kurio-text-muted focus-visible:ring-kurio-selected"
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="text-xs text-kurio-text-muted mb-1 block">
                Confirmar senha
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita a senha"
                autoComplete="new-password"
                className="bg-[#2a1510] border-kurio-border/50 text-white placeholder:text-kurio-text-muted focus-visible:ring-kurio-selected"
              />
            </div>
          )}

          {mode === "login" && (
            <p className="text-xs text-kurio-text-muted">
              Use qualquer e-mail com a senha{" "}
              <span className="text-kurio-selected font-mono">123456</span>
            </p>
          )}

          {error && (
            <p className="text-xs text-red-400 bg-red-400/10 rounded px-3 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-kurio-btn text-black font-bold py-2.5 mt-1 hover:brightness-110 disabled:opacity-60 transition-all"
          >
            {isLoading
              ? "Aguarde..."
              : mode === "login"
                ? "Entrar"
                : "Criar conta"}
          </Button>
        </form>

        <p className="text-xs text-center text-kurio-text-muted mt-2">
          {mode === "login" ? "Não tem conta?" : "Já tem conta?"}{" "}
          <button
            type="button"
            onClick={() => switchMode(mode === "login" ? "register" : "login")}
            className="text-kurio-selected hover:underline"
          >
            {mode === "login" ? "Cadastre-se" : "Entrar"}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
