import React from 'react'
import './AiPromotion.css'//css file for style the aipromotion component
import ScrollAnimatiion from 'react-animate-on-scroll' // used for animation at the time of scroll
import 'animate.css'//css file for animation
import { Requirements } from '../../assets/Assets'//import images from assets file
const AiPromotion = () => {
  return (
    <div className='main-container-for-ai'>
      {/*container for image section */}
    <div className='sub-container-1'>
        <div className='empty-div'>
     
        </div>
        <div className='first-img-div'>
        <img src={Requirements.aipic2} alt="" />
        </div>
        <div className='second-img-div'>
        <img src={Requirements.aipic1} alt="" />
        </div>
        <div className='third-img-div'>
        <img src={Requirements.aipic3} alt="" />
        </div>
    </div>
    {/*container for details */}
    <div className='sub-container-2'>
       <div className='sub-container-2-contents'>
       <ScrollAnimatiion animateIn='animate__fadeIn' delay={500} animateOnce>
       <div className="for-headings">
       <h2>WE PROVIDE</h2>
        <h2>COMPLETE AQUATIC</h2>
        <h2>SOLUTION</h2>
       </div>
       </ScrollAnimatiion>
    <div className="description-box">
 <ScrollAnimatiion animateIn='animate__fadeInRight' delay={500} animateOnce>
 <h3>INSTANCE ASSISTANT</h3>
  <p>Get instant guidance on maintaining a healthy aquatic environment. Your reliable companion for every step of fish care.</p>
 </ScrollAnimatiion>
<ScrollAnimatiion animateIn='animate__fadeInRight' delay={600} animateOnce>

  <h3>SMART FISH CARE SUPPORT</h3>
  <p>Access tailored advice for feeding, water quality, and tank setup, ensuring your aquatic pets thrive effortlessly.</p>
</ScrollAnimatiion>
<ScrollAnimatiion animateIn='animate__fadeInRight' delay={700} animateOnce>

  <h3>SMART TROUBLE SHOOTING</h3>
  <p>Effortlessly handle user queries with real-time solutions, from product recommendations to technical support, ensuring a seamless experience</p>
</ScrollAnimatiion>
</div>

<div class="button-container-4">
          <button class="get-started-button-4">AQUA AI</button>
           </div>


       </div>
    </div>
    </div>
  )
}

export default AiPromotion