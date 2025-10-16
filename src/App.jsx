import { useState } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Releases from './pages/Releases'
import Catalouge from './pages/Catalouge'
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <main style={{ paddingTop: '6rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/catalouge" element={<Catalouge />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
