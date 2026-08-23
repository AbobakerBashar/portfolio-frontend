"use server";

import {
	GetSkillResponse,
	GetSkillsResponse,
	SkillFormValues,
} from "@/types/skill";
import axios from "axios";
import { getToken } from "./getToken";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const getSkills = async (): Promise<GetSkillsResponse | undefined> => {
	try {
		const res = await axios.get(`${BASE_URL}/skills`);
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: "An unexpected error occurred. Please try again later.",
				};
			}
			if (error.response?.data) {
				return {
					success: false,
					message:
						error.response.data.message ||
						"An unexpected error occurred. Please try again later.",
				};
			}
		} else {
			return {
				success: false,
				message: "An unexpected error occurred. Please try again later.",
			};
		}
	}
};

export const addSkill = async (values: SkillFormValues) => {
	try {
		const token = await getToken();
		if (!token) {
			return {
				success: false,
				message: "Unauthorized",
			};
		}

		const res = await axios.post(`${BASE_URL}/skills`, values, {
			withCredentials: true,
			headers: {
				cookie: `token=${token}`,
			},
		});

		revalidatePath("/dashboard/experience");
		revalidatePath("/");
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: "An unexpected error occurred. Please try again later.",
				};
			}
			if (error.response?.data) {
				if (error.response.data.errors) {
					return {
						success: false,
						errors: error.response.data.errors,
					};
				} else {
					return {
						success: false,
						message:
							error.response.data.message ||
							"An unexpected error occurred. Please try again later.",
					};
				}
			}
		} else {
			return {
				success: false,
				message: "An unexpected error occurred. Please try again later.",
			};
		}
	}
};

export const updateSkill = async (id: string = "", values: SkillFormValues) => {
	try {
		const token = await getToken();
		if (!token) {
			return {
				success: false,
				message: "Unauthorized",
			};
		}

		const res = await axios.put(`${BASE_URL}/skills/${id}`, values, {
			withCredentials: true,
			headers: {
				cookie: `token=${token}`,
			},
		});

		revalidatePath("/dashboard/experience");
		revalidatePath("/");
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: "An unexpected error occurred. Please try again later.",
				};
			}
			if (error.response?.data) {
				if (error.response.data.errors) {
					return {
						success: false,
						errors: error.response.data.errors,
					};
				} else {
					return {
						success: false,
						message:
							error.response.data.message ||
							"An unexpected error occurred. Please try again later.",
					};
				}
			}
		} else {
			return {
				success: false,
				message: "An unexpected error occurred. Please try again later.",
			};
		}
	}
};

export const deleteSkill = async (id: string = "") => {
	try {
		const token = await getToken();
		if (!token) {
			return {
				success: false,
				message: "Unauthorized",
			};
		}

		const res = await axios.delete(`${BASE_URL}/skills/${id}`, {
			withCredentials: true,
			headers: {
				cookie: `token=${token}`,
			},
		});

		revalidatePath("/dashboard/experience");
		revalidatePath("/");
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 5000)
				return {
					success: false,
					message: "An unexpected error occurred. Please try again later.",
				};
			else
				return {
					success: false,
					message:
						error.response?.data?.message ||
						"An unexpected error occurred. Please try again later.",
				};
		} else
			return {
				success: false,
				message: "An unexpected error occurred. Please try again later.",
			};
	}
};

export const getById = async (
	id: string = "",
): Promise<GetSkillResponse | undefined> => {
	try {
		const res = await axios.get(`${BASE_URL}/skills/${id}`);
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 5000)
				return {
					success: false,
					message: "An unexpected error occurred. Please try again later.",
				};
			else
				return {
					success: false,
					message:
						error.response?.data?.message ||
						"An unexpected error occurred. Please try again later.",
				};
		} else
			return {
				success: false,
				message: "An unexpected error occurred. Please try again later.",
			};
	}
};
