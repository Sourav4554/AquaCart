import React from 'react'
import { Requirements } from '../../assets/Assets';
import { swiperConfig } from '../../Utilities/HeaderCube';
import {Slide,Fade} from 'react-awesome-reveal'
import './Header.css';
import { FaFacebook, FaInstagram} from 'react-icons/fa'; // React icons for social media
import { FaXTwitter } from "react-icons/fa6";// React icon for X (formerly Twitter)
import { VscChevronRight,VscChevronLeft } from 'react-icons/vsc';// React icons for slider navigation
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Essential Swiper styles
import 'swiper/css/effect-cube'; // For cube effect
import 'swiper/css/autoplay'; // For autoplay effect
import './Header.css';// Custom styles for Header component css file
const Header = () => {
  return (
    <div className='main-header-division'>
      <Swiper {...swiperConfig} className='mySwiper'>
        <SwiperSlide>
          <img src={Requirements.Homepage2} alt="Homepage Image 1" />
          <div className="for-details">
            <div className="for-heading">
              {/* Animations for heading text */}

              <Slide direction='left' duration={800} triggerOnce>
            <p className='head-1'>WORLD OF</p>
            </Slide>
            
        
                <Slide direction='right' duration={1000} triggerOnce>
                <p className='head-2'>AQUATIC BEAUTY</p>
                </Slide>
            </div>
            {/* Fade-in effect for button and social media icons */}
           <Fade delay={1500}   triggerOnce>
           <div className="for-button">
            <div class="button-container">
          <button class="get-started-button">Explore</button>
           </div>
            </div>
             {/* Social media icons */}
            <div className="for-socialmedia-icons">
                <FaFacebook  className='socialmedia-icons'/>
                <FaInstagram className='socialmedia-icons' />
                <FaXTwitter   className='socialmedia-icons' title="X (formerly Twitter)"/>
            </div>
           </Fade>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Requirements.Homepage1} alt="Homepage Image 2" />
          <div className="for-details-1">
          <div className="for-heading">
            <Slide direction='right' delay={500}  triggerOnce>
            <p className='head-1'>WORLD OF</p>
            </Slide>
        
                <Slide direction='right' delay={1000} triggerOnce>
                <p className='head-2'>AQUATIC ELAGANCE</p>
                </Slide>
            </div>
           <Fade delay={1000} triggerOnce >
           <div className="for-button">
            <div class="button-container">
          <button class="get-started-button">Explore</button>
           </div>
            </div>
            <div className="for-socialmedia-icons">
                <FaFacebook  className='socialmedia-icons'/>
                <FaInstagram className='socialmedia-icons' />
                <FaXTwitter   className='socialmedia-icons' />
            </div>
           </Fade>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Requirements.Homepage3} alt="Homepage Image 3" />
          <div className="for-details-2">
          <div className="for-heading">
            <Slide direction='right' delay={500} triggerOnce>
            <p className='head-1'>WORLD OF</p>
            </Slide>
        
                <Slide direction='right' delay={1000} triggerOnce>
                <p className='head-2'>AQUATIC WONDERS</p>
                </Slide>
            </div>
           <Fade delay={1500}  triggerOnce>
           <div className="for-button">
            <div class="button-container">
          <button class="get-started-button">Explore</button>
           </div>
            </div>
            <div className="for-socialmedia-icons">
                <FaFacebook  className='socialmedia-icons'/>
                <FaInstagram className='socialmedia-icons' />
                <FaXTwitter   className='socialmedia-icons' />
            </div>
           </Fade>
          </div>
        </SwiperSlide>
        
      </Swiper>
            {/* Swiper navigation buttons */}
      <div className="swiper-button-next"><VscChevronRight className='swiper-controller'/></div>
      <div className="swiper-button-prev"><VscChevronLeft className='swiper-controller'/></div>
      
    </div>
  )
}

export default Header;