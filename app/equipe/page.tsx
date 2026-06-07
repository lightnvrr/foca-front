export default function CadastroEquipe() {
  return (
    <main className="min-h-screen bg-surfaceVariant p-8">
      <div className="max-w-2xl mx-auto bg-surface p-6 rounded-lg shadow-md border-t-4 border-secondary">
        <h1 className="text-2xl font-bold text-primary mb-2">
          Cadastro de Equipe
        </h1>
        <p className="text-secondary mb-8 text-sm">
          Registre os professores e coordenadores que terão acesso ao Foca. O
          nível de acesso definirá os painéis disponíveis para cada um.
        </p>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-primary mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              placeholder="Ex: Carlos Eduardo Silva"
              className="w-full p-3 border border-primaryLight rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-onSurfaceLight"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-primary mb-1">
                E-mail Institucional
              </label>
              <input
                type="email"
                placeholder="nome@escola.com.br"
                className="w-full p-3 border border-primaryLight rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-onSurfaceLight"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-1">
                Cargo / Acesso
              </label>
              <select className="w-full p-3 border border-primaryLight rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-onSurfaceLight bg-surface">
                <option value="">Selecione o cargo...</option>
                <option value="professor">Professor</option>
                <option value="coordenador">Coordenador Pedagógico</option>
              </select>
            </div>
          </div>

          {/* Turmas vinculadas — só relevante para professores */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-1">
              Turmas Vinculadas{" "}
              <span className="text-xs font-normal text-secondary">
                (apenas para Professor)
              </span>
            </label>
            <select
              multiple
              className="w-full p-3 border border-primaryLight rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-onSurfaceLight bg-surface"
            >
              <option value="1">1º Ano A</option>
              <option value="2">2º Ano B</option>
              <option value="3">3º Ano - Foco ENEM</option>
            </select>
            <p className="text-xs text-secondary mt-1">
              Segure Ctrl (ou Cmd) para selecionar mais de uma turma.
            </p>
          </div>

          <div className="pt-4">
            <button
              type="button"
              className="w-full bg-primary text-surface font-bold py-3 px-4 rounded-md hover:bg-secondary transition duration-300"
            >
              Cadastrar Membro da Equipe
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
