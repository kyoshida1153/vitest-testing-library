import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>現在のカウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>カウントアップ</button>
    </div>
  );
};
