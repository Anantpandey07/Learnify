import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Login from './pages/login'
import Navbar from './components/Navbar'

function App() {

  return (
    <main>
      <Navbar/>
      <Login/>
    </main>
  )
}

export default App
