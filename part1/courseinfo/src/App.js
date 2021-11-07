import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part title={props.part1} count={props.exercises1} />
      <Part title={props.part2} count={props.exercises2} />
      <Part title={props.part3} count={props.exercises3} />
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

const Total = ({ count }) => {
  return (
    <p>Number of exercises {count} </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return (
    <div className="App">
      <Header course={course} />
      <Content part1={part1.name} part2={part2.name} part3={part3.name} exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
      <Total count={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
}

export default App;
