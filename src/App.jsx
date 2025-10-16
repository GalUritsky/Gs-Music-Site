import { useState } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Credits from './pages/Credits'
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <main style={{ paddingTop: '6rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/credits" element={<Credits />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
