import { useEffect, useState } from 'react'
import NavBar from './NavBar'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

const TodoApp = () => {
  // todos -> global state =>
  const [todos, setTodos] = useState([])
  // Helping Array for Filtering -> react select
  const [filteredTodos, setFilteredTodos] = useState([])
  // React Select  state
  const [selectedOption, setSelectedOption] = useState('All')

  // for every changes in state and Filter -> check which filter user has selected
  useEffect(() => {
    filterTodos(selectedOption.value)
  }, [todos, selectedOption])

  // add new Todo
  const addTodo = (input) => {
    const newTodo = { id: Math.floor(Math.random() * 1000), text: input, isCompleted: false }

    setTodos([...todos, newTodo])
  }

  // toggle isComplete in state
  const completeTodo = (id) => {
    // find index =>
    const index = todos.findIndex((i) => i.id === id)
    // clone: Do Not Mutate
    const selectedTodo = { ...todos[index] }
    selectedTodo.isCompleted = !selectedTodo.isCompleted

    // clone : todos :
    const updatedTodos = [...todos]
    updatedTodos[index] = selectedTodo
    setTodos(updatedTodos)
  }

  // delete each item in state based on id
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((i) => i.id !== id)
    setTodos(updatedTodos)
  }

  // edit todo => change the title
  const updateTodo = (id, newValue) => {
    const index = todos.findIndex((i) => i.id === id)
    const selectedTodo = { ...todos[index] }
    selectedTodo.text = newValue
    const updatedTodos = [...todos]
    updatedTodos[index] = selectedTodo
    setTodos(updatedTodos)
  }

  // filtering React Select
  const filterTodos = (selectOption) => {
    switch (selectOption) {
      case 'Completed':
        setFilteredTodos(todos.filter((t) => t.isCompleted))
        break
      case 'Uncompleted':
        setFilteredTodos(todos.filter((t) => !t.isCompleted))
        break
      default:
        setFilteredTodos(todos)
    }
  }

  const selectHandler = (e) => {
    setSelectedOption(e)
    filterTodos(e.value)
  }

  return (
    <div className="container">
      <NavBar
        selectedOption={selectedOption}
        unCompletedTodos={todos.filter((i) => !i.isCompleted).length}
        onChange={selectHandler}
      />
      <TodoForm submitTodo={addTodo} />
      <TodoList
        todos={filteredTodos}
        onComplete={completeTodo}
        onDelete={deleteTodo}
        onUpdateTodo={updateTodo}
      />
    </div>
  )
}

export default TodoApp
