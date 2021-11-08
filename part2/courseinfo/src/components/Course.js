import React from 'react'

const Header = ({ title }) => {
    return (
        <h2>{title}</h2>
    )
}


const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part title={part.name} count={part.exercises} key={part.id} />)}
        </div>
    )
}
const Part = ({ title, count }) => {
    return (
        <div>
            <p>{title} {count}</p>
        </div>
    )
}


const Total = ({ parts }) => {
    return (
        <p><b>total of {parts.reduce((prev, cur) => ({ exercises: prev.exercises + cur.exercises })).exercises} exercises</b></p>
    )
}


const Course = ({ course }) => {
    return (
        <div>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course