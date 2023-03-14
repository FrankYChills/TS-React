import { useState } from "react";
import Counter from "./components/Counter";
import Heading from "./components/Heading";
import List from "./components/List";
import Section from "./components/Section";

function App() {
  const [count, setCount] = useState<number>(1);
  return (
    <>
      <Heading title={"React + TS"} />
      <h1>Wooh! Lets learn React with TS</h1>
      <Section>Hello this is the starting of the section.</Section>
      <Counter setCount={setCount}>Count is {count}</Counter>
      <List
        items={["Coffee ☕", "Code 🖥️", "Sleep 😴"]}
        render={(item: string) => <span className="gold">{item}</span>}
      />
    </>
  );
}

export default App;
