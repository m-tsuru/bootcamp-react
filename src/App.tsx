import {useState} from "react";

function TextInput() {
  const [text, setText] = useState("");
  return (
    <div>
      <input type="text" value={text} onChange={(event) => setText(event.target.value)}/>
      <p>input: {text}</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <TextInput />
    </div>
  );
}
