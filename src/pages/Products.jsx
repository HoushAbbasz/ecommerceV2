// import Hooks
import { useState, useEffect } from 'react'
// import components 
import Header from '../components/Header'
import Footer from '../components/Footer'

const API_URL = 'http://localhost:5000/api';

function Products({ darkMode, onToggleDarkMode }) {
  // store products from backend
  const [products, setProducts] = useState([])
  
  // filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [rating, setRating] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('')
  
  // ui states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showBackToTop, setShowBackToTop] = useState(false)

  // fetch products on component mount (after it's first rendered). 
  // without this, the page will load empty 
  useEffect(() => {
    fetchProducts()
  }, [])

  // scroll detection for back to top button when scrolling past 300px 
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      // build query string using URLSearchParams for url encoding
      // sends filters as query parameters: ?search=battery&category=Engine+Oil
      const params = new URLSearchParams()
      
      // only append parameters if they have values, won't send empty filters
      if (searchTerm) params.append('search', searchTerm)
      if (category) params.append('category', category)
      if (minPrice) params.append('minPrice', minPrice)
      if (maxPrice) params.append('maxPrice', maxPrice)
      if (rating) params.append('minRating', rating)
      if (sortBy) params.append('sortBy', sortBy)

      // make HTTP request to backend API endpoint to get products that
      // match the params  
      const response = await fetch(`${API_URL}/products?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      // parse string data to JSON 
      const data = await response.json()
      setProducts(data)

    } catch (err) {
      console.error('Error fetching products:', err)
      setError('Failed to load products. Please make sure the server is running.')
    } finally {
      setLoading(false)
    }
  }

  // clear all filters and fetch all products
  const handleClearFilters = () => {
    setSearchTerm('')
    setMinPrice('')
    setMaxPrice('')
    setRating('')
    setCategory('')
    setSortBy('')

    // fetch all products after clearing
    fetchProducts()
  }

  // render stars for rating
  const renderStars = (rating) => {
    const fullStars = '★★★★★'
    const emptyStars = '☆☆☆☆☆'
    // round rating to nearest integer (3.7 becomes 4)
    const roundedRating = Math.round(rating)
    // slice appropriate number of full and empty stars
    return fullStars.slice(0, roundedRating) + emptyStars.slice(0, 5 - roundedRating)
  }


  return (
    <>
      <Header darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      
      <main className="product-page">
        <h2>Our Products</h2>
        <h3 id="filter-heading">Product Filters</h3>
        
        <section className="filters">
          <div className="filter-group">
            <label htmlFor="searchInput">Search products</label>
            <input
              type="text"
              id="searchInput"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="categoryFilter">Filter by Category</label>
            <select
              id="categoryFilter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Car Battery">Car Battery</option>
              <option value="Jumper Cables">Jumper Cables</option>
              <option value="Engine Oil">Engine Oil</option>
              <option value="Tires">Tires</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="maxPrice">Maximum Price</label>
            <input
              type="number"
              id="maxPrice"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="ratingFilter">Filter by Rating</label>
            <select
              id="ratingFilter"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="minPrice">Minimum Price</label>
            <input
              type="number"
              id="minPrice"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="sortSelect">Sort Products</label>
            <select
              id="sortSelect"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="price-asc">Price Low-High</option>
              <option value="price-desc">Price High-Low</option>
              <option value="rating-asc">Rating Low-High</option>
              <option value="rating-desc">Rating High-Low</option>
            </select>
          </div>

          <div className="filter-actions">
            {/* onClick directly calls fetchProducts with current filter values */}
            <button className="apply-filters" onClick={fetchProducts}>
              Search
            </button>
            <button className="clear-filters" onClick={handleClearFilters}>
              Clear All
            </button>
          </div>
        </section>

        <section id="productGrid" className="product-grid">
          {loading ? (
            <p className="loading">Loading products...</p>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={fetchProducts}>Retry</button>
            </div>
          ) : products.length === 0 ? (
            <p className="no-products">No products found matching your criteria.</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-item">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">${parseFloat(product.price).toFixed(2)}</p>
                <p className="description">{product.description}</p>
                <div className="rating">
                  <span>{renderStars(product.rating)}</span>
                  <p className="rating-value">({parseFloat(product.rating).toFixed(1)})</p>
                </div>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            ))
          )}
        </section>
      </main>

      <button 
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>

      <Footer darkMode={darkMode} />
    </>
  )
}

export default Products