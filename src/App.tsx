import Counter from "./Counter";

function App() {
  return (
    <>
      <h1>React useReducer</h1>
      <Counter>{(num: number) => <>Current Count : {num}</>}</Counter>
    </>
  );
}

export default App;
