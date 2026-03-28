import { useState } from "react";

export const InputText = () => {
  const [text, setText] = useState("");
  const [submittedText, setSubmittedText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedText(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="user-input">メッセージ:</label>
      <input
        id="user-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="何か入力してください"
      />
      <button type="submit" disabled={!text}>
        送信する
      </button>

      {submittedText && (
        <p data-testid="result-message">送信済み: {submittedText}</p>
      )}
    </form>
  );
};
