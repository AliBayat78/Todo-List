import { useEffect, useRef, useState } from 'react'

const TodoForm = ({ edit, submitTodo }) => {
  const [input, setInput] = useState(edit ? edit.text : '')
  const inputRef = useRef(null)

  // auto focus on input -> with every render
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  // sync input with state
  const changeHandler = (e) => {
    setInput(e.target.value)
  }

  // submit the form
  const submitHandler = (e) => {
    e.preventDefault()
    // add entered todo to todos =>
    if (!input) {
      alert('Fill the Input')
      return
    }
    submitTodo(input)
    setInput('')
  }

  return (
    <form onSubmit={submitHandler}>
      <>
        <div className="formControl">
          <input
            ref={inputRef}
            placeholder={edit ? 'update todo ...' : 'add todo ...'}
            type="text"
            value={input}
            onChange={changeHandler}
          />
          <button className={`btn ${edit ? 'updateTodo' : 'editTodo'}`} type="submit">
            {edit ? 'Update' : 'Add'}
          </button>
        </div>
      </>
    </form>
  )
}

export default TodoForm
