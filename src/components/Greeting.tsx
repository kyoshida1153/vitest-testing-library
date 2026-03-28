export const Greeting = ({ name }: { name: string }) => {
  return (
    <div>
      <h1>こんにちは、{name}さん！</h1>
      <button>詳細を見る</button>
    </div>
  );
};
