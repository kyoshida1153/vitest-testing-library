import { render, screen } from "@testing-library/react";
import { UserList } from "./UserList";
import { vi } from "vitest";

describe("UserList Component", () => {
  test("APIから取得したユーザー一覧が表示されること", async () => {
    // 1. fetch をモック化して偽のデータを返すように設定
    const mockUsers = [
      { id: 1, name: "田中太郎" },
      { id: 2, name: "佐藤花子" },
    ];

    // global.fetch = ... の代わりに以下を使用
    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockUsers),
    });

    vi.stubGlobal("fetch", fetchMock);

    // 2. レンダリング
    render(<UserList />);

    // 3. 最初は「読み込み中」が出ていることを確認
    expect(screen.getByText("読み込み中...")).toBeInTheDocument();

    // 4. データが表示されるまで待機 (findBy を使用)
    // findByText は要素が見つかるまで最大1000ms（デフォルト）待ってくれます
    const userItem = await screen.findByText("田中太郎");

    // 5. 検証
    expect(userItem).toBeInTheDocument();
    expect(screen.getByText("佐藤花子")).toBeInTheDocument();

    // 「読み込み中」が消えたことも確認
    expect(screen.queryByText("読み込み中...")).not.toBeInTheDocument();
  });
});
