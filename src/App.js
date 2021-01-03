import "./App.css";
import TodoList from "./TodoList";

function App() {
  return (
    <div>
      <div>
        <header>Make A Todo List</header>
      </div>
      <div className="App todobox">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
