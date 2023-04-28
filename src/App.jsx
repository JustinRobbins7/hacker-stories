import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const welcome = {
  greeting: 'Heya',
  title:'React'
}

function getTitle(title) {
  return title;
}

function App() {
  // You can do something in between the function declaration and the return statement
  // Variables declared within the App function will be reassigned upon rendering
  // If variable is not dependent on things internal to the function, declare it outside of it.

  return (
    <div>
      <h1>{welcome.greeting} {welcome.title}!</h1>
      <h1>{getTitle('React')}</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text"/>
    </div>
  )
}

export default App
