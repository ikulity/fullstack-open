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

    const [message, setMessage] = useState(null)
    const [isError, setIsError] = useState(true)

    useEffect(() => {
        personService.getAll().then((persons) => {
            setPersons(persons)
        })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        const newPerson = { name: newName, number: newNumber }
        if (persons.some(person => person.name === newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                // Update a person's number
                const personId = persons.find(person => person.name === newName).id
                personService.update(personId, newPerson)
                    .then((response) => {
                        const updatedPersons = persons.map(person => person.id === personId ? { ...person, number: newNumber } : person)
                        setPersons(updatedPersons)
                        showMessage(`Updated ${newName}`)
                    })
                    .catch((error) => {
                        showMessage(error.response.data.error, true)
                    })

            }
        } else {
            // Create a new 'person'
            personService.create(newPerson)
                .then((response) => {
                    setPersons(persons.concat(response))
                    setNewName('')
                    setNewNumber('')
                    showMessage(`Added ${newName}`)
                })
                .catch((error) => {
                    showMessage(error.response.data.error, true)
                })

        }
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
            }).catch(() => {
                showMessage(`Information of ${name} has already been removed from server`, true)
            })
            // Delete from state
            const newPersons = persons.filter(person => person.id !== id)
            setPersons(newPersons)
        }
    }

    // function for setting up the notification message, default type is a regular message (green)
    // setting 'isError' to true changes it to an error message (red)
    const showMessage = (message, isError = false) => {
        setIsError(isError)
        setMessage(JSON.stringify(message))
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} isError={isError} />
            <Filter filter={filter} handleFilterChange={handleFilterChange} />

            <h3>Add a new</h3>
            <PersonForm handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange} />

            <h3>Numbers</h3>
            <Persons filter={filter} persons={persons} deleteHandler={handleDelete} />
        </div>
    )
}

const Notification = ({ message, isError }) => {
    if (message === null) return null
    return (
        <div className={`${isError ? "error" : "message"} notification`} >
            {message}
        </div>
    )
}

export default App