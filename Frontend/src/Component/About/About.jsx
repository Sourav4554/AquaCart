import React from 'react'
import './About.css' // Import CSS styling for this component
import { Requirements } from '../../assets/Assets' // Import assets (images)
import ScrollAnimation from 'react-animate-on-scroll';// Import animation library for scroll animations
const About = () => {
  return (
    <div className='main-container'>
      <div className="container-for-content">
        {/*scroll animation with fade up */}
        <ScrollAnimation animateIn='animate__fadeInUp' animateOnce>
        <h3>ABOUT US</h3>
        <p>
        Welcome to Aqua Market, your trusted online destination for purchasing a wide variety
         of ornamental fish. We bring the beauty of aquatic life right to your doorstep, ensuring
          a seamless and enjoyable experience for all fish enthusiasts.
          At Aqua Market, we are passionate about offering high-quality ornamental fish from local
           breeders and suppliers, ensuring that each fish is healthy, vibrant, and ready for your aquarium.
        </p>
        <div class="button-container-1">
          <button class="get-started-button-1">Explore</button>
           </div>
        </ScrollAnimation>
      </div>
      <div className="container-for-images">
        <div className='section-1'>
            
        </div>
        <ScrollAnimation animateIn='animate__fadeInUp'  animateOnce >
        <div className='section-2'>
        <img src={Requirements.aboutimage1} alt="" /> 
        </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn='animate__fadeInUp' animateOnce>
        <div className='section-3'>
           <img src={Requirements.aboutimage2} alt="" /> 
        </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}

export default About