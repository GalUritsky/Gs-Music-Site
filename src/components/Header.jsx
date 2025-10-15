import React from 'react'

export default function Header() {
  return (
    <header className="bg-black text-white p-6 flex justify-between items-center fixed w-full top-0 z-50 shadow-md">
      <h1 className="text-xl font-bold">G's Music</h1>
      <nav className="space-x-6">
        <a href="#hero" className="hover:text-gray-400">Home</a>
        <a href="#about" className="hover:text-gray-400">About</a>
        <a href="#credits" className="hover:text-gray-400">Credits</a>
      </nav>
    </header>
  )
}
