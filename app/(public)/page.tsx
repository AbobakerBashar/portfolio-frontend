import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
// import Testimonials from "@/components/Testimonials";
import { PROFILE, TYPING_STRINGS } from "@/data";
import { getSeetings } from "@/lib/auth";
import { getProjects } from "@/lib/project";
import { getSkills } from "@/lib/skill";

const loadData = async () => {
	const [settings, skills, projects] = await Promise.all([
		getSeetings(),
		getSkills(),
		getProjects(),
	]);

	return { settings, skills, projects };
};

const HomePage = async () => {
	const { settings, skills, projects } = await loadData();
	const profile = settings.settings?.profile || PROFILE;
	const typingTexts = settings.settings?.typingTexts || TYPING_STRINGS;
	const resumeUrl = settings?.settings?.resume?.url || "";
	const socialLinks = settings?.settings?.socialLinks;
	const contact = settings?.settings?.contact;
	const availability = settings?.settings?.availability;

	return (
		<>
			<Hero
				profile={profile}
				typingTexts={typingTexts}
				socialLinks={socialLinks}
				resumeUrl={resumeUrl}
			/>
			<About />
			<Skills skills={skills} />
			<Projects projects={projects} />
			<Experience />
			{/* <Testimonials /> */}
			<Contact
				contact={contact}
				socialLinks={socialLinks}
				availability={availability}
			/>
		</>
	);
};

export default HomePage;
