import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button >
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0)
    return (
      <p>No feedback given</p>
    )
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good - bad) / (good + neutral + bad)}</p>
      <p>positive {(good / (good + neutral + bad)) * 100} %</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleIncrement = (value, setter) => () => {
    setter(value + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <p>
        <Button handleClick={handleIncrement(good, setGood)} text={"good"} />
        <Button handleClick={handleIncrement(neutral, setNeutral)} text={"neutral"} />
        <Button handleClick={handleIncrement(bad, setBad)} text={"bad"} />
      </p>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
