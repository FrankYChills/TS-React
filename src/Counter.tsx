import React, { ChangeEvent, ReactNode, useReducer, useState } from "react";

type ChildrenProps = {
  children: (num: number) => ReactNode;
};

const initState = { count: 0, text: "" };

const enum ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_ENTRY,
}
// action will have two props that are type and payload so
type ActionProps = {
  type: ACTION_TYPE;
  payload?: string;
};

// define reducer function that updates the state by checking the args
const reducer = (
  state: typeof initState,
  action: ActionProps
): typeof initState => {
  switch (action.type) {
    case ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 };
    case ACTION_TYPE.NEW_ENTRY:
      return { ...state, text: action.payload ?? "" };
    default:
      throw new Error();
  }
};

const Counter = ({ children }: ChildrenProps) => {
  //   const [count, setCount] = useState<number>(1);
  //  use UseReducer hook in place of useState
  const [state, dispatch] = useReducer(reducer, initState);

  const increment = () => dispatch({ type: ACTION_TYPE.INCREMENT });
  const decrement = () => dispatch({ type: ACTION_TYPE.DECREMENT });
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ACTION_TYPE.NEW_ENTRY, payload: e.target.value });
  };

  return (
    <>
      <h1>{children(state.count)}</h1>
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
      <h2>Text in the State is : {state.text}</h2>
      <input type="text" onChange={handleInput} />
    </>
  );
};

export default Counter;
