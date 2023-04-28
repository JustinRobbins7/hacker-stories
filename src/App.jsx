import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const title = 'React'

function App() {
  // You can do something in between the function declaration and the return statement
  // Variables declared within the App function will be reassigned upon rendering
  // If variable is not dependent on things internal to the function, declare it outside of it.

  return (
    <div>
      <h1>title</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text"/>
    </div>
  )
}

export default App
