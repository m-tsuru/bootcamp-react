import { useState } from "react";

function TextInput() {
  const [text, setText] = useState("");
  return (
    <div>
      <input type="text" value={text} onChange={(event) => setText(event.target.value)}/>
      <p>input: {text}</p>
    </div>
  );
}

function ListFilter() {
  const [text, setText] = useState("");
  const members = ["asa-taka", "yamada", "suzuki"];
  const filteredMembers = members.filter((member) => member.includes(text));
  return (
    <div>
      <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
      {filteredMembers.map((member) => (
        <p key={member}>{member}</p>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <ListFilter />
    </div>
  );
}
