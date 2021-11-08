import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      <Part title={parts[0].name} count={parts[0].exercises} />
      <Part title={parts[1].name} count={parts[1].exercises} />
      <Part title={parts[2].name} count={parts[2].exercises} />
      <Part title={parts[3].name} count={parts[3].exercises} />
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
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />;
}

export default App;
