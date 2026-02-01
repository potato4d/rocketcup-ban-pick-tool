import { describe, it, expect } from "vitest";
import {
  createInitialDecks,
  getNextPickOrder,
  applyDeckStatus,
  resetDecks,
  formatTeam,
  getNextActionMessage,
  MAX_BAN,
  MAX_PICK,
} from "../logic";
import type { Deck } from "../logic";

describe("createInitialDecks", () => {
  it("5つの空デッキを生成する", () => {
    const decks = createInitialDecks();
    expect(decks).toHaveLength(5);
    for (const deck of decks) {
      expect(deck.name).toBe("");
      expect(deck.status).toBe("none");
      expect(deck.pickOrder).toBeNull();
    }
  });

  it("呼び出しごとに独立した配列を返す", () => {
    const a = createInitialDecks();
    const b = createInitialDecks();
    expect(a).not.toBe(b);
    a[0].name = "modified";
    expect(b[0].name).toBe("");
  });
});

describe("getNextPickOrder", () => {
  it("pickがない場合は1を返す", () => {
    const decks = createInitialDecks();
    expect(getNextPickOrder(decks)).toBe(1);
  });

  it("既存のpickOrderの最大値+1を返す", () => {
    const decks: Deck[] = [
      { name: "a", status: "pick", pickOrder: 1 },
      { name: "b", status: "pick", pickOrder: 3 },
      { name: "c", status: "none", pickOrder: null },
      { name: "d", status: "ban", pickOrder: null },
      { name: "e", status: "pick", pickOrder: 2 },
    ];
    expect(getNextPickOrder(decks)).toBe(4);
  });
});

describe("applyDeckStatus", () => {
  it("noneのデッキをbanに設定できる", () => {
    const decks = createInitialDecks();
    decks[0].name = "Deck1";
    const result = applyDeckStatus(decks, 0, "ban");
    expect(result[0].status).toBe("ban");
    expect(result[0].pickOrder).toBeNull();
  });

  it("noneのデッキをpickに設定できる", () => {
    const decks = createInitialDecks();
    decks[0].name = "Deck1";
    const result = applyDeckStatus(decks, 0, "pick");
    expect(result[0].status).toBe("pick");
    expect(result[0].pickOrder).toBe(1);
  });

  it("同じステータスをクリックするとnoneにトグルされる", () => {
    const decks = createInitialDecks();
    const banned = applyDeckStatus(decks, 0, "ban");
    expect(banned[0].status).toBe("ban");
    const toggled = applyDeckStatus(banned, 0, "ban");
    expect(toggled[0].status).toBe("none");
    expect(toggled[0].pickOrder).toBeNull();
  });

  it("pickのトグルオフでpickOrderがnullになる", () => {
    const decks = createInitialDecks();
    const picked = applyDeckStatus(decks, 0, "pick");
    expect(picked[0].pickOrder).toBe(1);
    const toggled = applyDeckStatus(picked, 0, "pick");
    expect(toggled[0].status).toBe("none");
    expect(toggled[0].pickOrder).toBeNull();
  });

  it(`BANが${MAX_BAN}個に達した場合、追加のBANは無視される`, () => {
    let decks = createInitialDecks();
    decks = applyDeckStatus(decks, 0, "ban");
    decks = applyDeckStatus(decks, 1, "ban");
    // 3つ目のBANを試みる
    const result = applyDeckStatus(decks, 2, "ban");
    expect(result[2].status).toBe("none");
    // 元の配列と同じ参照が返される
    expect(result).toBe(decks);
  });

  it(`PICKが${MAX_PICK}個に達した場合、追加のPICKは無視される`, () => {
    let decks = createInitialDecks();
    decks = applyDeckStatus(decks, 0, "pick");
    decks = applyDeckStatus(decks, 1, "pick");
    decks = applyDeckStatus(decks, 2, "pick");
    // 4つ目のPICKを試みる
    const result = applyDeckStatus(decks, 3, "pick");
    expect(result[3].status).toBe("none");
    expect(result).toBe(decks);
  });

  it("pickOrderは順番にインクリメントされる", () => {
    let decks = createInitialDecks();
    decks = applyDeckStatus(decks, 0, "pick");
    decks = applyDeckStatus(decks, 2, "pick");
    decks = applyDeckStatus(decks, 4, "pick");
    expect(decks[0].pickOrder).toBe(1);
    expect(decks[2].pickOrder).toBe(2);
    expect(decks[4].pickOrder).toBe(3);
  });

  it("banからpickへのステータス変更はトグルオフを経由する", () => {
    let decks = createInitialDecks();
    decks = applyDeckStatus(decks, 0, "ban");
    // banをpickに直接変更しようとすると、banのトグルではなく新しいステータスが設定される
    const result = applyDeckStatus(decks, 0, "pick");
    expect(result[0].status).toBe("pick");
    expect(result[0].pickOrder).toBe(1);
  });

  it("他のデッキに影響を与えない", () => {
    const decks = createInitialDecks();
    decks[0].name = "A";
    decks[1].name = "B";
    const result = applyDeckStatus(decks, 0, "ban");
    expect(result[1].name).toBe("B");
    expect(result[1].status).toBe("none");
  });
});

describe("resetDecks", () => {
  it("全デッキのステータスとpickOrderをリセットする", () => {
    let decks = createInitialDecks();
    decks[0].name = "Deck1";
    decks[1].name = "Deck2";
    decks = applyDeckStatus(decks, 0, "ban");
    decks = applyDeckStatus(decks, 1, "pick");

    const result = resetDecks(decks);
    for (const deck of result) {
      expect(deck.status).toBe("none");
      expect(deck.pickOrder).toBeNull();
    }
    // 名前は保持される
    expect(result[0].name).toBe("Deck1");
    expect(result[1].name).toBe("Deck2");
  });
});

describe("formatTeam", () => {
  it("通常デッキをフォーマットする", () => {
    const decks: Deck[] = [
      { name: "Dragon", status: "none", pickOrder: null },
      { name: "Knight", status: "none", pickOrder: null },
      { name: "Mage", status: "none", pickOrder: null },
      { name: "Archer", status: "none", pickOrder: null },
      { name: "Healer", status: "none", pickOrder: null },
    ];
    const result = formatTeam("Alpha", decks);
    expect(result).toBe("Alpha\n\n1. Dragon\n2. Knight\n3. Mage\n4. Archer\n5. Healer");
  });

  it("BANされたデッキに取り消し線を適用する", () => {
    const decks: Deck[] = [
      { name: "Dragon", status: "ban", pickOrder: null },
      { name: "Knight", status: "none", pickOrder: null },
      { name: "Mage", status: "none", pickOrder: null },
      { name: "Archer", status: "none", pickOrder: null },
      { name: "Healer", status: "none", pickOrder: null },
    ];
    const result = formatTeam("Alpha", decks);
    expect(result).toContain("1. ~~Dragon~~");
  });

  it("PICKされたデッキにpickOrderを付与する", () => {
    const decks: Deck[] = [
      { name: "Dragon", status: "pick", pickOrder: 1 },
      { name: "Knight", status: "none", pickOrder: null },
      { name: "Mage", status: "none", pickOrder: null },
      { name: "Archer", status: "none", pickOrder: null },
      { name: "Healer", status: "none", pickOrder: null },
    ];
    const result = formatTeam("Alpha", decks);
    expect(result).toContain("1. Dragon 1");
  });
});

describe("getNextActionMessage", () => {
  const emptyDecks = createInitialDecks;

  it("初期状態で最初のステップメッセージを返す", () => {
    const msg = getNextActionMessage("", "", emptyDecks(), emptyDecks());
    expect(msg).toBe("チームAはチームBのデッキを1つBANしてください。");
  });

  it("チーム名を反映する", () => {
    const msg = getNextActionMessage("Alpha", "Beta", emptyDecks(), emptyDecks());
    expect(msg).toBe("AlphaはBetaのデッキを1つBANしてください。");
  });

  it("アクション数に応じてステップが進む", () => {
    const aDecks = createInitialDecks();
    const bDecks = createInitialDecks();
    // 1アクション: TeamBに1 BAN
    bDecks[0].status = "ban";
    const msg = getNextActionMessage("", "", aDecks, bDecks);
    expect(msg).toBe("チームBはチームAのデッキを1つBANしてください。");
  });

  it("全8アクション完了で完了メッセージを返す", () => {
    const aDecks: Deck[] = [
      { name: "a1", status: "ban", pickOrder: null },
      { name: "a2", status: "ban", pickOrder: null },
      { name: "a3", status: "pick", pickOrder: 1 },
      { name: "a4", status: "pick", pickOrder: 2 },
      { name: "a5", status: "none", pickOrder: null },
    ];
    const bDecks: Deck[] = [
      { name: "b1", status: "ban", pickOrder: null },
      { name: "b2", status: "ban", pickOrder: null },
      { name: "b3", status: "pick", pickOrder: 1 },
      { name: "b4", status: "pick", pickOrder: 2 },
      { name: "b5", status: "none", pickOrder: null },
    ];
    const msg = getNextActionMessage("", "", aDecks, bDecks);
    expect(msg).toBe("Ban & Pickが完了しました。");
  });
});
