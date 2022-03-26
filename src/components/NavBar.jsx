import Select from 'react-select'

const NavBar = ({ unCompletedTodos, selectedOption, onChange }) => {
  // options for react-select
  const options = [
    { value: 'All', label: 'All' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Uncompleted', label: 'Uncompleted' },
  ]

  if (!unCompletedTodos) return <h2>set your today todos</h2>

  return (
    <header>
      <span>{unCompletedTodos}</span>
      <h2 style={{ marginRight: '10px' }}> are not Completed</h2>
      <Select value={selectedOption} onChange={onChange} options={options} />
    </header>
  )
}

export default NavBar
