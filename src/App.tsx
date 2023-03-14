import Counter from "./Counter";
import { CounterProvider } from "./context/CounterContext";

function App() {
  return (
    <>
      <h1>React useReducer</h1>
      <CounterProvider>
        <Counter>{(num: number) => <>Current Count : {num}</>}</Counter>
      </CounterProvider>
    </>
  );
}

export default App;
