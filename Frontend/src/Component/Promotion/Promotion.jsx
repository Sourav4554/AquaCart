import React from "react";
import "./Promotion.css"; //css file of promotion component
import "animate.css"; //for animations
import ScrollAnimatiion from "react-animate-on-scroll"; // used for animation at the time of scroll
const Promotion = () => {
  return (
    <div class="division">
      {/*container 1 */}
      <div class="container">
        <div className="div-for-details">
          <ScrollAnimatiion animateIn="animate__fadeInBottomRight" animateOnce>
            <h3 className="head1">TRANSFORM YOUR HOME WITH</h3>
            <h3 className="head2">AQUATIC ELEGANCE</h3>
            <p>
              Discover the serene beauty of aquatic life with our vibrant and
              exotic collections. Experience a unique charm that captivates and
              inspires.
            </p>
            <div class="button-container-2">
              <button class="get-started-button-2">Explore</button>
            </div>
          </ScrollAnimatiion>
        </div>
      </div>
      {/*container 2*/}
      <div class="container-1">
        <div className="div-for-details-1">
          <ScrollAnimatiion animateIn="animate__fadeInBottomRight" animateOnce>
            <h3 className="head1-1">TRANSFORM YOUR HOME WITH</h3>
            <h3 className="head2-1">AQUATIC WONDERS</h3>
            <p>
              Discover the serene beauty of aquatic life with our vibrant and
              exotic collections. Experience a unique charm that captivates and
              inspires.
            </p>
            <div class="button-container-3">
              <button class="get-started-button-2">Explore</button>
            </div>
          </ScrollAnimatiion>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
