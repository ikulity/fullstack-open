import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({ handleSubmit, newName, newNumber, nameChange, numberChange }) => {

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={nameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={numberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ filter, persons, deleteHandler }) => {
  const filterName = ({ name }) => {
    return name.toLowerCase().includes(filter.toLowerCase())
  }
  return (
    <ul>
      {filter === ''
        ? persons.map((person) => <Contact name={person.name} number={person.number} id={person.id} deleteHandler={deleteHandler} key={person.id} />)
        : persons.filter(filterName).map((person) => <Contact name={person.name} number={person.number} id={person.id} deleteHandler={deleteHandler} key={person.id} />)}
    </ul>
  )
}

const Contact = ({ name, number, id, deleteHandler }) => {
  return (
    <li>{name} {number} <button onClick={deleteHandler(id, name)}>delete</button></li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (!persons.some(person => person.name === newName)) {
      setPersons(persons.concat(newPerson))
      // SEND PERSON TO SERVER
      personService.create(newPerson).then((response) => {
        console.log("new person response: ", response)
      })
      setNewName('')
      setNewNumber('')
      return
    }
    alert(`${newName} is already added to phonebook`)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id, name) => () => {
    if (window.confirm(`Delete ${name} from phonebook?`)) {
      // Delete from backend
      personService.remove(id).then(() => {
        console.log('person deleted...')
      })
      // Delete from state
      const newPersons = persons.filter(person => person.id !== id)
      setPersons(newPersons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons} deleteHandler={handleDelete} />
    </div>
  )
}

export default App