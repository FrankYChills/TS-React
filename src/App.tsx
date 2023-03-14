import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface User {
  id: number;
  user: string;
}

type fibFunc = (n: number) => number;

const fib: fibFunc = (n) => {
  if (n < 2) {
    return n;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
};

const myNum: number = 30;

function App() {
  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<User[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  console.log("referenced element: ", inputRef.current);
  console.log("element's value: ", inputRef.current?.value);

  useEffect(() => {
    console.log("Mounting App Component");
    console.log("Users: ", users);

    return () => console.log("Triggered cause App Component is unmounting");
  }, [users]);

  // Memoized function -> it saves the return for particular input in cache if that input is passed again/or page is refreshed else for other input it calculates the return
  const addTwo = useCallback((): void => setCount((prev) => prev + 2), []);

  const result = useMemo<number>(() => fib(myNum), [myNum]);

  return (
    <>
      <h1>React Hooks</h1>
      <h1>{count}</h1>
      <button onClick={addTwo}>Add</button>
      <h4>
        Fibnocci of {myNum} is {result}
      </h4>
      <input ref={inputRef} type="text" />
    </>
  );
}

export default App;
