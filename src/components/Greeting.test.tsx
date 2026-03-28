import { render, screen } from "@testing-library/react";
import { Greeting } from "./Greeting";

describe("Greeting Component", () => {
  test("渡した名前が正しく表示されること", () => {
    // 1. レンダリング
    render(<Greeting name="太郎" />);

    // 2. 要素の取得 (Role や Text で探すのが RTL の推奨)
    const heading = screen.getByRole("heading", {
      name: /こんにちは、太郎さん！/,
    });

    // 3. 検証
    expect(heading).toBeInTheDocument();
  });

  test("ボタンが表示されていること", () => {
    render(<Greeting name="太郎" />);

    // 役割（Role）で要素を探す
    const button = screen.getByRole("button", { name: "詳細を見る" });
    expect(button).toBeInTheDocument();
  });
});
