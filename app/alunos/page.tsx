export default function CadastroAlunos() {
  return (
    <main className="min-h-screen bg-surfaceVariant p-8">
      <div className="max-w-2xl mx-auto bg-surface p-6 rounded-lg shadow-md border-t-4 border-secondary">
        <h1 className="text-2xl font-bold text-primary mb-2">
          Cadastro de Alunos
        </h1>
        <p className="text-secondary mb-8 text-sm">
          Insira os dados do estudante. Ele só poderá pertencer a uma única
          turma por período letivo.
        </p>

        <form className="space-y-5">
          {/* Nome Completo */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              placeholder="Ex: João Henrique..."
              className="w-full p-3 border border-primaryLight rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-onSurfaceLight"
            />
          </div>

          {/* E-mail e Data de Nascimento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-primary mb-1">
                E-mail do Aluno
              </label>
              <input
                type="email"
                placeholder="aluno@escola.com.br"
                className="w-full p-3 border border-primaryLight rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-onSurfaceLight"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-1">
                Data de Nascimento
              </label>
              <input
                type="date"
                className="w-full p-3 border border-primaryLight rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-onSurfaceLight"
              />
            </div>
          </div>

          {/* Turma Vinculada */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-1">
              Turma (Vínculo Exclusivo)
            </label>
            <select className="w-full p-3 border border-primaryLight rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-onSurfaceLight bg-surface">
              <option value="">Selecione a turma do aluno...</option>
              <option value="1">1º Ano A</option>
              <option value="2">2º Ano B</option>
              <option value="3">3º Ano - Foco ENEM</option>
            </select>
          </div>

          {/* Botão */}
          <div className="pt-4">
            <button
              type="button"
              className="w-full bg-primary text-surface font-bold py-3 px-4 rounded-md hover:bg-secondary transition duration-300"
            >
              Matricular Aluno
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
