import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { Scrollbar } from 'swiper/modules';
import { A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import service1 from "../images/service-1.jpg";
import service2 from "../images/service-2.jpg";
import service3 from "../images/service-3.jpg";
import Image from 'next/image';

export const TestimonialCardCarousel = () => {
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
                    <div className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>

                    </div>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus sapiente animi reprehenderit ducimus est odit cumque assumenda mollitia omnis consequuntur.</p>
                    <div>

                        <div>
                            <h1>Rezwan Rahim</h1>
                            <p>Customer</p>
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