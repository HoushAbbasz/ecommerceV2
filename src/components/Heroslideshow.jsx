// import Hooks from react 
import { useState, useEffect } from 'react';

// import images for slide show
import Tires from '../assets/images/slides/slide1.avif';
import JumperCables from '../assets/images/slides/slide2.jpg';
import Oil from '../assets/images/slides/slide3.jpeg';
import Battery from '../assets/images/slides/slide4.jpg';
import Parts from '../assets/images/slides/slide5.jpg';

// array of objects that contain image and text
const slides = [
  {
    title: "tire slideshow image",
    image: Tires,
    text: "The highest quality tires!"
  },
  {
    title: "jumper cables slideshow image",
    image: JumperCables,
    text: "The best Jumper Cables!"
  },
  {
    title: "oil slideshow image",
    image: Oil,
    text: "The most premium Engine Oil!"
  },
  {
    title: "battery slideshow image",
    image: Battery,
    text: "Long lasting battery life!"
  },
  {
    title: "generic car parts slideshow image",
    image: Parts,
    text: "More products coming soon!"
  },
];

// functional component
function HeroSlideshow() {
  // create a currentSlide state and initial it to 0 with setCurrentSlide as setter   
  const [currentSlide, setCurrentSlide] = useState(0);

  // create a isAutoPlaying state and initial it to true with setIsAutoPlaying as setter
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // effect for auto playing slides
  useEffect(() => {
    // end if not autoplaying
    if (!isAutoPlaying) return;

    // changes the slide to the next slide every 3 seconds, uses interval as click handler
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    // clear the old interval before rerunning the useEffect 
    // so that two intervals don't run at the same time 
    return () => clearInterval(interval);
    // will perform useEffect if isAutoPlaying is true
  }, [isAutoPlaying]);

  // takes the user to a new slide, sets auto play to false   
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);

    // resume auto-play after 10 seconds of manual navigation
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // sends user to the next slide    
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // sends user to previous slide    
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  
  return (
    <div className="hero-slideshow">
      <div className="slideshow-container">

        {/* 
          loop through slides array and render each slide.
          only the slide whose index matches currentSlide
          will receive the "active" class and be visible.
        */}
        {slides.map((slide, index) => (
          <div
            /*gives React a unique identifier for each rendered
            element so it can efficiently track and update them during re-renders.
            useful for add/removing slides*/
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.title} />
            <div className="slide-content">
              <p>{slide.text}</p>
            </div>
          </div>
        ))}

        {/* next and previous buttons */}
        <button className="slide-btn prev-btn" onClick={prevSlide} aria-label="Previous slide">
          ‹
        </button>
        <button className="slide-btn next-btn" onClick={nextSlide} aria-label="Next slide">
          ›
        </button>
      </div>

      {/* 
        dot indicators represent each slide visually.
        clicking a dot jumps directly to that slide.
      */}
      <div className="slide-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlideshow;