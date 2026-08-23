import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
// import Testimonials from "@/components/Testimonials";
import { PROFILE, TYPING_STRINGS } from "@/data";
import { getSeetings } from "@/lib/auth";
import { getEducations } from "@/lib/education";
import { getExperiences } from "@/lib/experience";
import { getJourneys } from "@/lib/journey";
import { getProjects } from "@/lib/project";
import { getSkills } from "@/lib/skill";

const loadData = async () => {
	const [settings, skills, projects, experience, journeys, education] =
		await Promise.all([
			getSeetings(),
			getSkills(),
			getProjects(),
			getExperiences(),
			getJourneys(),
			getEducations(),
		]);

	return {
		settings,
		skills,
		projects,
		experiences: experience.experiences || [],
		journeys: journeys.learningJourneys || [],
		education: education.educations || [],
	};
};

const HomePage = async () => {
	const { settings, skills, projects, experiences, journeys, education } =
		await loadData();
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
			<About journeys={journeys} education={education} />
			<Skills skills={skills} />
			<Projects projects={projects} />
			<Experience experiences={experiences} />
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
