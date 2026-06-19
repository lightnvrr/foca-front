"use client";

import { useState, useEffect } from "react";

// Constantes de domínio — espelham src/config/sessao.ts do backend (V3)
const DURACAO_MAXIMA_SEG = 2_700; // RN-S1: 45 min
const MAX_DISCIPLINAS_DIA = 3;    // RN-S2
const MAX_SESSOES_DISCIPLINA = 2; // RN-S3

// Lista fixa de disciplinas — seed do backend (removeEscolaAndAdjustDisciplines)
const DISCIPLINAS = [
  "Matemática", "Português", "Ciências", "História", "Geografia",
  "Inglês", "Artes", "Educação Física", "Filosofia", "Sociologia",
  "Física", "Química",
];

type StatusSessao = "CONCLUIDA" | "ENCERRADA_POR_LIMITE";
type View = "home" | "session" | "done";

interface SessaoHoje {
  id: number;
  disciplina: string;
  tempo_total_seg: number;
  status: StatusSessao;
}

// Mock — formato de GET /sessoes/hoje (E5.5 do backend)
const MOCK_SESSOES_HOJE: SessaoHoje[] = [
  { id: 1, disciplina: "Física", tempo_total_seg: 1800, status: "CONCLUIDA" },
];

const MOCK_LIMITES = {
  disciplinas_distintas_hoje: 1,
  sessoes_por_disciplina: { Física: 1 } as Record<string, number>,
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function PainelAluno() {
  const [view, setView] = useState<View>("home");
  const [disciplina, setDisciplina] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [autoStopped, setAutoStopped] = useState(false);

  // Substituir por GET /sessoes/hoje quando backend estiver pronto
  const [sessoesHoje, setSessoesHoje] = useState<SessaoHoje[]>(MOCK_SESSOES_HOJE);
  const [limites, setLimites] = useState(MOCK_LIMITES);

  const progress = Math.min((elapsed / DURACAO_MAXIMA_SEG) * 100, 100);
  const circumference = 2 * Math.PI * 44;
  const nearLimit = elapsed >= DURACAO_MAXIMA_SEG - 300; // aviso a 5 min do limite

  // RF06 / RF07 — timer progressivo, para ao atingir RN-S1
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        if (next >= DURACAO_MAXIMA_SEG) {
          setIsRunning(false);
          setAutoStopped(true);
          setView("done");
          return DURACAO_MAXIMA_SEG;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Clique 1 — seleciona disciplina e inicia sessão
  function startSession(disc: string) {
    setDisciplina(disc);
    setElapsed(0);
    setAutoStopped(false);
    setIsRunning(true);
    setView("session");
  }

  // RF07 — pausa/retoma sem zerar elapsed
  function togglePause() {
    setIsRunning((r) => !r);
  }

  // Clique 2 — conclui manualmente
  function completeSession() {
    setIsRunning(false);
    registerCompletion(elapsed >= DURACAO_MAXIMA_SEG ? "ENCERRADA_POR_LIMITE" : "CONCLUIDA");
    setView("done");
  }

  function registerCompletion(status: StatusSessao) {
    const isNewDisciplina = !(limites.sessoes_por_disciplina[disciplina!] > 0);
    setSessoesHoje((prev) => [
      ...prev,
      { id: prev.length + 1, disciplina: disciplina!, tempo_total_seg: elapsed, status },
    ]);
    setLimites((prev) => ({
      disciplinas_distintas_hoje: isNewDisciplina
        ? prev.disciplinas_distintas_hoje + 1
        : prev.disciplinas_distintas_hoje,
      sessoes_por_disciplina: {
        ...prev.sessoes_por_disciplina,
        [disciplina!]: (prev.sessoes_por_disciplina[disciplina!] ?? 0) + 1,
      },
    }));
  }

  // Verifica RN-S2 e RN-S3 antes de permitir iniciar sessão
  function canStart(disc: string): { ok: boolean; reason?: string } {
    const sessoesDaDisc = limites.sessoes_por_disciplina[disc] ?? 0;
    if (sessoesDaDisc >= MAX_SESSOES_DISCIPLINA) {
      return { ok: false, reason: `Limite de ${MAX_SESSOES_DISCIPLINA} sessões por disciplina atingido` };
    }
    const isNew = sessoesDaDisc === 0;
    if (isNew && limites.disciplinas_distintas_hoje >= MAX_DISCIPLINAS_DIA) {
      return { ok: false, reason: `Limite de ${MAX_DISCIPLINAS_DIA} disciplinas diferentes por dia atingido` };
    }
    return { ok: true };
  }

  // ── VIEW HOME ──────────────────────────────────────────────────
  if (view === "home") {
    return (
      <main className="min-h-screen bg-surfaceVariant p-6">
        <div className="max-w-xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Bom dia, João!</h1>
            <p className="text-secondary text-sm mt-1">O que você vai estudar hoje?</p>
          </div>

          {/* Contadores diários — RN-S2 / RN-S3 */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-surface rounded-lg p-3 shadow-sm text-center">
              <p className="text-xl font-bold text-primary">
                {limites.disciplinas_distintas_hoje}/{MAX_DISCIPLINAS_DIA}
              </p>
              <p className="text-xs text-secondary mt-0.5">disciplinas hoje</p>
            </div>
            <div className="bg-surface rounded-lg p-3 shadow-sm text-center">
              <p className="text-xl font-bold text-primary">{sessoesHoje.length}</p>
              <p className="text-xs text-secondary mt-0.5">sessões realizadas</p>
            </div>
          </div>

          {/* Sessões já realizadas hoje */}
          {sessoesHoje.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-secondary uppercase tracking-widest mb-2">
                Sessões de hoje
              </h2>
              <div className="flex flex-col gap-2">
                {sessoesHoje.map((s) => (
                  <div
                    key={s.id}
                    className="bg-surface rounded-lg px-4 py-3 shadow-sm flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-primary">{s.disciplina}</p>
                      <p className="text-xs text-secondary">{formatTime(s.tempo_total_seg)}</p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        s.status === "ENCERRADA_POR_LIMITE"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {s.status === "ENCERRADA_POR_LIMITE" ? "Limite atingido" : "Concluída"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clique 1 — seletor de disciplinas */}
          <h2 className="text-xs font-semibold text-secondary uppercase tracking-widest mb-2">
            Iniciar nova sessão
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {DISCIPLINAS.map((disc) => {
              const { ok, reason } = canStart(disc);
              const sessoes = limites.sessoes_por_disciplina[disc] ?? 0;
              return (
                <button
                  key={disc}
                  onClick={() => ok && startSession(disc)}
                  disabled={!ok}
                  title={reason}
                  className={`bg-surface rounded-lg px-3 py-3 shadow-sm text-left border-l-4 transition ${
                    ok
                      ? "border-primary hover:bg-primaryLight cursor-pointer"
                      : "border-primaryLight opacity-40 cursor-not-allowed"
                  }`}
                >
                  <p className="text-sm font-semibold text-primary">{disc}</p>
                  <p className="text-xs text-secondary mt-0.5">
                    {sessoes}/{MAX_SESSOES_DISCIPLINA} sessões
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    );
  }

  // ── VIEW SESSION — timer progressivo (RF06 + RF07) ─────────────
  if (view === "session" && disciplina) {
    return (
      <main className="min-h-screen bg-surfaceVariant flex items-center justify-center p-6">
        <div className="max-w-sm w-full bg-surface rounded-xl shadow-lg p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-1">
            {isRunning ? "em andamento" : "pausada"}
          </p>
          <h2 className="text-2xl font-bold text-primary mb-8">{disciplina}</h2>

          {/* Timer circular — cresce junto com elapsed */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="#c7d9e5" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="44"
                fill="none"
                stroke={nearLimit ? "#ef4444" : "#2f4157"}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress / 100)}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-primary font-mono">
                {formatTime(elapsed)}
              </span>
              <span className="text-xs text-secondary mt-1">
                {formatTime(DURACAO_MAXIMA_SEG - elapsed)} restante
              </span>
            </div>
          </div>

          {nearLimit && (
            <p className="text-xs text-red-500 font-semibold mb-4">
              Atenção: menos de 5 min até o limite de 45 min.
            </p>
          )}

          <div className="flex gap-3">
            {/* RF07 */}
            <button
              onClick={togglePause}
              className="flex-1 border-2 border-primary text-primary font-bold py-3 rounded-lg hover:bg-primaryLight transition"
            >
              {isRunning ? "Pausar" : "Retomar"}
            </button>
            {/* Clique 2 */}
            <button
              onClick={completeSession}
              className="flex-1 bg-primary text-surface font-bold py-3 rounded-lg hover:bg-secondary transition"
            >
              Concluir
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ── VIEW DONE — sem registro de foco (nivel_foco removido na V3) ─
  if (view === "done") {
    return (
      <main className="min-h-screen bg-surfaceVariant flex items-center justify-center p-6">
        <div className="max-w-sm w-full bg-surface rounded-xl shadow-lg p-8 text-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              autoStopped ? "bg-yellow-100" : "bg-primaryLight"
            }`}
          >
            <svg
              className={`w-8 h-8 ${autoStopped ? "text-yellow-600" : "text-primary"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-1">
            {autoStopped ? "Limite atingido!" : "Sessão concluída!"}
          </h2>
          <p className="text-secondary text-sm mb-2">
            {disciplina} — {formatTime(elapsed)} estudados
          </p>
          {autoStopped && (
            <p className="text-xs text-secondary mb-6">
              Você atingiu o limite de 45 minutos. Faça uma pausa antes de continuar.
            </p>
          )}
          <div className={autoStopped ? "" : "mt-6"}>
            {/* Clique 3 — volta ao início */}
            <button
              onClick={() => setView("home")}
              className="w-full bg-primary text-surface font-bold py-3 rounded-lg hover:bg-secondary transition"
            >
              Voltar ao início
            </button>
          </div>
        </div>
      </main>
    );
  }

  return null;
}
