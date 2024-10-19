"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import DoctorImg from '../images/appoinment_img.png';
import Image from 'next/image';

// Sample data for the listbox
const people = [
    { id: 0, name: 'Select Doctor' },
    { id: 1, name: 'Wade Cooper', avatar: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?auto=format&w=256&q=80' },
    { id: 2, name: 'Arlene Mccoy', avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&w=256&q=80' },
    // More items...
];

const times = [
    { id: 0, name: 'Select Time' },
    // More items...
];

const doctors = [
    { id: 0, name: 'Select Doctor' },
    { id: 1, name: 'Dr. Wade Cooper', avatar: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?auto=format&w=256&q=80' },
    { id: 2, name: 'Dr. Arlene Mccoy', avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&w=256&q=80' },
    // More items...
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.3 },
    },
};

const Appointment = () => {
    const [selected, setSelected] = useState(people[0]);
    const [selectedTime, setSelectedTime] = useState(times[0]);
    const [selectedDoctor, setSelectedDoctor] = useState(people[0]);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            className="relative mx-auto max-w-7xl bg-[url('../images/appointment_bg.jpg')] bg-cover bg-center"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-[#00a6fbde] z-0"></div>

            {/* Content section */}
            <div className="relative py-10 lg:py-16 flex flex-col items-center">


                <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 w-full lg:w-3/4">
                    <div className="w-full lg:w-1/2 ">
                        <div className="text-center mb-8">
                            <p className="text-white text-xl font-bold">| Appointment</p>
                            <h1 className="text-white text-3xl lg:text-4xl font-semibold">
                                Apply For Free Now
                            </h1>
                        </div>
                        <div className='flex '>

                            {/* Form Section */}
                            <form className="w-full lg:w-1/2 space-y-4">
                                <input
                                    type="text"
                                    placeholder="Patient Name*"
                                    className="block w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600"
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address*"
                                    className="block w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600"
                                />

                                {/* Doctor Dropdown */}
                                <Listbox value={selected} onChange={setSelected}>
                                    <div className="relative">
                                        <ListboxButton className="relative w-full cursor-default rounded-full bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500">
                                            <span className="block truncate">{selected.name}</span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>

                                        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {people.map((person) => (
                                                <ListboxOption key={person.id} value={person} className="relative cursor-default select-none py-2 pl-3 pr-9">
                                                    <div className="flex items-center">
                                                        <span className="ml-3 block truncate">{person.name}</span>
                                                    </div>
                                                    {selected.id === person.id && (
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                            <CheckIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                                                        </span>
                                                    )}
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </div>
                                </Listbox>

                                {/* Time Dropdown */}
                                <Listbox value={selectedTime} onChange={setSelectedTime}>
                                    <div className="relative">
                                        <ListboxButton className="relative w-full cursor-default rounded-full bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500">
                                            <span className="block truncate">{selectedTime.name}</span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>

                                        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {times.map((time) => (
                                                <ListboxOption key={time.id} value={time} className="relative cursor-default select-none py-2 pl-3 pr-9">
                                                    <div className="flex items-center">
                                                        <span className="ml-3 block truncate">{time.name}</span>
                                                    </div>
                                                    {selectedTime.id === time.id && (
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                            <CheckIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                                                        </span>
                                                    )}
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </div>
                                </Listbox>


                            </form>
                            <div className="w-full lg:w-1/2 space-y-4">
                                <input
                                    type="email"
                                    placeholder="Email Address*"
                                    className="block w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600"
                                />

                                {/* Doctor Dropdown */}
                                <Listbox value={selected} onChange={setSelected}>
                                    <div className="relative">
                                        <ListboxButton className="relative w-full cursor-default rounded-full bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500">
                                            <span className="block truncate">{selected.name}</span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>

                                        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {people.map((person) => (
                                                <ListboxOption key={person.id} value={person} className="relative cursor-default select-none py-2 pl-3 pr-9">
                                                    <div className="flex items-center">
                                                        <span className="ml-3 block truncate">{person.name}</span>
                                                    </div>
                                                    {selected.id === person.id && (
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                            <CheckIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                                                        </span>
                                                    )}
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </div>
                                </Listbox>

                                {/* Time Dropdown */}
                                <Listbox value={selectedTime} onChange={setSelectedTime}>
                                    <div className="relative">
                                        <ListboxButton className="relative w-full cursor-default rounded-full bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500">
                                            <span className="block truncate">{selectedTime.name}</span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>

                                        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {times.map((time) => (
                                                <ListboxOption key={time.id} value={time} className="relative cursor-default select-none py-2 pl-3 pr-9">
                                                    <div className="flex items-center">
                                                        <span className="ml-3 block truncate">{time.name}</span>
                                                    </div>
                                                    {selectedTime.id === time.id && (
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                            <CheckIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                                                        </span>
                                                    )}
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </div>
                                </Listbox>

                                <button className="btn rounded-full bg-white text-black text-base mt-4 lg:w-48">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
                        <Image src={DoctorImg} alt="Doctor" className="max-w-full h-auto" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Appointment;
