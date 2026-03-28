import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter Hook", () => {
  test("初期値を指定できること", () => {
    // renderHook でフックを起動
    const { result } = renderHook(() => useCounter(10));

    // result.current がフックの return 値
    expect(result.current.count).toBe(10);
  });

  test("increment を呼ぶとカウントが増えること", () => {
    const { result } = renderHook(() => useCounter(0));

    // 状態を更新する関数を呼ぶときは act で包む
    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test("decrement を呼ぶとカウントが減ること", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });
});
