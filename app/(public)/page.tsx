import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { loadAbout } from "@/lib/about";
// import Testimonials from "@/components/Testimonials";
import { getSeetings } from "@/lib/auth";
import { getEducations } from "@/lib/education";
import { getExperiences } from "@/lib/experience";
import { getJourneys } from "@/lib/journey";
import { getProjects } from "@/lib/project";
import { getSkills } from "@/lib/skill";

const loadData = async () => {
	const [settings, skills, projects, experience, journeys, education, about] =
		await Promise.all([
			getSeetings(),
			getSkills(),
			getProjects(),
			getExperiences(),
			getJourneys(),
			getEducations(),
			loadAbout(),
		]);

	return {
		settings: settings.settings,
		skills: skills.skills || [],
		projects: projects.projects || [],
		experiences: experience.experiences || [],
		journeys: journeys.learningJourneys || [],
		education: education.educations || [],
		about: about.about,
	};
};

const HomePage = async () => {
	const {
		settings,
		skills,
		projects,
		experiences,
		journeys,
		education,
		about,
	} = await loadData();

	const profile = settings?.profile;
	const typingTexts = settings?.typingTexts;
	const resumeUrl = settings?.resume?.url || "";
	const socialLinks = settings?.socialLinks;
	const contact = settings?.contact;
	const availability = settings?.availability;

	return (
		<>
			<Hero
				profile={profile}
				typingTexts={typingTexts}
				socialLinks={socialLinks}
				resumeUrl={resumeUrl}
			/>
			<About
				journeys={journeys}
				education={education}
				about={about}
				resumeUrl={resumeUrl}
			/>
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
