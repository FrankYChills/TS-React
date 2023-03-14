import React, { ReactNode } from "react";
import { useCounter, useCounterText } from "./context/CounterContext";

type ChildrenProps = {
  children: (num: number) => ReactNode;
};

const Counter = ({ children }: ChildrenProps) => {
  const { count, increment, decrement } = useCounter();
  const { text, handleInput } = useCounterText();

  return (
    <>
      <h1>{children(count)}</h1>
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
      <h2>Text in the State is : {text}</h2>
      <input type="text" onChange={handleInput} />
    </>
  );
};

export default Counter;
