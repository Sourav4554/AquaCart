import React from 'react'
import { Requirements } from '../../assets/Assets'
import { FaFacebook, FaInstagram} from 'react-icons/fa'; //react icons
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={Requirements.logo} alt="" />
                <div className="footer-social-media-icons">
                   <FaFacebook  className='social-media-icon'/>
                   <FaInstagram className='social-media-icon' />
                   <FaXTwitter  className='social-media-icon' />
                </div>
           
            </div>
            <div className="footer-content-center">
                <h2>AQUA CART</h2>
                <ul>
                <Link className='a' to='/'>Home</Link>
                <Link className='a' to='/'>About Us</Link>
                <Link className='a' to='/collections'>Collections</Link>
                <Link className='a'>Contact US</Link>
                </ul>
            </div>
            <div className="footer-content-right">
                
                <ul>
                    <li>+1-212-456-7899</li>
                    <li>Contact-aquacart@gmail.com</li>
                     <li>koottuvelli,Kanjhikkuzhi</li>
                     <li>3456678</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2025 @ ALL Right Reserved Provided by | Niggers</p>
    </div>
  )
}

export default Footer