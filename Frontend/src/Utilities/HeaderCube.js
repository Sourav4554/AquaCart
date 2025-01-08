import { EffectCube ,Pagination, Navigation,Autoplay} from "swiper/modules";
import 'swiper/css'; // Essential Swiper styles
import 'swiper/css/effect-cube'; // For cube effect
import 'swiper/css/effect-coverflow';//for overflow effect
import 'swiper/css/pagination';//for pagination
import 'swiper/css/autoplay'; // For autoplay effect
export const swiperConfig = {
  effect: "cube",
  grabCursor: false,
  loop: true,
  pagination: false,
  speed: 2000,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  navigation: {
    nextEl: '.swiper-button-next', // Class for next button
    prevEl: '.swiper-button-prev', // Class for previous button
  },
  autoplay:{
    delay:3000,
    disableOnInteraction: false,
  },
  noSwiping: true, 
  modules: [EffectCube,Pagination,Navigation,Autoplay],
};
