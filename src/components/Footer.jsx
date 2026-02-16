// import footer social media icons 
import InstagramLogo from '../assets/images/social_media/IG.png'
import FacebookLogo from '../assets/images/social_media/FB.png'
import LinkedInLogo from '../assets/images/social_media/LI.png'
import FacebookLogoDark from '../assets/images/social_media/FB_Dark.png'

// functional component and 'darkMode' prop that will be passed from parent component 
function Footer({ darkMode }) {

  // functions for opening social media links in new tab   
  const openIG = () => {
    window.open('https://www.instagram.com', '_blank')
  }

  const openFB = () => {
    window.open('https://www.facebook.com', '_blank')
  }

  const openLI = () => {
    window.open('https://www.linkedin.com', '_blank')
  }

  // JSX that describes the footer UI 
  return (
    <footer>
      <div className="footer-text">
        <p>Car Part Kingdom | Housh Abbaszadeh</p>
      </div>

      <div className="link-group">
        <button className="footer-link" onClick={openIG} aria-label="Instagram">
          <img 
            className="footer-icon" 
            src={InstagramLogo}
            alt="Instagram Logo" 
          />
        </button>

        {/* renders the 'light mode' FB logo if darkMode is false */}
        {!darkMode && (
          <button className="footer-link" onClick={openFB} aria-label="Facebook">
            <img 
              className="footer-icon" 
              src={FacebookLogo}
              alt="Facebook Logo" 
            />
          </button>
        )}
         {/* renders the 'dark mode' FB logo if darkMode is true */}
        {darkMode && (
          <button className="footer-link" onClick={openFB} aria-label="Facebook">
            <img 
              className="footer-icon" 
              src={FacebookLogoDark}
              alt="Facebook Logo Dark Mode" 
            />
          </button>
        )}

        <button className="footer-link" onClick={openLI} aria-label="LinkedIn">
          <img 
            className="footer-icon" 
            src={LinkedInLogo} 
            alt="LinkedIn Logo" 
          />
        </button>
      </div>
    </footer>
  )
}

export default Footer