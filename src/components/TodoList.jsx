import { useState } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'

const TodoList = ({ todos, onComplete, onDelete, onUpdateTodo }) => {
  const [edit, setEdit] = useState({ id: null, text: '', isCompleted: false })

  // editing each todo - empty the input for next item
  // we are taking updateHandler in TodoApp with props (named onUpdatedTodo)
  const editTodo = (newValue) => {
    onUpdateTodo(edit.id, newValue)
    setEdit({ id: null, text: '' })
  }

  const renderTodos = () => {
    if (todos.length === 0) return <p>add some todos</p>
    return todos.map((todo) => {
      return (
        <Todo
          key={todo.id}
          todo={todo}
          onComplete={() => onComplete(todo.id)}
          onDelete={() => onDelete(todo.id)}
          onEdit={() => setEdit(todo)}
        />
      )
    })
  }

  return <div>{edit.id ? <TodoForm edit={edit} submitTodo={editTodo} /> : renderTodos()}</div>
}

export default TodoList
