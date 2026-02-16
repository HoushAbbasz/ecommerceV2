// import components 
import Header from '../components/Header'
import Footer from '../components/Footer'
import PromoCard from '../components/PromoCard'
import HeroSlideshow from '../components/Heroslideshow'
// import link for the CTA products button 
import { Link } from 'react-router-dom'

// import promo images 
// will turn promos into components if time allows
import Promo from '../assets/images/promos/promo.jpg'
import Promo1 from '../assets/images/promos/promo1.png'
import Promo2 from '../assets/images/promos/promo2.jpg'
import Promo3 from '../assets/images/promos/promo3.jpg'

// functional component that takes darkMode and onToggleDarkMode as props 
function Home({ darkMode, onToggleDarkMode }) {
  return (
    <>
      <Header darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      
      <HeroSlideshow />
      
      <div className="about">
        <h2>Our car parts are fit for Royalty!</h2>
        
        <button className="browse-products">
          <Link className="cta-btn" to="/products">
            Browse Products
          </Link>
        </button>
      </div>

      <section className="promotions">
        <PromoCard
          title="Seasonal Discounts"
          description="Save big during our limited-time seasonal sales."
          image={Promo}
          alt="Holiday promo image"
        />

        <PromoCard
          title="Free Shipping"
          description="Free shipping on all orders over $99."
          image={Promo1}
          alt="Free shipping promo"
        />

        <PromoCard
          title="Best-Selling Parts"
          description="Our most-trusted and top-rated parts."
          image={Promo2}
          alt="Best selling parts"
        />

        <PromoCard
          title="New Arrivals"
          description="Fresh inventory added every week."
          image={Promo3}
          alt="New arrivals promo"
        />

      </section>

      <Footer darkMode={darkMode} />
    </>
  )
}

export default Home