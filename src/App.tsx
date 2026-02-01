import { useState, useMemo, useCallback } from "react";
import { CircleX, CircleCheck, RefreshCw, Copy } from "lucide-react";
import {
  MAX_BAN,
  MAX_PICK,
  createInitialDecks,
  applyDeckStatus,
  resetDecks,
  formatTeam,
  getNextActionMessage,
} from "./logic";
import type { Deck, DeckStatus } from "./logic";

function App() {
  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");
  const [teamADecks, setTeamADecks] = useState<Deck[]>(createInitialDecks);
  const [teamBDecks, setTeamBDecks] = useState<Deck[]>(createInitialDecks);
  const [copied, setCopied] = useState(false);

  const updateDeckName = useCallback(
    (
      team: "A" | "B",
      index: number,
      name: string
    ) => {
      const setter = team === "A" ? setTeamADecks : setTeamBDecks;
      setter((prev) =>
        prev.map((d, i) => (i === index ? { ...d, name } : d))
      );
    },
    []
  );

  const setDeckStatus = useCallback(
    (
      team: "A" | "B",
      index: number,
      status: DeckStatus
    ) => {
      const setter = team === "A" ? setTeamADecks : setTeamBDecks;
      setter((prev) => applyDeckStatus(prev, index, status));
    },
    []
  );

  const resetTeam = useCallback((team: "A" | "B") => {
    const setter = team === "A" ? setTeamADecks : setTeamBDecks;
    setter((prev) => resetDecks(prev));
  }, []);

  const nextActionMessage = useMemo(
    () => getNextActionMessage(teamAName, teamBName, teamADecks, teamBDecks),
    [teamAName, teamBName, teamADecks, teamBDecks]
  );

  const outputText = useMemo(() => {
    const aName = teamAName || "チームA";
    const bName = teamBName || "チームB";
    return `${formatTeam(aName, teamADecks)}\n\n${formatTeam(bName, teamBDecks)}\n\n${nextActionMessage}`;
  }, [teamAName, teamBName, teamADecks, teamBDecks, nextActionMessage]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(outputText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [outputText]);

  const teamALabel = teamAName || "チームA";
  const teamBLabel = teamBName || "チームB";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Header */}
        <header className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800">
            Rocket CUP JUDGE Tool
          </h1>
          <p className="mt-1 text-sm text-slate-500">BAN &amp; PICK 管理ツール</p>
        </header>

        {/* Team Name Inputs */}
        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
            チーム情報
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">チームA</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                placeholder="チームAの名前を入力"
                value={teamAName}
                onChange={(e) => setTeamAName(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">チームB</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                placeholder="チームBの名前を入力"
                value={teamBName}
                onChange={(e) => setTeamBName(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* BAN & PICK Sections - 2 columns on PC, 1 column on mobile */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <TeamSection
            label={`${teamALabel}の状況`}
            decks={teamADecks}
            onDeckNameChange={(i, name) => updateDeckName("A", i, name)}
            onStatusChange={(i, status) => setDeckStatus("A", i, status)}
            onReset={() => resetTeam("A")}
          />
          <TeamSection
            label={`${teamBLabel}の状況`}
            decks={teamBDecks}
            onDeckNameChange={(i, name) => updateDeckName("B", i, name)}
            onStatusChange={(i, status) => setDeckStatus("B", i, status)}
            onReset={() => resetTeam("B")}
          />
        </div>

        {/* Output */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              コピペ用テキスト
            </h2>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-indigo-700 active:bg-indigo-800"
            >
              <Copy className="size-4" />
              {copied ? "コピーしました" : "コピー"}
            </button>
          </div>
          <textarea
            className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-sm text-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            rows={15}
            value={outputText}
            readOnly
          />
        </section>
      </div>
    </div>
  );
}

function TeamSection({
  label,
  decks,
  onDeckNameChange,
  onStatusChange,
  onReset,
}: {
  label: string;
  decks: Deck[];
  onDeckNameChange: (index: number, name: string) => void;
  onStatusChange: (index: number, status: DeckStatus) => void;
  onReset: () => void;
}) {
  const banCount = decks.filter((d) => d.status === "ban").length;
  const pickCount = decks.filter((d) => d.status === "pick").length;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">
            BAN {banCount}/{MAX_BAN} ・ PICK {pickCount}/{MAX_PICK}
          </span>
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 active:bg-slate-200"
            onClick={onReset}
          >
            <RefreshCw className="size-4" />
            リセット
          </button>
        </div>
      </div>
      <ul className="flex flex-col gap-2.5">
        {decks.map((deck, i) => {
          const banDisabled = deck.status !== "ban" && banCount >= MAX_BAN;
          const pickDisabled = deck.status !== "pick" && pickCount >= MAX_PICK;
          return (
            <li key={i} className="flex items-center gap-2 sm:gap-3">
              <span className="w-5 shrink-0 text-center text-xs font-medium text-slate-400">
                {i + 1}
              </span>
              <input
                type="text"
                className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                placeholder="デッキ名を入力"
                value={deck.name}
                onChange={(e) => onDeckNameChange(i, e.target.value)}
              />
              <div className="flex shrink-0">
                <button
                  type="button"
                  disabled={banDisabled}
                  className={`inline-flex items-center gap-1 rounded-l-lg border border-slate-300 px-2 py-2 text-xs font-medium transition sm:px-3 ${
                    deck.status === "ban"
                      ? "border-red-300 bg-red-100 text-red-700 cursor-pointer"
                      : banDisabled
                        ? "bg-slate-50 text-slate-300 cursor-not-allowed"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 cursor-pointer"
                  }`}
                  onClick={() => onStatusChange(i, "ban")}
                >
                  <CircleX className="size-4" />
                  <span className="hidden sm:inline">BAN</span>
                </button>
                <button
                  type="button"
                  disabled={pickDisabled}
                  className={`inline-flex items-center gap-1 rounded-r-lg border border-l-0 border-slate-300 px-2 py-2 text-xs font-medium transition sm:px-3 ${
                    deck.status === "pick"
                      ? "border-blue-300 bg-blue-100 text-blue-700 cursor-pointer"
                      : pickDisabled
                        ? "bg-slate-50 text-slate-300 cursor-not-allowed"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 cursor-pointer"
                  }`}
                  onClick={() => onStatusChange(i, "pick")}
                >
                  <CircleCheck className="size-4" />
                  <span className="hidden sm:inline">PICK</span>
                </button>
              </div>
              <span className="w-16 shrink-0 text-right text-xs font-semibold sm:w-20">
                {deck.status === "ban" && (
                  <span className="text-red-600">BAN</span>
                )}
                {deck.status === "pick" && (
                  <span className="text-blue-600">PICK #{deck.pickOrder}</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default App;
