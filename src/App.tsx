import { useState } from "react";

export type TodoItem = {
  id: number;
  text: string;
  done: boolean;
};

type TodoListItemProps = {
  item: TodoItem;
  onCheck: (checked: boolean) => void;
  onDelete: () => void;
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

function TodoListItem({ item, onCheck, onDelete }: TodoListItemProps) {
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
      <button className="button-small" onClick={() => onDelete()}>
        ❌
      </button>
    </div>
  );
}

function ValueViewer({ value }: ValueViewerProps) {
  return (
    <pre className="ValueViewer">{JSON.stringify(value, undefined, 2)}</pre>
  );
}

function saveTodoListItems({ value }: ValueViewerProps) {
  const saveData = JSON.stringify(value["todoItems"], undefined, 2);
  localStorage.setItem("rawData", saveData);
}

function localTodoListItems() {
  const loadData = localStorage.getItem("rawData") ?? undefined;
  if (loadData === undefined) {
    return [];
  } else {
    return JSON.parse(loadData);
  }
}

const INITIAL_TODO: TodoItem[] = [
];

const generateId = () => Date.now();

const useTodoState = () => {
  const [todoItems, setTodoItems] = useState(localTodoListItems ?? INITIAL_TODO);
  const createItem = (text: string) => {
    setTodoItems([...todoItems, {id: generateId(), text, done: false}]);
  };
  const updateItem = (newItem: TodoItem) => {
    setTodoItems(
      todoItems.map((item: TodoItem) => (item.id === newItem.id ? newItem : item))
    );
  };
  const deleteItem = (id: number) => {
    setTodoItems(todoItems.filter((item: TodoItem) => item.id !== id))
  }
  saveTodoListItems({ value: { todoItems } });
  return [todoItems, createItem, updateItem, deleteItem] as const;
};

export default function App() {
  const [todoItems, createItem, updateItem, deleteItem] = useTodoState();
  const [keyword, setKeyword] = useState<string>("");
  const [showingDone, setShowingDone] = useState<boolean>(true);

  const filteredTodoItems = todoItems.filter((item: TodoItem) => {
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
          {filteredTodoItems.map((item: TodoItem) => (
            <TodoListItem
              key={item.id}
              item={item}
              onCheck={(checked) => {
                updateItem({ ...item, done: checked });
              }}
              onDelete={() => deleteItem(item.id)}
            />
          ))}
        </div>
      )}
      <CreateTodoForm onSubmit={(text) => createItem(text)} />
      <ValueViewer value={{ keyword, todoItems, filteredTodoItems }} />
    </div>
  );
}
