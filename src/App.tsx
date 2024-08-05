import { useState } from "react";

export type TodoItem = {
  id: number;
  text: string;
  done: boolean;
};

type TodoListItemProps = {
  item: TodoItem;
  onCheck: (checked: boolean) => void;
};

type ValueViewerProps = {
  value: any;
};

type CreateTodoFormProps = {
  onSubmit: (text: string) => void;
};

function CreateTodoForm({ onSubmit }: CreateTodoFormProps) {
  const [text, setText] = useState("");
  return (
    <div className="CreateTodoForm">
      <input
        type="text"
        placeholder="New ToDo"
        size={60}
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}
      />
      <button onClick={() => onSubmit(text)}>Add</button>
    </div>
  );
}

function TodoListItem({ item, onCheck }: TodoListItemProps) {
  return (
    <div className="TodoItem">
      <input
        type="checkbox"
        checked={item.done}
        onChange={(event) => onCheck(event.currentTarget.checked)}
      />
      <p style={{ textDecoration: item.done ? "line-through" : "none" }}>
        {item.text}
      </p>
    </div>
  );
}

function ValueViewer({ value }: ValueViewerProps) {
  return (
    <pre className="ValueViewer">{JSON.stringify(value, undefined, 2)}</pre>
  );
}

const INITIAL_TODO: TodoItem[] = [
  { id: 1, text: "todo-item-1", done: false },
  { id: 2, text: "todo-item-2", done: true },
];

const generateId = () => Date.now();

export default function App() {
  const [todoItems, setTodoItems] = useState(INITIAL_TODO);
  const [keyword, setKeyword] = useState<string>("");
  const [showingDone, setShowingDone] = useState<boolean>(true);

  const createItem = (text: string) => {
    setTodoItems([...todoItems, { id: generateId(), text, done: false }]);
  };

  const updateItem = (newItem: TodoItem) => {
    setTodoItems(
      todoItems.map((item) => (item.id === newItem.id ? newItem : item))
    );
  };

  const filteredTodoItems = todoItems.filter((item) => {
    if (!showingDone && item.done) return false;
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
        <input
          id="showing-done"
          type="checkbox"
          checked={showingDone}
          onChange={(event) => setShowingDone(event.target.checked)}
        />
        <label htmlFor="showing-done">Show Finished ToDos</label>
      </div>
      {filteredTodoItems.length === 0 ? (
        <div className="dimmed">There is no TODO</div>
      ) : (
        <div className="App_todo-list">
          {filteredTodoItems.map((item) => (
            <TodoListItem
              key={item.id}
              item={item}
              onCheck={(checked) => {
                updateItem({ ...item, done: checked });
              }}
            />
          ))}
        </div>
      )}
      <CreateTodoForm onSubmit={(text) => createItem(text)} />
      <ValueViewer value={{ keyword, todoItems, filteredTodoItems }} />
    </div>
  );
}
