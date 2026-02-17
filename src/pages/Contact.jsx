// import useState Hook 
import { useState } from 'react'
// import header and footer component
import Header from '../components/Header'
import Footer from '../components/Footer'

// functional component Contact page that takes darkMode(bool) and onToggleDarkMode(function)
function Contact({ darkMode, onToggleDarkMode }) {

  // create formData state using Object and setFormData setter function
  const [formData, setFormData] = useState({
    firstName: '',
    middleInitial: '',
    lastName: '',
    email: '',
    phone: '',
    vehicle: '',
    order: '',
    message: ''
  })

  // create status state using Object and setStatus setter function
  const [status, setStatus] = useState({ message: '', type: '' })

  // allows letters, apostrophes, spaces, hyphens
  const namePattern = /^[A-Za-z' -]+$/
  // single letter or empty string
  const mInitPattern = /^[A-Za-z]?$/
  // xxx@xxx.xxx
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // handles input change for all fields, using e for event
  const handleChange = (e) => {
    // get the name and value of the field changed 
    const { name, value } = e.target

    // copy all previous form information and add name/value pair to form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // clear status when user starts typing
    if (status.message) {
      setStatus({ message: '', type: '' })
    }
  }

  // handle submit, using e for event 
  const handleSubmit = (e) => {

    // stops pages from loading on form submit 
    e.preventDefault()
    
    let valid = true
    let errorMessage = ''

    // get info from form data 
    const { firstName, middleInitial, lastName, email, message } = formData

    // validate first name
    if (firstName.trim().length < 2 || !namePattern.test(firstName.trim())) {
      valid = false
      errorMessage = "First name must be at least 2 characters long, only containing english letters, hyphens, or apostrophes"
    }

    // validate middle initial
    if (valid && middleInitial.trim().length > 1 || !mInitPattern.test(middleInitial.trim())) {
      valid = false
      errorMessage = "Middle initial must be at most one letter long, no other characters are allowed."
    }

    // validate last name
    if (valid && (lastName.trim().length < 2 || !namePattern.test(lastName.trim()))) {
      valid = false
      errorMessage = "Last name must be at least 2 characters long, only containing english letters, hyphens, or apostrophes"
    }

    // validate email
    if (valid && !emailPattern.test(email.trim())) {
      valid = false
      errorMessage = "Please enter a valid email address."
    }

    // validate message
    if (valid && message.trim().length < 10) {
      valid = false
      errorMessage = "Your message must be at least 10 characters long."
    }

    if (valid) {
      // reset form and update status if valid 
      setStatus({ message: 'Form submitted successfully!', type: 'success' })
      setFormData({
        firstName: '',
        middleInitial: '',
        lastName: '',
        email: '',
        phone: '',
        vehicle: '',
        order: '',
        message: ''
      })

      // clear success message after 10 seconds
      setTimeout(() => {
          setStatus({ message: '', type: '' })
      }, 10000)

    } else {
      // send error message if invalid 
      setStatus({ message: errorMessage, type: 'error' })
    }
  }

  return (
    <>
      <Header darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      
      <main className="main-content">
        <h1>Contact Us!</h1>

        <form 
          id="contactForm" 
          className="contact-form" 
          noValidate
          // handle submit 
          onSubmit={handleSubmit}
        >
          <div className="name-row">
            <div className="name-group">
              <label htmlFor="firstName">First Name*</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                placeholder="Enter your first name"
                value={formData.firstName}
                // handle change
                onChange={handleChange}
              />
            </div>

            <div className="middle-group">
              <label htmlFor="middleInitial">Middle Initial</label>
              <input
                type="text"
                id="middleInitial"
                name="middleInitial"
                maxLength="1"
                placeholder="M.I."
                value={formData.middleInitial}
                // handle change
                onChange={handleChange}
              />
            </div>
          </div>

          <label htmlFor="lastName">Last Name*</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            placeholder="Enter your last name"
            value={formData.lastName}
            // handle change
            onChange={handleChange}
          />

          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            value={formData.email}
            // handle change
            onChange={handleChange}
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Optional"
            value={formData.phone}
            // handle change
            onChange={handleChange}
          />

          <label htmlFor="vehicle">Vehicle Details</label>
          <input
            type="text"
            id="vehicle"
            name="vehicle"
            placeholder="e.g. 2015 Ford F-150 3.5L (Optional)"
            value={formData.vehicle}
            // handle change
            onChange={handleChange}
          />

          <label htmlFor="order">Order Number (if applicable)</label>
          <input
            type="text"
            id="order"
            name="order"
            placeholder="Enter your order number"
            value={formData.order}
            // handle change
            onChange={handleChange}
          />

          <label htmlFor="message">Your Message *</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            placeholder="How can we help you?"
            value={formData.message}
            // handle change
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">Submit</button>

          {status.message && (
            <p
              id="formStatus"
              className="status"
              style={{ color: status.type === 'success' ? 'green' : 'red' }}
            >
              {status.message}
            </p>
          )}
        </form>
      </main>

      <Footer darkMode={darkMode} />
    </>
  )
}

export default Contact