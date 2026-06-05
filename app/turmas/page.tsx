export default function CadastroTurmas() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Cadastro de Turmas
        </h1>
        <p className="text-gray-600 mb-8 text-sm">
          Cadastre as turmas ativas da instituição. Cada aluno poderá ser
          vinculado a apenas uma turma por período letivo.
        </p>

        <form className="space-y-5">
          {/* Campo: Nome da Turma */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome da Turma
            </label>
            <input
              type="text"
              placeholder="Ex: 3º Ano A - Foco ENEM"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
            />
          </div>

          {/* Grid para Ano Letivo, Turno e Série (3 colunas) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Campo: Ano Letivo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Ano Letivo
              </label>
              <input
                type="number"
                placeholder="Ex: 2026"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              />
            </div>

            {/* Campo: Turno */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Turno
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white">
                <option value="">Selecione...</option>
                <option value="matutino">Matutino</option>
                <option value="vespertino">Vespertino</option>
                <option value="noturno">Noturno</option>
                <option value="integral">Integral</option>
              </select>
            </div>

            {/* Campo: Série */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Série
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white">
                <option value="">Selecione...</option>
                <option value="1">1º Ano do E.M.</option>
                <option value="2">2º Ano do E.M.</option>
                <option value="3">3º Ano do E.M.</option>
              </select>
            </div>
          </div>

          {/* Botão de Salvar */}
          <div className="pt-4">
            <button
              type="button"
              className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition duration-300"
            >
              Salvar Nova Turma
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
