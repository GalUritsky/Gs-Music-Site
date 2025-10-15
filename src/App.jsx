import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
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
