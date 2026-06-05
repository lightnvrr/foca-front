export default function CadastroEquipe() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-600">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Cadastro de Equipe
        </h1>
        <p className="text-gray-600 mb-8 text-sm">
          Registre os professores e coordenadores que terão acesso ao Foca. O
          nível de acesso definirá os painéis disponíveis para cada um.
        </p>

        <form className="space-y-5">
          {/* Nome Completo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              placeholder="Ex: Carlos Eduardo Silva"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* E-mail Institucional */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                E-mail Institucional
              </label>
              <input
                type="email"
                placeholder="nome@escola.com.br"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
              />
            </div>

            {/* Cargo / Nível de Acesso */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Cargo / Acesso
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white">
                <option value="">Selecione o cargo...</option>
                <option value="professor">Professor</option>
                <option value="coordenador">Coordenador Pedagógico</option>
              </select>
            </div>
          </div>

          {/* Botão de Cadastro */}
          <div className="pt-4">
            <button
              type="button"
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Cadastrar Membro da Equipe
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
