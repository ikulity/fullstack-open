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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div className="App">
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total count={exercises1 + exercises2 + exercises3} />
    </div>
  );
}

export default App;
