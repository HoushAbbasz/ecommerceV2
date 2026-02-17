// functional component for Promo cards on Home page, with props
function PromoCard({ title, description, image, alt }) {
  return (
    <div className="promo-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <img 
        src={image}
        className="promo-img"
        alt={alt}
      />
    </div>
  )
}

export default PromoCard