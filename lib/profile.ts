export type DashboardProfile = {
	fullName: string;
	title: string;
	tagline: string;
	location: string;
	availability: string;
	email: string;
	phone: string;
	github: string;
	linkedin: string;
	website: string;
	bio: string;
};

const STORAGE_KEY = "abobaker.dashboard.profile.v1";

export const DEFAULT_PROFILE: DashboardProfile = {
	fullName: "Abobaker Yagoub Bashar",
	title: "Full-Stack JavaScript Developer",
	tagline:
		"I craft high-performance, scalable web applications from database to interface.",
	location: "Khartoum, Sudan",
	availability: "Open to Remote • Available for new opportunities",
	email: "abobaker.yagoub@gmail.com",
	phone: "+966 00 000 0000",
	github: "https://github.com/abobakeryagoub",
	linkedin: "https://linkedin.com/in/abobakeryagoub",
	website: "https://abobaker.dev",
	bio: "I build modern web apps with React, Next.js, and Node.js, with a focus on clean architecture, performance, and polished user experiences.",
};

export function loadProfile(): DashboardProfile {
	if (typeof window === "undefined") return DEFAULT_PROFILE;

	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
			return DEFAULT_PROFILE;
		}

		const parsed = JSON.parse(raw) as Partial<DashboardProfile>;
		return {
			...DEFAULT_PROFILE,
			...parsed,
		};
	} catch {
		return DEFAULT_PROFILE;
	}
}

export function saveProfile(profile: DashboardProfile): DashboardProfile {
	if (typeof window === "undefined") return profile;
	const normalized = {
		...DEFAULT_PROFILE,
		...profile,
	};
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
	return normalized;
}
