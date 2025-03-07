import "animate.css/animate.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const settings = {
  className: "center",
  centerMode: false, // Disable center mode for equal spacing
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 2000,
  slidesToShow: 3,
  slidesToScroll: 3, // Scroll one slide at a time
  dots: true, // Disable dots
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        dots: false,
        slidesToScroll: 1,
      },
    },
  ],
};

 //setting for new collection
 export const settings1 = {
  className: "center",
  centerMode: false, // Disable center mode for equal spacing
  infinite: true,
  speed:500,
  slidesToShow: 4,
  slidesToScroll: 2, // Scroll one slide at a time
  dots: true, // Disable dots
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots:false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        dots:false,
        slidesToScroll: 1,
      },
    },
  ],
};