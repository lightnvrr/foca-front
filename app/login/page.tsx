import Link from "next/link";

export default function Login() {
  return (
    <main className="min-h-screen bg-surfaceVariant flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-surface p-8 rounded-lg shadow-lg border-t-4 border-secondary">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-primary mb-2">Foca.</h1>
          <p className="text-secondary text-sm">
            Faça login para acessar o seu ambiente de estudos ou gestão.
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-primary mb-1">
              E-mail Institucional
            </label>
            <input
              type="email"
              placeholder="seu@email.com.br"
              className="w-full p-3 border border-primaryLight rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-onSurfaceLight"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-semibold text-primary">
                Senha
              </label>
              <Link
                href="#"
                className="text-xs text-secondary hover:text-primary transition hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border border-primaryLight rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-onSurfaceLight"
            />
          </div>

          <div className="pt-2">
            <button
              type="button"
              className="w-full bg-primary text-surface font-bold py-3 px-4 rounded-md hover:bg-secondary transition duration-300 shadow-md"
            >
              Entrar na Plataforma
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
