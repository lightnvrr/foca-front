export default function CadastroAlunos() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-600">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Cadastro de Alunos
        </h1>
        <p className="text-gray-600 mb-8 text-sm">
          Insira os dados do estudante. Ele só poderá pertencer a uma única
          turma por período letivo.
        </p>

        <form className="space-y-5">
          {/* Nome Completo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              placeholder="Ex: João Henrique..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
            />
          </div>

          {/* E-mail e Data de Nascimento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                E-mail do Aluno
              </label>
              <input
                type="email"
                placeholder="aluno@escola.com.br"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Data de Nascimento
              </label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
              />
            </div>
          </div>

          {/* Turma Vinculada */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Turma (Vínculo Exclusivo)
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-white">
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
              className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition duration-300"
            >
              Matricular Aluno
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
