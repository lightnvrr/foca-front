"use client";

import { useState, useEffect } from "react";

type SessionStatus = "pending" | "completed" | "missed";
type View = "schedule" | "session" | "focus";
type FocusLevel = "Sim" | "Parcialmente" | "Não";

interface StudySession {
  id: number;
  subject: string;
  durationMin: number;
  status: SessionStatus;
}

// Dados mockados — virão da API na próxima sprint
const INITIAL_SESSIONS: StudySession[] = [
  { id: 1, subject: "Português", durationMin: 45, status: "missed" },
  { id: 2, subject: "Matemática", durationMin: 60, status: "pending" },
  { id: 3, subject: "Biologia", durationMin: 45, status: "pending" },
  { id: 4, subject: "Redação", durationMin: 30, status: "completed" },
  { id: 5, subject: "Física", durationMin: 50, status: "pending" },
];

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function PainelAluno() {
  const [sessions, setSessions] = useState<StudySession[]>(INITIAL_SESSIONS);
  const [view, setView] = useState<View>("schedule");
  const [activeSession, setActiveSession] = useState<StudySession | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const totalSeconds = activeSession ? activeSession.durationMin * 60 : 0;
  const remaining = Math.max(0, totalSeconds - elapsed);
  const progress = totalSeconds > 0 ? Math.min((elapsed / totalSeconds) * 100, 100) : 0;
  const circumference = 2 * Math.PI * 44;

  // RF06 / RF07 — timer com preservação de estado entre pausas
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        if (next >= totalSeconds) {
          setIsRunning(false);
          setView("focus"); // transição automática ao zerar
          return totalSeconds;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, totalSeconds]);

  // Clique 1 — inicia sessão e timer automaticamente (RF06)
  function startSession(session: StudySession) {
    setActiveSession(session);
    setElapsed(0);
    setIsRunning(true);
    setView("session");
  }

  // RF07 — pausa/retoma preservando elapsed
  function togglePause() {
    setIsRunning((r) => !r);
  }

  // Clique 2 — conclui manualmente antes do timer zerar
  function completeSession() {
    setIsRunning(false);
    setView("focus");
  }

  // Clique 3 — registra foco (RF08) e volta ao cronograma
  function registerFocus(_focus: FocusLevel) {
    if (activeSession) {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSession.id ? { ...s, status: "completed" } : s
        )
      );
    }
    setActiveSession(null);
    setElapsed(0);
    setView("schedule");
  }

  // RNF02 — sessão perdida é tratada individualmente, nunca em lista
  function handleMissed(sessionId: number) {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  }

  // RNF02 — sessões perdidas ficam fora da lista principal
  const missedSession = sessions.find((s) => s.status === "missed");
  const todaySessions = sessions.filter((s) => s.status !== "missed");
  const completedCount = todaySessions.filter((s) => s.status === "completed").length;

  // ── VIEW 1: CRONOGRAMA ──────────────────────────────────────────
  if (view === "schedule") {
    return (
      <main className="min-h-screen bg-surfaceVariant p-6">
        <div className="max-w-xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">Bom dia, João!</h1>
            <p className="text-secondary text-sm mt-1">
              {completedCount}/{todaySessions.length} sessões concluídas hoje
            </p>
            <div className="mt-3 h-2 w-full bg-primaryLight rounded-full overflow-hidden">
              <div
                className="h-2 bg-primary rounded-full transition-all duration-500"
                style={{
                  width:
                    todaySessions.length > 0
                      ? `${(completedCount / todaySessions.length) * 100}%`
                      : "0%",
                }}
              />
            </div>
          </div>

          {/* RNF02 — card único para sessão perdida, nunca uma lista */}
          {missedSession && (
            <div className="mb-4 bg-surface border-l-4 border-secondary rounded-lg p-4 shadow-sm">
              <p className="text-sm font-semibold text-primary mb-0.5">
                Sessão de {missedSession.subject} não realizada
              </p>
              <p className="text-xs text-secondary mb-3">O que você quer fazer?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleMissed(missedSession.id)}
                  className="flex-1 text-xs font-bold bg-primaryLight text-onSurfaceLight py-2 rounded-md hover:bg-secondary hover:text-surface transition"
                >
                  Redistribuir na semana
                </button>
                <button
                  onClick={() => handleMissed(missedSession.id)}
                  className="flex-1 text-xs font-bold border border-primary text-primary py-2 rounded-md hover:bg-primaryLight transition"
                >
                  Adiar para próxima semana
                </button>
              </div>
            </div>
          )}

          {/* Lista das sessões de hoje — sem pendências acumuladas */}
          <div className="flex flex-col gap-3">
            {todaySessions.map((session) => (
              <div
                key={session.id}
                className={`bg-surface rounded-lg p-4 shadow-sm border-l-4 transition ${
                  session.status === "completed"
                    ? "border-secondary opacity-60"
                    : "border-primary"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-primary">{session.subject}</p>
                    <p className="text-sm text-secondary mt-0.5">
                      {session.durationMin} min
                    </p>
                  </div>
                  {session.status === "completed" ? (
                    <span className="flex items-center gap-1 text-sm font-medium text-secondary">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Concluída
                    </span>
                  ) : (
                    // Clique 1
                    <button
                      onClick={() => startSession(session)}
                      className="bg-primary text-surface text-sm font-bold px-4 py-2 rounded-full hover:bg-secondary transition"
                    >
                      Iniciar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {todaySessions.every((s) => s.status === "completed") &&
            !missedSession && (
              <div className="mt-8 text-center bg-surface rounded-xl p-8 shadow-sm">
                <p className="text-2xl font-bold text-primary">Rotina completa!</p>
                <p className="text-secondary text-sm mt-2">
                  Você concluiu todas as sessões de hoje.
                </p>
              </div>
            )}
        </div>
      </main>
    );
  }

  // ── VIEW 2: TIMER (RF06 + RF07) ─────────────────────────────────
  if (view === "session" && activeSession) {
    return (
      <main className="min-h-screen bg-surfaceVariant flex items-center justify-center p-6">
        <div className="max-w-sm w-full bg-surface rounded-xl shadow-lg p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-1">
            {isRunning ? "em andamento" : "pausada"}
          </p>
          <h2 className="text-2xl font-bold text-primary mb-8">
            {activeSession.subject}
          </h2>

          {/* Timer circular */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#c7d9e5"
                strokeWidth="6"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#2f4157"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress / 100)}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-primary font-mono">
                {formatTime(remaining)}
              </span>
              <span className="text-xs text-secondary mt-1">restante</span>
            </div>
          </div>

          <p className="text-sm text-secondary mb-8">
            Decorrido:{" "}
            <span className="font-semibold text-primary font-mono">
              {formatTime(elapsed)}
            </span>
          </p>

          <div className="flex gap-3">
            {/* RF07 — pausa/retoma sem perda de progresso */}
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

  // ── VIEW 3: REGISTRO DE FOCO (RF08) ─────────────────────────────
  if (view === "focus") {
    return (
      <main className="min-h-screen bg-surfaceVariant flex items-center justify-center p-6">
        <div className="max-w-sm w-full bg-surface rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-primaryLight rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-1">
            Sessão concluída!
          </h2>
          <p className="text-secondary text-sm mb-8">
            {activeSession?.subject} — Você manteve o foco?
          </p>

          {/* Clique 3 — RF08 */}
          <div className="flex flex-col gap-3">
            {(["Sim", "Parcialmente", "Não"] as FocusLevel[]).map((option) => (
              <button
                key={option}
                onClick={() => registerFocus(option)}
                className={`w-full py-4 rounded-lg font-bold text-lg transition ${
                  option === "Sim"
                    ? "bg-primary text-surface hover:bg-secondary"
                    : option === "Parcialmente"
                    ? "bg-primaryLight text-onSurfaceLight hover:bg-secondary hover:text-surface"
                    : "border-2 border-primary text-primary hover:bg-primaryLight"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return null;
}
