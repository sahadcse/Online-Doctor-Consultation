import { Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
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
            // install Swiper modules
            modules={[Autoplay, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation={false}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
                delay: 3000, // Delay between slides in ms (3 seconds)
                disableOnInteraction: false, // Autoplay won't stop on user interactions
            }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            <SwiperSlide>
                <div className="card bg-base-100 w-96 shadow-xl">
                    <figure className="px-5 pt-5">
                        <Image
                            src={service1}
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-work-sans text-color-black text-2xl">
                            Online Monitoring
                        </h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-start">
                            <div className="badge badge-outline">Read More</div>

                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="card bg-base-100 w-96 shadow-xl">
                    <figure className="px-5 pt-5">
                        <Image
                            src={service2}
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-work-sans text-color-black text-2xl">
                            Holter Heart Surgery
                        </h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-start">
                            <div className="badge badge-outline">Read More</div>

                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide><div className="card bg-base-100 w-96 shadow-xl">
                <figure className="px-5 pt-5">
                    <Image
                        src={service3}
                        alt="Shoes"
                        className="rounded-xl" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title font-work-sans text-color-black text-2xl">
                        Diagnose & Research
                    </h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-start">
                        <div className="badge badge-outline">Read More</div>

                    </div>
                </div>
            </div></SwiperSlide>
            <SwiperSlide><div className="card bg-base-100 w-96 shadow-xl">
                <figure className="px-5 pt-5">
                    <Image
                        src={service2}
                        alt="Shoes"
                        className="rounded-xl" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title font-work-sans text-color-black text-2xl">
                        Online Monitoring
                    </h2>
                    <p className='font-dm-sans'>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-start">
                        <div className="badge badge-outline">Read More</div>

                    </div>
                </div>
            </div></SwiperSlide>
            <SwiperSlide>
                <div className="card bg-base-100 w-96 shadow-xl">
                    <figure className="px-5 pt-5">
                        <Image
                            src={service1}
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-work-sans text-color-black text-2xl">
                            Online Monitoring
                        </h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-start">
                            <div className="badge badge-outline">Read More</div>

                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="card bg-base-100 w-96 shadow-xl">
                    <figure className="px-5 pt-5">
                        <Image
                            src={service2}
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-work-sans text-color-black text-2xl">
                            Holter Heart Surgery
                        </h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-start">
                            <div className="badge badge-outline">Read More</div>

                        </div>
                    </div>
                </div>
            </SwiperSlide>

            ...
        </Swiper>
    );
};