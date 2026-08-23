"use server";

import type { AboutResponse, AboutType } from "@/types/about";
import axios from "axios";
import { getToken } from "./getToken";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loadAbout(): Promise<AboutResponse | undefined> {
	try {
		const res = await axios.get(`${API_URL}/about`);
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500)
				return {
					success: false,
					message: "Internal server error",
				};
			else {
				return {
					success: false,
					message: error.response?.data?.message || "An error occurred",
					errors: error.response?.data?.errors || {},
				};
			}
		} else {
			return {
				success: false,
				message: "An unexpected error occurred",
			};
		}
	}
}

export async function createAbout(
	about: FormData,
): Promise<AboutResponse | undefined> {
	try {
		const token = await getToken();
		if (!token) {
			return {
				success: false,
				message: "Unauthorized",
			};
		}

		const res = await axios.post(`${API_URL}/about`, about, {
			withCredentials: true,
			headers: {
				cookie: `token=${token}`,
			},
		});

		revalidatePath("/dashboard/about");
		revalidatePath("/");

		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: "Internal server error",
				};
			} else {
				return {
					success: false,
					message: error.response?.data?.message || "An error occurred",
					errors: error.response?.data?.errors || {},
				};
			}
		} else {
			return {
				success: false,
				message: "An unexpected error occurred",
			};
		}
	}
}
export async function updateAbout(
	about: AboutType,
): Promise<AboutResponse | undefined> {
	try {
		const token = await getToken();
		if (!token) {
			return {
				success: false,
				message: "Unauthorized",
			};
		}

		const res = await axios.put(`${API_URL}/about`, about, {
			withCredentials: true,
			headers: {
				cookie: `token=${token}`,
			},
		});
		revalidatePath("/dashboard/about");
		revalidatePath("/");
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: "Internal server error",
				};
			} else {
				return {
					success: false,
					message: error.response?.data?.message || "An error occurred",
					errors: error.response?.data?.errors || {},
				};
			}
		} else {
			return {
				success: false,
				message: "An unexpected error occurred",
			};
		}
	}
}

export async function updateAboutImage(
	image: FormData,
): Promise<AboutResponse | undefined> {
	try {
		const token = await getToken();
		if (!token) {
			return {
				success: false,
				message: "Unauthorized",
			};
		}

		const res = await axios.patch(`${API_URL}/about/image`, image, {
			withCredentials: true,
			headers: {
				cookie: `token=${token}`,
			},
		});
		revalidatePath("/dashboard/about");
		revalidatePath("/");
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: "Internal server error",
				};
			} else {
				return {
					success: false,
					message: error.response?.data?.message || "An error occurred",
					errors: error.response?.data?.errors || {},
				};
			}
		} else {
			return {
				success: false,
				message: "An unexpected error occurred",
			};
		}
	}
}
