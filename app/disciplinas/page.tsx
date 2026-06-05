export default function CadastroDisciplinas() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-500">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Cadastro de Disciplinas
        </h1>
        <p className="text-gray-600 mb-8 text-sm">
          Cadastre as matérias e suas respectivas cargas horárias. Isso será a
          base para o cronograma de estudos dos alunos.
        </p>

        <form className="space-y-5">
          {/* Nome da Disciplina */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome da Disciplina
            </label>
            <input
              type="text"
              placeholder="Ex: Matemática, Biologia, Redação..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Carga Horária Semanal */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Carga Horária Semanal (em horas)
              </label>
              <input
                type="number"
                placeholder="Ex: 4"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
              />
            </div>

            {/* Turma Vinculada */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Turma Vinculada
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white">
                <option value="">Selecione uma turma...</option>
                <option value="1">1º Ano A</option>
                <option value="2">2º Ano B</option>
                <option value="3">3º Ano - Foco ENEM</option>
              </select>
            </div>
          </div>

          {/* Botão */}
          <div className="pt-4">
            <button
              type="button"
              className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-md hover:bg-orange-600 transition duration-300"
            >
              Salvar Disciplina
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
