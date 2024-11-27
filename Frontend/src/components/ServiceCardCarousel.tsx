import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import service1 from "../images/service-1.jpg";
import service2 from "../images/service-2.jpg";
import service3 from "../images/service-3.jpg";
import Image from 'next/image';

export const ServiceCardCarousel = () => {
    return (
        <Swiper
            modules={[Autoplay, Pagination, Scrollbar, A11y]}
            spaceBetween={20} // Adjust space between slides for mobile
            slidesPerView={1} // Default to showing 1 slide
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            breakpoints={{
                // Adjust the number of slides visible based on screen width
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
            }}
        >
            {[service1, service2, service3, service2, service1].map((image, index) => (
                <SwiperSlide key={index}>
                    <div className="card bg-base-100 shadow-xl mx-auto max-w-sm">
                        <figure className="px-5 pt-5">
                            <Image
                                src={image}
                                alt="Service"
                                className="rounded-xl"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-work-sans text-color-black text-xl md:text-2xl">
                                Service Title {index + 1}
                            </h2>
                            <p className="font-dm-sans text-sm md:text-base">
                                Sample description text for the service. Customize as needed.
                            </p>
                            <div className="card-actions justify-start">
                                <div className="badge badge-outline">Read More</div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
