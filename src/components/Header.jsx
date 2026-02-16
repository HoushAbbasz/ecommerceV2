// import Link component from react router
import { Link } from 'react-router-dom'
// Nav component and logo image 
import Nav from './Nav'
import Logo from '../assets/images/logo.png'

// functional component that recieves darkMode(boolean) and onToggleDarkMode(function) as props 
function Header({ darkMode, onToggleDarkMode }) {
  return (
    <header>
      <div className="logo-container">
        <Link to="/">
          <img src={Logo} className="logo" alt="Car King Logo" />
        </Link>
      </div>

      <h1 className="site-title">Car Part Kingdom</h1>
      {/* pass the props to the Nav */}
      <Nav darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
    </header>
  )
}

export default Header