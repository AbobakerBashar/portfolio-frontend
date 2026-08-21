export interface ExperienceEntry {
	id: string;
	company: string;
	position: string;
	period: string;
	type: string;
	location: string;
	description: string;
	responsibilities: string[];
	tech: string[];
	color: string;
}

export interface EducationEntry {
	id: string;
	school: string;
	degree: string;
	period: string;
	location: string;
	description: string;
	icon: string;
	color: string;
}

export interface JourneyEntry {
	id: string;
	year: string;
	title: string;
	description: string;
	color: string;
	order: number;
}

export interface JourneysRes {
	learningJourneys?: JourneyEntry[];
	success: boolean;
	message?: string;
	error?: string;
}

export interface JourneyRes {
	learningJourney?: JourneyEntry;
	success: boolean;
	message?: string;
	error?: string;
}

export interface JourneyMutationRes {
	learningJourney?: JourneyEntry;
	success: boolean;
	message?: string;
	errors?: Record<string, string>;
}

export interface CareerContent {
	experience: ExperienceEntry[];
	education: EducationEntry[];
}
