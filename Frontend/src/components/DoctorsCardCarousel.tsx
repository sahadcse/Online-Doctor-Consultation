import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { Scrollbar } from 'swiper/modules';
import { A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import service1 from "../images/team-2.jpg";
import service2 from "../images/team-3.jpg";
import service3 from "../images/team-4.jpg";
import Image from 'next/image';

export const DoctorsCardCarosusel = () => {

    const doctors = [
        {
            id: 1,
            name: 'Toma Islam',
            specialty: 'Ophthalmology',
            qualifications: 'MBBS, FCPS, FRCS',
            image: service1,
        },
        {
            id: 2,
            name: 'Rezwan Rahim',
            specialty: 'Ophthalmology',
            qualifications: 'MBBS, FCPS, FRCS',
            image: service2,
        },
        {
            id: 3,
            name: 'Tazy Farzana',
            specialty: 'Research Specialty',
            qualifications: 'MBBS, FCPS, FRCS',
            image: service3,
        },
    ];

    return (
        <Swiper
            // Install Swiper modules
            modules={[Autoplay, Pagination, Scrollbar, A11y]}
            spaceBetween={30}
            slidesPerView={3}
            navigation={false}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
                delay: 3000, // Delay between slides in ms (3 seconds)
                disableOnInteraction: false, // Autoplay won't stop on user interactions
            }}
            breakpoints={{
                320: {
                    slidesPerView: 1,  // 1 slide on mobile
                    spaceBetween: 10,  // Space between slides on mobile
                },
                640: {
                    slidesPerView: 2,  // 2 slides on tablet
                    spaceBetween: 20,  // Space between slides on tablet
                },
                1024: {
                    slidesPerView: 3,  // 3 slides on desktop
                    spaceBetween: 30,  // Space between slides on desktop
                },
            }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >

            {doctors.map((doctor) => (
                <SwiperSlide key={doctor.id}>
                    <div className="card bg-white-100 w-full sm:w-96 shadow-sm">
                        <figure>
                            <Image src={doctor.image} alt={doctor.name} className="rounded-xl" />
                        </figure>
                        <div className="card-body text-start">
                            <h2 className="card-title">{doctor.name}</h2>
                            <p>{doctor.specialty}</p>
                            <p>{doctor.qualifications}</p>
                            <div className="card-actions justify-start">
                                <button className="btn bg-color-primary text-white">Appointment</button>
                                <button className="btn bg-color-primary text-white">Details</button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
