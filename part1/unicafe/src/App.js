import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button >
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
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
}

export default App;
