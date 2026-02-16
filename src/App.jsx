import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'

function App() {
  // create new darkMode global state for the entire App
  const [darkMode, setDarkMode] = useState(false)

  // runs once on component to check for saved dark mode preference
  useEffect(() => {

    // retrieve dark mode preference from browser's localStorage
    const isDark = localStorage.getItem('darkMode') === 'enabled'
    setDarkMode(isDark)

    // apply dark class to body element if dark mode was enabled
    if (isDark) {
      document.body.classList.add('dark')
    }
  }, [])

// toggle between light and dark mode 
const toggleDarkMode = () => {
  setDarkMode(prev => {
    // sets the current mode to the opposite of previous mode 
    const current = !prev

    // toggles the 'dark' class on the body element 
    document.body.classList.toggle('dark', current)

    // enables and disables dark mode using local storage for persistence/page refreshes
    localStorage.setItem('darkMode', current ? 'enabled' : 'disabled')

    return current
  })
}

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />} />
        <Route path="/products" element={<Products darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />} />
        <Route path="/contact" element={<Contact darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />} />
      </Routes>
    </Router>
  )
}

export default App