import { React, useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Slider from "../../components/slider/Slider";
import { Link } from "react-router-dom";
import home1 from "../../images/home1.jpg";
import home2 from "../../images/home2.jpg";
import home4 from "../../images/home4.jpg";
import home5 from "../../images/home5.jpg";
import home6 from "../../images/home6.jpg";
import headphone from "../../images/Headphone.jpg";
import securityCamera from "../../images/security camera.jpg";
import Kitchen from "../../images/kitchen.jpg";
import smartWatch from "../../images/smart watch.jpg";
import laptops from "../../images/laptop.jpg";
import health from "../../images/health.jpg";
import pets from "../../images/pets.jpg";
import mobiles from "../../images/mobiles.jpg";

const Home = () => {
  const images = [home1, home2, home4, home5, home6];
  const [currentImage, setCurrentImage] = useState(images[0]);
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setCurrentImage(images[randomIndex]);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [images]);

  return (
    <>
      <Navbar />
      <div className="main w-full relative top-[120px] md:top-[72px] ">
        <img src={currentImage} className="mask w-full z-1" />
        <div className=" flex absolute justify-center flex-row w-full flex-wrap px-2 top-44 md:top-56 lg:top-72 bg-[#eaeded]">
          <section className="flex justify-center sm:justify-between flex-wrap">
            <Link
              to={"/HeadphonesEarpods"}
              className="sm:w-[48%] lg:w-[24%] md:w-[32%] w-[80%] my-3 bg-white p-4"
            >
              <h3 className="text-3xl h-[71px]">Headphones & Earpods </h3>
              <div className="mt-8 mb-12">
                <img src={headphone} className="w-full" />
              </div>
              <Link href="#" className="ml-[28px] sm:ml-0">
                see more
              </Link>
            </Link>
            <Link
              to={"/LaptopsTablets"}
              className="sm:w-[48%] lg:w-[24%] md:w-[32%] w-[80%] my-3 bg-white p-4"
            >
              <h3 className="text-3xl h-[71px]">Shop Laptops & Tablets</h3>
              <div className="mt-8 mb-12">
                <img src={laptops} className="w-full" />
              </div>
              <Link href="#" className="ms-3 sm:ms-0">
                see more
              </Link>
            </Link>
            <Link
              to={"/Activitytrackerssmartwatches"}
              className="sm:w-[48%] lg:w-[24%] md:w-[32%] w-[80%] my-3 bg-white p-4"
            >
              <h3 className="text-3xl h-[71px]">
                Activity trackers & smartwatches{" "}
              </h3>
              <div className="mt-8 mb-12 ">
                <img src={smartWatch} className="w-full" />
              </div>
              <Link href="#" className="ms-[28px] sm:ms-0">
                see more
              </Link>
            </Link>
            <Link
              to={"/ShopKitchenessentials"}
              className="sm:w-[48%] lg:w-[24%] md:w-[32%] w-[80%] my-3 bg-white p-4"
            >
              <h3 className="text-3xl h-[71px]">Shop Kitchen essentials </h3>
              <div className="mt-8 mb-12">
                <img src={Kitchen} className="w-full" />
              </div>
              <Link href="#" className="ms-[28px] sm:ms-0">
                see more
              </Link>
            </Link>
            <Link
              to={"SecurityCameras"}
              className="sm:w-[48%] lg:w-[24%] md:w-[32%] w-[80%] my-3 bg-white p-4"
            >
              <h3 className="text-3xl h-[71px]">Shop Security cameras</h3>
              <div className="mt-8 mb-12">
                <img src={securityCamera} className="w-full" />
              </div>
              <Link href="#" className="ml-[28px] sm:ml-0">
                see more
              </Link>
            </Link>
            <Link
              to={"HealthPersonalCare"}
              className="sm:w-[48%] lg:w-[24%] md:w-[32%] w-[80%] my-3 bg-white p-4"
            >
              <h3 className="text-3xl h-[71px]">Health & Personal Care</h3>
              <div className="mt-8 mb-12">
                <img src={health} className="w-full" />
              </div>
              <Link href="#" className="ms-3 sm:ms-0">
                see more
              </Link>
            </Link>
            <Link
              to={"PetSupplies"}
              className="sm:w-[48%] lg:w-[24%] md:w-[32%] w-[80%] my-3 bg-white p-4"
            >
              <h3 className="text-3xl h-[71px]">Shop Pet supplies & Food </h3>
              <div className="mt-8 mb-12 ">
                <img src={pets} className="w-full" />
              </div>
              <Link href="#" className="ms-[28px] sm:ms-0">
                see more
              </Link>
            </Link>
            <Link
              to={"/mobile"}
              className="sm:w-[48%] lg:w-[24%] md:w-[32%] w-[80%] my-3 bg-white p-4"
            >
              <h3 className="text-3xl h-[71px]">Shop Smart Phones</h3>
              <div className="mt-8 mb-12">
                <img src={mobiles} className="w-full" />
              </div>
              <Link href="#" className="ms-[28px] sm:ms-0">
                see more
              </Link>
            </Link>
          </section>
          <Slider />
        </div>
      </div>
    </>
  );
};

export default Home;
