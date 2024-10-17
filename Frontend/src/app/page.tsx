import AboutUs from "@/components/AboutUs";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Service from "@/components/Service";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutUs />
      <Service />
      <FAQ />
    </div>
  );
}
