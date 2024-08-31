import { useState , useEffect} from "react";
import TodoList from "./components/TodoList";
import Todoinput from "./components/Todoinput";

function App() {
  const [todos, setTodos] = useState([]); 
  const [todoValue, setTodoValue] = useState('')

  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({todos: newList}))
  }

  function handleAddTodos(newTodos){
    const newTodoList = [newTodos , ...todos ];
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodos(index){
    const newTodoList = todos.filter((todos, todosIndex) => {
      return todosIndex !== index
    })
    persistData(newTodoList) 
    setTodos(newTodoList)
  }

  function handleEditTodos(index){
    const valueToEdit = todos[index]
    setTodoValue(valueToEdit)
    handleDeleteTodos(index)
  }

  useEffect(()=>{
    if (!localStorage){
      return
    }
    let localTodos = localStorage.getItem('todos')
    if (!localTodos){
      return
    }
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  },[])


  return (
    <>
      <Todoinput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
      <TodoList handleEditTodos={handleEditTodos} todos={todos} handleDeleteTodos={handleDeleteTodos} />
    </>
  );
}

export default App;
