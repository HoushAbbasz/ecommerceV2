// import the useState Hook
// useState is a Hook that lets you add state to functional components
import { useState } from 'react'

// import Link component from react router
// Link provides client-side navigation without full page reloads
import { Link } from 'react-router-dom'

// functional component that recieves darkMode(boolean) and onToggleDarkMode(function) as props 
function Nav({ darkMode, onToggleDarkMode }) {

  // useState is a Hook that returns an array [currentState, setterFunction]
  // menuOpen is set to false and setMenuOpen. used to open and close the hamburger menu  
  const [menuOpen, setMenuOpen] = useState(false)

  // event handler functions for toggling the menu, closing the menu, and darkMode 
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const handleDarkModeToggle = () => {
    onToggleDarkMode()
    closeMenu() 
  }

  return (
    <nav className={menuOpen ? 'active' : ''}>
      <button 
        className="hamburger" 
        aria-label="Toggle menu" 
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      {/* if a link is clicked, then we close the hamburger nav menu
          before we go to the clicked on page. */}
      <ul className="menu">
        <li>
          <Link to="/" onClick={closeMenu}>Home Page</Link>
        </li>
        <li>
          <Link to="/products" onClick={closeMenu}>Our Products</Link>
        </li>
        <li>
          <Link to="/contact" onClick={closeMenu}>Contact Us</Link>
        </li>
        <li>
            {/* if the dark/light mode button is clicked, handle it*/}
            <button
            id="darkModeToggle"
            className="dark-toggle"
            onClick={handleDarkModeToggle} >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </li>
      </ul>
    </nav>
  )
}

export default Nav