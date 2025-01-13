import React from "react";
import "./Promotion.css"; //css file of promotion component
import "animate.css"; //for animations
import ScrollAnimatiion from "react-animate-on-scroll"; // used for animation at the time of scroll
import { useNavigate } from "react-router-dom";
const Promotion = () => {
const Navigate=useNavigate();
  return (
    <div className="division">
      {/*container 1 */}
      <div className="container">
        <div className="div-for-details">
          <ScrollAnimatiion animateIn="animate__fadeInBottomRight" animateOnce>
            <h3 className="head1">TRANSFORM YOUR HOME WITH</h3>
            <h3 className="head2">AQUATIC ELEGANCE</h3>
            <p>
              Discover the serene beauty of aquatic life with our vibrant and
              exotic collections. Experience a unique charm that captivates and
              inspires.
            </p>
            <div className="button-container-2">
              <button className="get-started-button-2" onClick={()=>Navigate('/collections')}>Explore</button>
            </div>
          </ScrollAnimatiion>
        </div>
      </div>
      {/*container 2*/}
      <div className="container-1">
        <div className="div-for-details-1">
          <ScrollAnimatiion animateIn="animate__fadeInBottomRight" animateOnce>
            <h3 className="head1-1">TRANSFORM YOUR HOME WITH</h3>
            <h3 className="head2-1">AQUATIC WONDERS</h3>
            <p>
              Discover the serene beauty of aquatic life with our vibrant and
              exotic collections. Experience a unique charm that captivates and
              inspires.
            </p>
            <div className="button-container-3">
              <button className="get-started-button-2" onClick={()=>Navigate('/collections')}>Explore</button>
            </div>
          </ScrollAnimatiion>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
