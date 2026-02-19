import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App", () => {
  beforeEach(() => {
    cleanup();
  });

  it("ヘッダーが表示される", () => {
    render(<App />);
    expect(
      screen.getByText("ROCKET CUP BAN&PICK TOOL")
    ).toBeInTheDocument();
  });

  it("チーム名入力フィールドが表示される", () => {
    render(<App />);
    const teamAInputs = screen.getAllByPlaceholderText("チームAの名前を入力");
    const teamBInputs = screen.getAllByPlaceholderText("チームBの名前を入力");
    expect(teamAInputs.length).toBeGreaterThanOrEqual(1);
    expect(teamBInputs.length).toBeGreaterThanOrEqual(1);
  });

  it("デッキ名入力フィールドが表示される", () => {
    render(<App />);
    const deckInputs = screen.getAllByPlaceholderText("デッキ名を入力");
    expect(deckInputs.length).toBeGreaterThanOrEqual(10);
  });

  it("チーム名を入力すると出力テキストに反映される", async () => {
    const user = userEvent.setup();
    render(<App />);

    const teamAInputs = screen.getAllByPlaceholderText("チームAの名前を入力");
    await user.type(teamAInputs[0], "Alpha");

    const outputTextarea = document.querySelector("textarea");
    expect(outputTextarea?.value).toContain("Alpha");
  });

  it("デッキ名を入力すると出力テキストに反映される", async () => {
    const user = userEvent.setup();
    render(<App />);

    const deckInputs = screen.getAllByPlaceholderText("デッキ名を入力");
    await user.type(deckInputs[0], "Dragon");

    const outputTextarea = document.querySelector("textarea");
    expect(outputTextarea?.value).toContain("Dragon");
  });

  it("BANボタンをクリックするとBAN表示が出る", async () => {
    const user = userEvent.setup();
    render(<App />);

    const banButtons = screen.getAllByText("BAN");
    const initialCount = banButtons.length;
    await user.click(banButtons[0]);

    const banTextsAfter = screen.getAllByText("BAN");
    expect(banTextsAfter.length).toBeGreaterThan(initialCount);
  });

  it("PICKボタンをクリックするとPICK表示が出る", async () => {
    const user = userEvent.setup();
    render(<App />);

    const pickButtons = screen.getAllByText("PICK");
    await user.click(pickButtons[0]);

    expect(screen.getByText("PICK #1")).toBeInTheDocument();
  });

  it("リセットボタンでステータスがクリアされる", async () => {
    const user = userEvent.setup();
    render(<App />);

    const banButtons = screen.getAllByText("BAN");
    const initialBanCount = banButtons.length;
    await user.click(banButtons[0]);
    expect(screen.getAllByText("BAN").length).toBeGreaterThan(initialBanCount);

    const resetButtons = screen.getAllByText("リセット");
    await user.click(resetButtons[0]);

    expect(screen.getAllByText("BAN")).toHaveLength(initialBanCount);
  });

  it("コピーボタンが存在する", () => {
    render(<App />);
    const copyButtons = screen.getAllByText("コピー");
    expect(copyButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("初期状態で最初のステップメッセージが出力に含まれる", () => {
    render(<App />);
    const outputTextarea = document.querySelector("textarea");
    expect(outputTextarea?.value).toContain(
      "チームAはチームBのデッキを1つBANしてください。"
    );
  });

  it("コピーボタンをクリックするとクリップボードにコピーされる", async () => {
    // jsdomのclipboard APIをセットアップ
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    if (!navigator.clipboard) {
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: writeTextMock },
        writable: true,
        configurable: true,
      });
    } else {
      vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    }

    const user = userEvent.setup();
    render(<App />);
    const copyButtons = screen.getAllByText("コピー");
    await user.click(copyButtons[0]);

    // コピーボタンがクリック後「コピーしました」に変わることを確認
    const copiedTexts = screen.getAllByText("コピーしました");
    expect(copiedTexts.length).toBeGreaterThanOrEqual(1);
  });
});
