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

function App() {
  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");
  const [teamADecks, setTeamADecks] = useState<Deck[]>(createInitialDecks);
  const [teamBDecks, setTeamBDecks] = useState<Deck[]>(createInitialDecks);

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

  const teamALabel = teamAName || "チームA";
  const teamBLabel = teamBName || "チームB";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-start justify-start gap-4">
          <h2 className="w-full text-center text-2xl font-bold">
            Rocket CUP JUDGE Tool
          </h2>
          <h3 className="font-bold">チーム情報</h3>
          <ul className="flex flex-col items-start justify-start gap-4">
            <li className="flex gap-4">
              <input
                type="text"
                className="w-48 rounded-sm border border-gray-400 px-2 py-1"
                placeholder="チームAの名前を入力"
                value={teamAName}
                onChange={(e) => setTeamAName(e.target.value)}
              />
            </li>
            <li className="flex gap-4">
              <input
                type="text"
                className="w-48 rounded-sm border border-gray-400 px-2 py-1"
                placeholder="チームBの名前を入力"
                value={teamBName}
                onChange={(e) => setTeamBName(e.target.value)}
              />
            </li>
          </ul>

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

          <h3 className="mt-4 font-bold">コピペ用テキスト</h3>
          <textarea
            className="rounded-sm bg-gray-200"
            cols={80}
            rows={15}
            value={outputText}
            readOnly
          />
        </div>
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
    <>
      <h3 className="mt-4 font-bold">{label}</h3>
      <div className="flex flex-col items-start justify-start gap-4">
        <ul className="flex justify-start items-start flex-col gap-2">
          {decks.map((deck, i) => (
            <li key={i} className="flex gap-4">
              <input
                type="text"
                className="w-48 rounded-sm border border-gray-400 px-2 py-1"
                placeholder="デッキ名を入力"
                value={deck.name}
                onChange={(e) => onDeckNameChange(i, e.target.value)}
              />
              <div className="flex">
                <button
                  type="button"
                  className={`cursor-pointer rounded-l-sm border-t border-b border-l border-gray-400 px-2 py-1 text-sm ${
                    deck.status === "ban"
                      ? "bg-red-200 font-bold"
                      : ""
                  }`}
                  onClick={() => onStatusChange(i, "ban")}
                >
                  BAN
                </button>
                <div
                  className="bg-gray-300"
                  style={{ width: "1px", height: "100%" }}
                />
                <button
                  type="button"
                  className={`cursor-pointer rounded-r-sm border-t border-r border-b border-gray-400 px-2 py-1 text-sm ${
                    deck.status === "pick"
                      ? "bg-blue-200 font-bold"
                      : ""
                  }`}
                  onClick={() => onStatusChange(i, "pick")}
                >
                  PICK
                </button>
              </div>
              {deck.status !== "none" && (
                <span className="flex items-center text-sm text-gray-500">
                  {deck.status === "ban"
                    ? "BAN"
                    : `PICK #${deck.pickOrder}`}
                </span>
              )}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="cursor-pointer rounded border border-gray-400 px-2 py-1 text-sm text-gray-800"
          onClick={onReset}
        >
          リセット
        </button>
      </div>
    </>
  );
}

export default App;
