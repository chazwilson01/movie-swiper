import { useState } from 'react'
import Header from './components/header'
import './App.css'
import Card from './components/cards'
import SwipeButtons from './components/swipeButtons'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
        <Header />
        <Card />
        <SwipeButtons />  
      </div>
    </>
  )
}

export default App
