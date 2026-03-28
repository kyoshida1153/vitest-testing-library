import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";

describe("Counter Component", () => {
  test("ボタンをクリックするとカウントが増えること", async () => {
    // 1. ユーザーの操作をセットアップ
    const user = userEvent.setup();

    // 2. レンダリング
    render(<Counter />);

    // 3. 初期状態の確認
    const message = screen.getByText(/現在のカウント: 0/);
    expect(message).toBeInTheDocument();

    // 4. ボタンを取得してクリック
    const button = screen.getByRole("button", { name: "カウントアップ" });
    await user.click(button); // click は非同期なので await が必須

    // 5. 変化後の状態を確認
    expect(screen.getByText(/現在のカウント: 1/)).toBeInTheDocument();
  });
});
