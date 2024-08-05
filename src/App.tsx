import { useState } from "react";

export type TodoItem = {
  id: number;
  text: string;
  done: boolean;
}

type TodoListItemProps = {
  item: TodoItem;
}

function TodoListItem({ item }: TodoListItemProps) {
  return (
    <div className="TodoItem">
      <p style = {{ textDecoration: item.done ? "line-through" : "none" }}>
        { item.text }
      </p>
    </div>
  );
}

const INITIAL_TODO: TodoItem[] = [
  {id: 1, text: "todo-item-1", done: false},
  {id: 2, text: "todo-item-2", done: true}
]

export default function App() {
  const todoItems = INITIAL_TODO;
  const [keyword, setKeyword] = useState<string>("");

  const filteredTodoItems = todoItems.filter((item) => {
    return item.text.includes(keyword);
  });

  return (
    <div className="App">
      <div className="App_todo-list-control">
        <h1>ToDo</h1>
        <input
          type="text"
          placeholder="Filter" 
          value={keyword} 
          onChange={(event) => setKeyword(event.target.value)}
        />
      </div>
    { filteredTodoItems.length === 0 ? (
      <div className="dimmed">There is no TODO</div>
    ) : (
      <div className="App_todo-list">
        {filteredTodoItems.map((item) => (
          <TodoListItem key={item.id} item={item} />
        ))}
      </div>
    )}
  </div>
  )
}
