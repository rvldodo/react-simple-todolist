import React from "react";

function App() {
  const [activity, setActivity] = React.useState("");
  const [edit, setEdit] = React.useState({});
  const [todos, setTodos] = React.useState([]);
  const [message, setMessage] = React.useState("");

  function generateid() {
    return Date.now();
  }
  function addTodoHandler(e) {
    e.preventDefault();

    if (!activity) {
      return setMessage("Field cannot be empty!");
    }

    setMessage("");

    if (edit.id) {
      const updatedTodo = {
        ...edit,
        activity,
      };

      const editTodoIndex = todos.findIndex(function (todo) {
        return todo.id === edit.id;
      });

      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;

      setTodos(updatedTodos);

      return cancelEditHandler();
    }

    setTodos([
      ...todos,
      {
        id: generateid(),
        activity: activity,
      },
    ]);
    setMessage("");
    setActivity("");
  }

  function deleteTodoHandler(todoId) {
    const filtered = todos.filter((todo) => {
      return todo.id !== todoId;
    });

    setTodos(filtered);

    if (edit.id) cancelEditHandler();
  }

  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }

  function cancelEditHandler() {
    setEdit([]);
    setActivity("");
  }

  function doneTodoHandler(todo) {
    const updateTodo = {
      ...todo,
      done: todo.done ? false : true,
    };

    const editTodoIndex = todos.findIndex(function (currentTodo) {
      return todo.id === currentTodo.id;
    });

    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updateTodo;

    setTodos(updatedTodos);
  }

  return (
    <>
      <h1>Simple TodoList</h1>
      {message && <div style={{ color: "red" }}>{message}</div>}
      <form onSubmit={addTodoHandler}>
        <input
          type="text"
          placeholder="Activity"
          value={activity}
          onChange={function (e) {
            setActivity(e.target.value);
          }}
        />
        <button type="submit">{edit.id ? "Save" : "Add"}</button>
        {edit.id && <button onClick={cancelEditHandler}>Cancel</button>}
      </form>
      {todos.length > 0 ? (
        <ul>
          {todos.map(function (todo) {
            return (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={doneTodoHandler.bind(this, todo)}
                />
                {todo.activity} ({todo.done ? "Done" : "Not done yet"})
                <button onClick={editTodoHandler.bind(this, todo)}>Edit</button>
                <button onClick={deleteTodoHandler.bind(this, todo.id)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>
          <i>There is no activity</i>
        </p>
      )}
    </>
  );
}

export default App;
