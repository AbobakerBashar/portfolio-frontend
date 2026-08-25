"use server";

import {
	EducationEntry,
	EducationRes,
	EducationsRes,
} from "@/types/experience";
import axios from "axios";
import { getToken } from "./getToken";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const getEducations = async (): Promise<EducationsRes> => {
	try {
		const response = await axios.get(`${BASE_URL}/education`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				success: false,
				message: error.message,
			};
		} else {
			return {
				success: false,
				message: "An unexpected error occurred.",
			};
		}
	}
};

export const getEducation = async (id: string): Promise<EducationRes> => {
	try {
		const response = await axios.get(`${BASE_URL}/education/${id}`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: "An unexpected error occurred.",
				};
			} else
				return {
					success: false,
					message:
						error.response?.data?.message || "An unexpected error occurred.",
				};
		} else {
			return {
				success: false,
				message: "An unexpected error occurred.",
			};
		}
	}
};

export const addEducation = async (education: EducationEntry) => {
	try {
		const token = await getToken();
		if (!token) {
			return {
				success: false,
				message: "Authentication token not found.",
			};
		}

		const response = await axios.post(`${BASE_URL}/education`, education, {
			headers: {
				cookie: `token=${token}`,
			},
		});

		revalidatePath("/dashboard/experience");
		revalidatePath("/");
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("Error adding education:", error.response?.data);
			if (error.response?.status === 500) {
				return {
					success: false,
					message: "An unexpected error occurred.",
				};
			} else {
				if (error.response?.data?.errors) {
					return {
						success: false,
						errors: error.response.data.errors,
					};
				} else
					return {
						success: false,
						message:
							error.response?.data?.message || "An unexpected error occurred.",
					};
			}
		} else {
			return {
				success: false,
				message: "An unexpected error occurred.",
			};
		}
	}
};

export const updateEducation = async (
	education: EducationEntry,
	id: string,
) => {
	try {
		const token = await getToken();
		if (!token) {
			return {
				success: false,
				message: "Authentication token not found.",
			};
		}

		const response = await axios.put(`${BASE_URL}/education/${id}`, education, {
			headers: {
				cookie: `token=${token}`,
			},
		});

		revalidatePath("/dashboard/experience");
		revalidatePath("/");
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: "An unexpected error occurred.",
				};
			} else {
				if (error.response?.data?.errors) {
					return {
						success: false,
						errors: error.response.data.errors,
					};
				} else
					return {
						success: false,
						message:
							error.response?.data?.message || "An unexpected error occurred.",
					};
			}
		} else {
			return {
				success: false,
				message: "An unexpected error occurred.",
			};
		}
	}
};

export const deleteEducation = async (id: string) => {
	try {
		const token = await getToken();
		if (!token) {
			return {
				success: false,
				message: "Authentication token not found.",
			};
		}

		const response = await axios.delete(
			`${BASE_URL}/education/${id}`,

			{
				headers: {
					cookie: `token=${token}`,
				},
			},
		);

		revalidatePath("/dashboard/experience");
		revalidatePath("/");
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: "An unexpected error occurred.",
				};
			} else {
				return {
					success: false,
					message:
						error.response?.data?.message || "An unexpected error occurred.",
				};
			}
		} else {
			return {
				success: false,
				message: "An unexpected error occurred.",
			};
		}
	}
};
