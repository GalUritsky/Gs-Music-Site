import { useState } from 'react'
import Header from './components/Header'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <main className="pt-20">
        <section id="hero" className="h-screen bg-gray-100 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to G's Music</h2>
          <p className="text-lg text-gray-700">Your one-stop shop for all things music.</p>
        </section>
      </main>
    </>
  )
}

export default App
