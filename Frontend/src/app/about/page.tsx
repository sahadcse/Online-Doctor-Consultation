import Link from "next/link";
import Image from "next/image";
import styles from "./about.module.css"; // Importing CSS module
import ImgFile from "../../images/breadcrumb_bg.jpg";
import AboutUs from "@/components/AboutUs";
import Appointment from "@/components/Appointment";
import WorkingProcess from "@/components/WorkingProcess";
import Doctors from "@/components/Doctors";
import EmergencyContact from "@/components/EmergencyContact";

const AboutPage = () => {
    return (
        <div>
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
                            <Link href="/">Home</Link>
                        </li>
                        <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-1">
                                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                            <Link href="">Our Team</Link>
                        </li>
                    </ul>
                    <h1 className="text-4xl font-bold text-black mt-4">Our Team</h1>
                </div>

            </div>

            <AboutUs />
            <Appointment />
            <WorkingProcess />
            <Doctors />
            <EmergencyContact />
        </div>
    );
};

export default AboutPage;
