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

export type SettingsInputs = {
	profile: {
		name: string;
		title: string;
		tagline: string;
		bio: string;
		avatar: string;
	};

	contact: {
		email: string;
		phone: string;
		location: string;
	};

	socialLinks: {
		github: string;
		linkedin: string;
		twitter: string;
		instagram: string;
		website: string;
	};

	resume: {
		url: string;
	};

	availability: {
		status: boolean;
		message: string;
	};

	typingTexts: string[];
};

export type SettingsRes = {
	success: boolean;
	message?: string;
	error?: string;
	settings?: SettingsInputs;
};
