export default function CadastroDisciplinas() {
  return (
    <main className="min-h-screen bg-surfaceVariant p-8">
      <div className="max-w-2xl mx-auto bg-surface p-6 rounded-lg shadow-md border-t-4 border-secondary">
        <h1 className="text-2xl font-bold text-primary mb-2">
          Cadastro de Disciplinas
        </h1>
        <p className="text-secondary mb-8 text-sm">
          Cadastre as matérias e suas respectivas cargas horárias. Isso será a
          base para o cronograma de estudos dos alunos.
        </p>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-primary mb-1">
              Nome da Disciplina
            </label>
            <input
              type="text"
              placeholder="Ex: Matemática, Biologia, Redação..."
              className="w-full p-3 border border-primaryLight rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-onSurfaceLight"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-primary mb-1">
                Carga Horária Semanal (em horas)
              </label>
              <input
                type="number"
                placeholder="Ex: 4"
                className="w-full p-3 border border-primaryLight rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-onSurfaceLight"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-1">
                Turma Vinculada
              </label>
              <select className="w-full p-3 border border-primaryLight rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-onSurfaceLight bg-surface">
                <option value="">Selecione uma turma...</option>
                <option value="1">1º Ano A</option>
                <option value="2">2º Ano B</option>
                <option value="3">3º Ano - Foco ENEM</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              className="w-full bg-primary text-surface font-bold py-3 px-4 rounded-md hover:bg-secondary transition duration-300"
            >
              Salvar Disciplina
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
