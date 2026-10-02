import { About } from "@/app/_components/home/About";
import { Contact } from "@/app/_components/home/Contact";
import { Faq } from "@/app/_components/home/Faq";
import { Hero } from "@/app/_components/home/Hero";
import { Proof } from "@/app/_components/home/Proof";
import { Services } from "@/app/_components/home/Services";
import { Work } from "@/app/_components/home/Work";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Proof />
      <Work />
      <Services />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
