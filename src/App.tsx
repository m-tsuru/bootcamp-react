type HelloProps = {
  yourName: string
}


function Hello({ yourName }: HelloProps) { // 子コンポーネント
  if (yourName.length > 5) {
    return (
      <p>
        こんにちは、<b>{yourName}!</b>
      </p>
    );
  }
}

export default function App() { // 親コンポーネント
  const members = ["asa-taka", "igarashi", "ueda"]
  return (
    <div className="App">
      {members.map((member) => (
        <Hello key={member} yourName={member}/>
      ))}
    </div>
  );
}
