"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

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
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            className="relative sm:py-28 mx-auto max-w-7xl bg-[url('../images/appointment_bg.jpg')] bg-cover bg-center min-h-screen"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-[#00a6fbde] z-0"></div>

            {/* Content section */}
            <div className="relative z-10 py-20 lg:px-8 px-6">
                <p className="text-start text-white py-4 text-xl font-bold">
                    | Appointment
                </p>
                <h1 className="text-start text-white text-4xl lg:text-5xl font-semibold">
                    Apply For Free Now
                </h1>

               <div className='flex gap-5'>
               <div className='w-full lg:w-1/2'>
                    {/* Form Section */}
                    <form className="space-y-4 mt-6">
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
                            <div className="relative mt-2">
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
                        <Listbox value={selected} onChange={setSelected}>
                            <div className="relative mt-2">
                                <ListboxButton className="relative w-full cursor-default rounded-full bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500">
                                    <span className="block truncate">{selected.name}</span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </ListboxButton>

                                <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-full bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {times.map((person) => (
                                        <ListboxOption key={person.id} value={person} className="relative cursor-default select-none py-2 pl-3 pr-9">
                                            <div className="flex items-center">
                                                <span className="ml-3 block truncate">{person.name}</span>
                                            </div>
                                            {selectedTime.id === selectedTime.id && (
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
                </div>

                <div className='w-full lg:w-1/2'>
                    {/* Form Section */}
                    <form className="space-y-4 mt-6">
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
                            <div className="relative mt-2">
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
                        <Listbox value={selected} onChange={setSelected}>
                            <div className="relative mt-2">
                                <ListboxButton className="relative w-full cursor-default rounded-full bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500">
                                    <span className="block truncate">{selected.name}</span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </ListboxButton>

                                <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-full bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {times.map((person) => (
                                        <ListboxOption key={person.id} value={person} className="relative cursor-default select-none py-2 pl-3 pr-9">
                                            <div className="flex items-center">
                                                <span className="ml-3 block truncate">{person.name}</span>
                                            </div>
                                            {selectedTime.id === selectedTime.id && (
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
                </div>
               </div>

            </div>
        </motion.div>
    );
};

export default Appointment;
