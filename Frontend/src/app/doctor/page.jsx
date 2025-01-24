import Link from "next/link";
import Image from "next/image";
import styles from "./doctor.module.css"; // Importing CSS module
import ImgFile from "../../images/breadcrumb_bg.jpg";
import service1 from "../../images/team-2.jpg";
import service2 from "../../images/team-3.jpg";
import service3 from "../../images/team-4.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DoctorsPage = () => {

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
        {
            id: 4,
            name: 'Rezwan Rahim',
            specialty: 'Ophthalmology',
            qualifications: 'MBBS, FCPS, FRCS',
            image: service2,
        },
    ];

    return (
        <>
            <Navbar />
            <div className={`${styles.ourTeamTopContainer} relative`}>
                <Image
                    src={ImgFile}
                    alt="Breadcrumb background"
                    layout="fill"
                    objectFit="cover"
                    quality={75}
                    className="absolute z-[-1]"
                />
                <div className={`${styles.containerEffect} absolute inset-0`} />
                <div className="absolute inset-0 flex flex-col justify-center items-center h-full">
                    <ul className="flex items-center space-x-4 text-black">
                        <li>
                            <Link href="/about">Doctors</Link>
                        </li>
                        <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-1">
                                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                            <Link href="">Our Doctors</Link>
                        </li>
                    </ul>
                    <h1 className="text-4xl font-bold text-black mt-4">Our Doctors</h1>
                </div>

            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6'>
                {doctors.map((doctor) => (

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
                ))}
            </div>

            <Footer />
        </>

    );
};


export default DoctorsPage;