export const MAX_BAN = 2;
export const MAX_PICK = 3;

export type DeckStatus = "none" | "ban" | "pick";

export interface Deck {
  name: string;
  status: DeckStatus;
  pickOrder: number | null;
}

export function createInitialDecks(): Deck[] {
  return Array.from({ length: 5 }, () => ({
    name: "",
    status: "none" as DeckStatus,
    pickOrder: null,
  }));
}

export function getNextPickOrder(decks: Deck[]): number {
  const maxOrder = decks.reduce(
    (max, d) => (d.pickOrder !== null && d.pickOrder > max ? d.pickOrder : max),
    0
  );
  return maxOrder + 1;
}

export function applyDeckStatus(
  decks: Deck[],
  index: number,
  status: DeckStatus
): Deck[] {
  const current = decks[index];
  // Toggle off: always allowed
  if (current.status === status) {
    return decks.map((d, i) =>
      i === index ? { ...d, status: "none", pickOrder: null } : d
    );
  }
  // Check limits before setting new status
  const banCount = decks.filter((d) => d.status === "ban").length;
  const pickCount = decks.filter((d) => d.status === "pick").length;
  if (status === "ban" && banCount >= MAX_BAN) return decks;
  if (status === "pick" && pickCount >= MAX_PICK) return decks;

  return decks.map((d, i) => {
    if (i !== index) return d;
    if (status === "pick") {
      return { ...d, status: "pick", pickOrder: getNextPickOrder(decks) };
    }
    return { ...d, status: "ban", pickOrder: null };
  });
}

export function resetDecks(decks: Deck[]): Deck[] {
  return decks.map((d) => ({ ...d, status: "none" as DeckStatus, pickOrder: null }));
}

export function formatTeam(teamName: string, decks: Deck[]): string {
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
}

export function getNextActionMessage(
  teamAName: string,
  teamBName: string,
  teamADecks: Deck[],
  teamBDecks: Deck[]
): string {
  const aName = teamAName || "チームA";
  const bName = teamBName || "チームB";
  const aBans = teamADecks.filter((d) => d.status === "ban").length;
  const aPicks = teamADecks.filter((d) => d.status === "pick").length;
  const bBans = teamBDecks.filter((d) => d.status === "ban").length;
  const bPicks = teamBDecks.filter((d) => d.status === "pick").length;
  const totalActions = aBans + aPicks + bBans + bPicks;

  const steps: string[] = [
    `${aName}は${bName}のデッキを1つBANしてください。`,
    `${bName}は${aName}のデッキを1つBANしてください。`,
    `${aName}は自チームのデッキを1つPICKしてください。`,
    `${bName}は自チームのデッキを1つPICKしてください。`,
    `${aName}は${bName}のデッキを1つPICKしてください。`,
    `${bName}は${aName}のデッキを1つPICKしてください。`,
    `${aName}は${bName}のデッキを1つBANしてください。`,
    `${bName}は${aName}のデッキを1つBANしてください。`,
  ];

  if (totalActions >= steps.length) {
    return "Ban & Pickが完了しました。";
  }
  return steps[totalActions];
}
