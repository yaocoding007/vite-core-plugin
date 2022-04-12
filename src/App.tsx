import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>{JSON.stringify(process.env)}</h1>
    </div>
  )
}

export default App
