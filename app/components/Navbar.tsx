import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-primary p-4 shadow-md text-surfaceVariant">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        {/* Logo do Foca */}
        <Link
          href="/"
          className="font-extrabold text-2xl tracking-widest hover:text-primaryLight transition"
        >
          Foca.
        </Link>

        {/* Links de Navegação */}
        <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
          <Link
            href="/escola"
            className="hover:text-primaryLight transition mt-1"
          >
            Escola
          </Link>
          <Link
            href="/turmas"
            className="hover:text-primaryLight transition mt-1"
          >
            Turmas
          </Link>
          <Link
            href="/disciplinas"
            className="hover:text-primaryLight transition mt-1"
          >
            Disciplinas
          </Link>
          <Link
            href="/alunos"
            className="hover:text-primaryLight transition mt-1"
          >
            Alunos
          </Link>
          <Link
            href="/equipe"
            className="hover:text-primaryLight transition mt-1"
          >
            Equipe
          </Link>

          {/* Botão de Login */}
          <Link
            href="/login"
            className="bg-primaryLight text-onSurfaceLight px-4 py-1 rounded-full hover:bg-secondary hover:text-white transition shadow-sm ml-2"
          >
            Entrar
          </Link>
        </div>
      </div>
    </nav>
  );
}
