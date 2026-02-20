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
      {/* Fork me on GitHub ribbon */}
      <a
        href="https://github.com/potato4d/rocketcup-ban-pick-tool"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fork me on GitHub"
        className="fixed top-0 right-0 z-50"
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 250 250"
          aria-hidden="true"
          style={{ fill: "#151513", color: "#fff" }}
        >
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style={{ transformOrigin: "130px 106px" }}
          />
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
          />
        </svg>
      </a>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Header */}
        <header className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800">
            ROCKET CUP BAN&amp;PICK TOOL
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
