export type ContactInput = {
	name: string;
	email: string;
	subject: string;
	message: string;
};

export type CreateContactRes = {
	success: boolean;
	message?: string;
	errors?: Record<string, string>;
};
