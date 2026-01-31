import { useState, useMemo, useCallback } from "react";

type DeckStatus = "none" | "ban" | "pick";

interface Deck {
  name: string;
  status: DeckStatus;
  pickOrder: number | null;
}

function createInitialDecks(): Deck[] {
  return Array.from({ length: 5 }, () => ({
    name: "",
    status: "none" as DeckStatus,
    pickOrder: null,
  }));
}

function getNextPickOrder(decks: Deck[]): number {
  const maxOrder = decks.reduce(
    (max, d) => (d.pickOrder !== null && d.pickOrder > max ? d.pickOrder : max),
    0
  );
  return maxOrder + 1;
}

function BanIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-4"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PickIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-4"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-4"
    >
      <path
        fillRule="evenodd"
        d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.451a.75.75 0 0 0 0-1.5H4.5a.75.75 0 0 0-.75.75v3.75a.75.75 0 0 0 1.5 0v-2.033l.364.363a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39l-.065.043Zm-10.624-2.85a5.5 5.5 0 0 1 9.201-2.465l.312.31H11.75a.75.75 0 0 0 0 1.5H15.5a.75.75 0 0 0 .75-.75V3.42a.75.75 0 0 0-1.5 0v2.033l-.364-.364A7 7 0 0 0 2.674 8.227a.75.75 0 0 0 1.449.39l.065-.043Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-4"
    >
      <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
      <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
    </svg>
  );
}

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
      setter((prev) =>
        prev.map((d, i) => {
          if (i !== index) return d;
          if (d.status === status) {
            return { ...d, status: "none", pickOrder: null };
          }
          if (status === "pick") {
            return { ...d, status: "pick", pickOrder: getNextPickOrder(prev) };
          }
          return { ...d, status: "ban", pickOrder: null };
        })
      );
    },
    []
  );

  const resetTeam = useCallback((team: "A" | "B") => {
    const setter = team === "A" ? setTeamADecks : setTeamBDecks;
    setter((prev) =>
      prev.map((d) => ({ ...d, status: "none", pickOrder: null }))
    );
  }, []);

  const formatTeam = useCallback(
    (teamName: string, decks: Deck[]): string => {
      const lines = decks.map((d, i) => {
        const num = i + 1;
        if (d.status === "ban") {
          return `${num}. ~~${d.name}~~`;
        }
        if (d.status === "pick") {
          return `${num}. ${d.name} ${d.pickOrder}`;
        }
        return `${num}. ${d.name}`;
      });
      return `${teamName}\n\n${lines.join("\n")}`;
    },
    []
  );

  const outputText = useMemo(() => {
    const aName = teamAName || "チームA";
    const bName = teamBName || "チームB";
    return `${formatTeam(aName, teamADecks)}\n\n${formatTeam(bName, teamBDecks)}\n\n少々お待ちください。`;
  }, [teamAName, teamBName, teamADecks, teamBDecks, formatTeam]);

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
              <CopyIcon />
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
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </h3>
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 active:bg-slate-200"
          onClick={onReset}
        >
          <ResetIcon />
          リセット
        </button>
      </div>
      <ul className="flex flex-col gap-2.5">
        {decks.map((deck, i) => (
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
                className={`inline-flex cursor-pointer items-center gap-1 rounded-l-lg border border-slate-300 px-2 py-2 text-xs font-medium transition sm:px-3 ${
                  deck.status === "ban"
                    ? "border-red-300 bg-red-100 text-red-700"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
                onClick={() => onStatusChange(i, "ban")}
              >
                <BanIcon />
                <span className="hidden sm:inline">BAN</span>
              </button>
              <button
                type="button"
                className={`inline-flex cursor-pointer items-center gap-1 rounded-r-lg border border-l-0 border-slate-300 px-2 py-2 text-xs font-medium transition sm:px-3 ${
                  deck.status === "pick"
                    ? "border-blue-300 bg-blue-100 text-blue-700"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
                onClick={() => onStatusChange(i, "pick")}
              >
                <PickIcon />
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
        ))}
      </ul>
    </section>
  );
}

export default App;
