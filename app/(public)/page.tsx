"use client";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";

const HomePage = () => {
	return (
		<>
			<Hero />
			<About />
			<Skills />
			<Projects />
			<Experience />
			<Testimonials />
			<Contact />
		</>
	);
};

export default HomePage;
