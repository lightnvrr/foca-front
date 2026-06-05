export default function CadastroEscola() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Cadastro Institucional
        </h1>
        <p className="text-gray-600 mb-8 text-sm">
          Preencha os dados do colégio para inicializar o ambiente de
          monitoramento no Foca.
        </p>

        <form className="space-y-5">
          {/* Campo: Razão Social */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Razão Social
            </label>
            <input
              type="text"
              placeholder="Ex: Colégio Integrado Conexão"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>

          {/* Grid para alinhar CNPJ e E-mail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Campo: CNPJ */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                CNPJ
              </label>
              <input
                type="text"
                placeholder="00.000.000/0000-00"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>

            {/* Campo: E-mail */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                E-mail de Contato
              </label>
              <input
                type="email"
                placeholder="contato@escola.com.br"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
          </div>

          {/* Campo: Endereço */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Endereço Completo
            </label>
            <input
              type="text"
              placeholder="Rua, Número, Bairro, Cidade - Estado"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>

          {/* Botão de Salvar */}
          <div className="pt-4">
            <button
              type="button"
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Salvar Dados Institucionais
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
