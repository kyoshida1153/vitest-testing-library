# Vitest + React Testing Library でテストコードを書く

## 必要なパッケージ

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
```

## テストの実行

```bash
npx vitest
```

Vitest はデフォルトで Watch モード で起動します。コードを書き換えると即座に再テストが走るので、開発体験が非常に良いです。


## 学習

### 学習をスムーズに進めるためのポイント

まずは以下の 3 ステップで触ってみるのがおすすめです。

1. Matcher に慣れる: <br>toBeInTheDocument() や toHaveTextContent() など、jest-dom が提供する便利な検証メソッドを使ってみる。
2. ユーザー操作のシミュレート: <br>fireEvent ではなく、より実際の挙動に近い user-event ライブラリを使ってボタンクリックなどをテストする。
3. Hooks のテスト: <br>renderHook を使い、ロジック（カスタムフック）単体のテストを書いてみる。

### 表示のテスト

```
src\components\Greeting.tsx
src\components\Greeting.test.tsx
```

**「要素の探し方」の優先順位**

React Testing Library では、ユーザーがブラウザを操作する時の感覚に近い方法で要素を探すことが推奨されています。

1. **`getByRole`**: <br>ボタン、見出し、チェックボックスなど「役割」で探す（アクセシビリティ的にも◎）。
2. **`getByText`**: <br>表示されているテキストで探す。
3. **`getByLabelText`**: <br>フォームのラベルで探す。
4. **`getByTestId`**: <br>どうしても探せない場合のみ、HTMLに `data-testid` を付与して探す。

### クリック操作のテスト

```
src\components\Counter.tsx
src\components\Counter.test.tsx
```

**ポイント**

1. **`userEvent.setup()`**: <br>テストの冒頭で呼び出すのが推奨されています。これにより、ブラウザのイベント（`keydown` や `pointerdown` など）が正しい順序で発生するようになります。
2. **`await` の使用**: <br>ユーザーの操作は現実世界と同じように時間がかかる（非同期）ものとして扱われます。`await` を忘れると、カウントが増える前に検証が走ってしまい、テストが失敗するので注意してください。
3. **`screen.getByText` の正規表現**: <br>`/現在のカウント: 0/` のようにスラッシュで囲むと、テキストの一部が一致していれば OK になるので、柔軟なテストが書けます。


### 入力フォームのテスト

```
src\components\InputText.tsx
src\components\InputText.test.tsx
```

**テストの解説とコツ**

- **`getByLabelText`**: <br>`label` タグの `htmlFor` と `input` タグの `id` が正しく紐づいていれば、ラベルの文字列で入力を取得できます。これはアクセシビリティ（スクリーンリーダーなど）の観点からも非常に重要なテストです。
- **`toBeDisabled` / `toBeEnabled`**: <br>「バリデーションが通るまでボタンを押せない」といった仕様をテストするのに便利です。
- **`getByTestId`**: <br>「送信済み: {text}」のような動的な文字列は `getByText` で探しにくい場合があります。その際はコンポーネント側に `data-testid` を付与して狙い撃ちするとテストが安定します。
- **`toHaveValue`**: <br>`input` の中身が期待通りかチェックします。

### 非同期処理のテスト（APIからデータを取得して表示）

```
src\components\UserList.tsx
src\components\UserList.test.tsx
```

**ここが重要！クエリの使い分け**

非同期テストを成功させる秘訣は、**`get`**, **`query`**, **`find`** の使い分けです。

|**種類**|**見つからない場合**|**非同期待機**|**主な用途**|
|---|---|---|---|
|**`getBy...`**|**エラーを投げる**|なし|存在するはずの要素を確認|
|**`queryBy...`**|**null を返す**|なし|**「存在しないこと」**を期待する時|
|**`findBy...`**|**エラーを投げる**|**あり (Promise)**|**API後に表示される要素**を待つ時|

**実務でのアドバイス**

今回は global.fetch を直接モックしましたが、プロジェクトが大きくなると MSW (Mock Service Worker) というライブラリを使うのが一般的です。ネットワーク層でリクエストを奪い取ってくれるので、より本物に近いテストが書けます。

### カスタムフックのテスト

```
src\hooks\useCounter.ts
src\hooks\useCounter.test.ts
```

**ポイント**

1. **`act` 関数の役割**: <br>React の状態更新（`setState` など）を伴う処理をテストで実行する場合、React が「レンダリングが完了した」と確信できるタイミングを合わせる必要があります。`act` で囲むことで、テストランナーに「この中身が終わるまで待ってから次のアサーション（expect）をしてね」と伝える役割があります。
2. **`result.current` の参照**: <br>`const { count } = result.current` のように分割代入で変数に取ってしまうと、その変数は**代入時の値で固定**されてしまいます。常に最新の状態をチェックするために、`expect(result.current.count)...` のように、常に `current` プロパティを経由して参照するのが鉄則です。
