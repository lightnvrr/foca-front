export default function Login() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border-t-4 border-blue-600">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-600 mb-2">Foca</h1>
          <p className="text-gray-600 text-sm">
            Faça login para acessar o seu ambiente de estudos ou gestão.
          </p>
        </div>

        <form className="space-y-6">
          {/* Campo: E-mail */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              E-mail Institucional
            </label>
            <input
              type="email"
              placeholder="seu@email.com.br"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>

          {/* Campo: Senha */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-semibold text-gray-700">
                Senha
              </label>
              <a href="#" className="text-xs text-blue-600 hover:underline">
                Esqueceu a senha?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>

          {/* Botão de Entrar */}
          <div className="pt-2">
            <button
              type="button"
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Entrar na Plataforma
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
