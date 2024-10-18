import AboutUs from "@/components/AboutUs";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Service from "@/components/Service";
import WorkingProcess from "@/components/WorkingProcess";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutUs />
      <Service />
      <FAQ />
      <WorkingProcess />
    </div>
  );
}
