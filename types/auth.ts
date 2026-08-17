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
