'use client'

import AboutImg1 from "../images/about-img1.jpg"
import AboutImg2 from "../images/about_img2.jpg"
import Image from 'next/image'
import { motion } from 'framer-motion'


const AboutUs = () => {
    return (
        <div className="px-4 lg:px-64 py-8">
            <motion.div className="flex flex-col lg:flex-row items-center justify-between min-h-screen space-y-6 lg:space-y-0 lg:space-x-12" initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}>

                <motion.div
                    className="relative w-full lg:w-1/2 flex justify-center lg:justify-start"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }} >
                    <Image src={AboutImg1} className="w-full lg:w-1/2 rounded-3xl" alt="About Us Img" />
                    <Image src={AboutImg2} className="absolute right-8 top-48 w-3/4 sm:w-1/2 lg:right-32 lg:top-24 lg:w-1/2 rounded-3xl" alt="About Us Img" />
                </motion.div>

                <motion.div className="w-full lg:w-1/2 text-center lg:text-left px-4"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <p className="py-4 text-xl font-dm-sans font-bold text-color-primary leading-tight">
                        | About Us
                    </p>
                    <h1 className="text-4xl lg:text-5xl font-semibold font-work-sans text-color-black leading-tight">
                        The Great Place of Medical Hospital Center.
                    </h1>
                    <p className="py-4 text-lg lg:text-xl font-dm-sans leading-relaxed">
                        At Online Doctor, we are committed to delivering top-notch healthcare services with a patient-first approach. Our dedicated team of experienced professionals strives to provide personalized and compassionate care to every individual who walks through our doors. With state-of-the-art facilities and a comprehensive range of medical services, we ensure our patients receive the highest standard of care.
                    </p>
                    <motion.button className="btn rounded-full bg-color-primary text-color-white text-base mt-4 lg:w-48"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Discover More
                    </motion.button>
                </motion.div>
            </motion.div>
        </div >


    )
}

export default AboutUs;