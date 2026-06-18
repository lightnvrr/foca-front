export default function PainelCoordenador() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col p-6 gap-6">
        <h1 className="text-2xl font-bold text-blue-800">Foca.</h1>
        <nav className="flex flex-col gap-4 text-gray-700">
          <a href="#" className="hover:text-blue-600">Dashboard</a>
          <a href="#" className="hover:text-blue-600">Alunos</a>
          <a href="#" className="hover:text-blue-600">Turmas</a>
          <a href="#" className="hover:text-blue-600">Alertas de Risco</a>
          <a href="#" className="hover:text-blue-600">Relatórios</a>
          <a href="#" className="hover:text-blue-600">Configurações</a>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8 flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Visão Geral</h2>
          <span className="text-gray-500">Coordenadora</span>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow text-center">
            <p className="text-4xl font-bold text-blue-700">30</p>
            <p className="text-gray-500 mt-2">Alunos</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow text-center">
            <p className="text-4xl font-bold text-yellow-500">2</p>
            <p className="text-gray-500 mt-2">Alertas de Risco</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow text-center">
            <p className="text-4xl font-bold text-green-600">2</p>
            <p className="text-gray-500 mt-2">Turmas Ativas</p>
          </div>
        </div>

        {/* Tabela de turmas */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Desempenho das Turmas</h3>
          <table className="w-full text-left text-gray-600">
            <thead>
              <tr className="border-b">
                <th className="pb-2">Turma</th>
                <th className="pb-2">Alunos</th>
                <th className="pb-2">Média</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Turma A</td>
                <td>15</td>
                <td>7.5</td>
                <td className="text-green-500">Normal</td>
              </tr>
              <tr>
                <td className="py-2">Turma B</td>
                <td>15</td>
                <td>6.2</td>
                <td className="text-yellow-500">Atenção</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}