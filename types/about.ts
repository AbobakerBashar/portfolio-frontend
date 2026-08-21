export type AboutType = {
	heading: string;
	intro: string;
	background: string;
	mindset: string;
	careerGoal: string;
};

export type AboutResponse = {
	about?: AboutType & {
		image: {
			url: string;
			publicId: string;
		};
	};
	success: boolean;
	message?: string;
	errors?: Record<string, string>;
};
