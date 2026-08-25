export type User = {
	id: string;
	email: string;
	name?: string;
};

export type RegisterInput = {
	name: string;
	email: string;
	password: string;
};

export type AuthRes = {
	user?: User;
	success: boolean;
	message?: string;
	errors?: Record<string, string>;
};

export type LoginInputs = {
	email: string;
	password: string;
};

export type Profile = {
	name: string;
	title: string;
	tagline: string;
	bio: string;
	avatar: {
		url: string;
		publicId: string;
	};
};

export type Contact = {
	email: string;
	phone: string;
	location: string;
};

export type SocialLinks = {
	github: string;
	linkedin: string;
	twitter: string;
	instagram: string;
	website: string;
};

export type Availability = {
	status: boolean;
	message: string;
};

export interface SettingsInputs {
	profile: Profile;
	contact: Contact;
	socialLinks: SocialLinks;
	availability: Availability;

	typingTexts: string[];
}

export type SettingsRes = {
	success: boolean;
	message?: string;
	error?: string;
	settings?: SettingsInputs & {
		resume: {
			url: string;
			publicId: string;
		};
	};
};
