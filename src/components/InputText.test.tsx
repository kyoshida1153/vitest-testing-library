import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputText } from "./InputText";

describe("InputText Component", () => {
  test("入力を進めて送信すると、送信した内容が表示されること", async () => {
    const user = userEvent.setup();
    render(<InputText />);

    // 1. 最初はボタンが非活性（disabled）であることを確認
    const submitButton = screen.getByRole("button", { name: "送信する" });
    expect(submitButton).toBeDisabled();

    // 2. 入力フィールドを取得して文字を入力
    // label のテキスト（メッセージ:）で紐づく input を取得
    const input = screen.getByLabelText("メッセージ:");
    await user.type(input, "こんにちは");

    // 3. 入力後はボタンが活性化していることを確認
    expect(submitButton).toBeEnabled();
    expect(input).toHaveValue("こんにちは");

    // 4. 送信ボタンをクリック
    await user.click(submitButton);

    // 5. 送信後の結果を確認
    const result = screen.getByTestId("result-message");
    expect(result).toHaveTextContent("送信済み: こんにちは");

    // 6. 入力欄がクリアされていることを確認
    expect(input).toHaveValue("");
  });
});
