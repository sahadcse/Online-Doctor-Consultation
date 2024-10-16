'use client'

import Navbar from './Navbar'
import BannerImg from "../images/banner_img.png"
import Image from 'next/image'


const Hero = () => {
  return (
    <div className="bg-[url('../images/banner_bg.jpg')]">
      <div className="flex flex-col-reverse lg:flex-row-reverse items-center justify-between min-h-screen px-4 lg:px-64 space-y-6 lg:space-y-0 lg:space-x-12">
        <Image src={BannerImg} className="w-full lg:w-1/2" alt="Banner Img" />

        <div className="w-full lg:w-1/2 text-center lg:text-left px-4">
          <p className="py-4 text-xl font-dm-sans font-bold text-color-primary leading-tight">
            | Welcome to Online Doctor
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold font-work-sans text-color-black leading-tight">
            Complete Health Solution Online Doctor
          </h1>
          <p className="py-4 text-lg lg:text-xl font-dm-sans leading-relaxed">
            We are dedicated to providing the best care for your well-being. At Online Doctor, we ensure you receive the attention and support you deserve on your journey to better health.
          </p>
          <button className="btn rounded-full bg-color-primary text-color-white text-base mt-4 lg:w-48">
            Meet A Doctor
          </button>
        </div>
      </div>
    </div>

  )
}

export default Hero;