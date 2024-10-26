'use client'

import { ServiceCardCarousel } from "./ServiceCardCarousel";
import { TestimonialCardCarousel } from "./TestimonialsCardCarousel";

const Testimonial = () => {

    return (
        <div className="" >
            <div className="px-4 lg:px-64 py-24" style={{ backgroundColor: "#ffffff9c" }}>
                <div className="text-center">
                    <p className="py-4 text-xl font-dm-sans font-bold text-color-primary leading-tight">
                        | Testimonials
                    </p>
                    <h1 className="text-4xl lg:text-5xl font-semibold font-work-sans text-color-black leading-tight">
                        What Our Client Says
                    </h1>
                </div>

                <div className="my-12">
                    <TestimonialCardCarousel />
                </div>
            </div>
        </div >


    )
}

export default Testimonial;