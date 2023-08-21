import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import mobiles from "../../images/mobiles.jpg";
import health from "../../images/health.jpg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

const Slider = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://amzone-colne.onrender.com/products?category=mobile`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  });
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={5}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      <h2>products</h2>
      {data.map((mob) => {
        return (
          <SwiperSlide key={mob.id}>
            <Link to={`mobile/${mob.id}`}>
              <img src={mob.images[0].url} className="w-48 h-64" />
            </Link>
          </SwiperSlide>
        );
      })}
      ...
    </Swiper>
  );
};
export default Slider;
