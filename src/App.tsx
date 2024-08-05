import {useState} from "react";

function Counter() {
  const [count, useUnko] = useState(0);
  return (
    <div>
      <button onClick={() => useUnko(count + 1)}>+1</button>
      <p>count: {count}</p>
    </div>
  )
}

export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  )
}
