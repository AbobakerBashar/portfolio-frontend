"use server";

import type {
	RegisterInput,
	AuthRes,
	LoginInputs,
	SettingsInputs,
	SettingsRes,
} from "@/types/auth";
import axios from "axios";
import { cookies } from "next/headers";

const setCookies = async (token: string) => {
	const cookiesStore = await cookies();
	cookiesStore.set("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		path: "/",
		maxAge: 3 * 24 * 60 * 60,
	});
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (
	inputs: RegisterInput,
): Promise<AuthRes | undefined> => {
	try {
		const res = await axios.post(`${API_URL}/admin/register`, inputs);
		const token = res.data?.token;
		if (token) {
			await setCookies(token);
			return {
				success: res.data?.success,
				user: res.data?.user,
				message: res.data?.message,
			};
		} else throw new Error("No token found");
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: error.response?.data?.message,
				};
			}

			if (error.response?.data.errors)
				return {
					errors: error.response?.data.errors,
					success: false,
				};
			else
				return {
					success: false,
					message: error.response?.data?.message,
				};
		} else {
			return {
				success: false,
				message: "Faild to create an acount",
			};
		}
	}
};

export async function login(inputs: LoginInputs): Promise<AuthRes | undefined> {
	try {
		const res = await axios.post(`${API_URL}/admin/login`, inputs);
		const token = res.data?.token;
		if (token) {
			await setCookies(token);
			return {
				success: res.data?.success,
				user: res.data?.user,
				message: res.data?.message,
			};
		} else throw new Error("No token found");
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log("ERROR: ", error.response?.data);
			if (error.response?.status === 500) {
				return {
					success: false,
					message: error.response?.data?.message,
				};
			}

			if (error.response?.data.errors)
				return {
					errors: error.response?.data.errors,
					success: false,
				};
			else
				return {
					success: false,
					message: error.response?.data?.message,
				};
		} else {
			return {
				success: false,
				message: "Faild to login",
			};
		}
	}
}

export async function logout(): Promise<{
	success: boolean;
	message?: string;
}> {
	try {
		const cookiesStore = await cookies();
		cookiesStore.delete("jwt");

		return {
			success: true,
		};
	} catch (error) {
		return {
			success: false,
			message: (error as Error).message,
		};
	}
}

export async function getUser(): Promise<AuthRes> {
	try {
		const cookieStore = await cookies();
		const jwt = cookieStore.get("jwt")?.value;
		if (!jwt)
			return {
				success: false,
				message: "Unauthorized!",
			};
		const res = await axios.get(`${API_URL}/admin`, {
			withCredentials: true,
			headers: {
				Cookie: `token=${jwt}`,
			},
		});

		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: error.response?.data?.message,
				};
			} else
				return {
					success: false,
					message: error.response?.data?.message,
				};
		} else {
			return {
				success: false,
				message: "Faild to load admin",
			};
		}
	}
}

export const getSeetings = async (): Promise<SettingsRes> => {
	try {
		const res = await axios.get(`${API_URL}/settings`);

		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: error.response?.data?.message,
				};
			} else
				return {
					success: false,
					message: error.response?.data?.message,
				};
		} else {
			return {
				success: false,
				message: "Faild to load settings",
			};
		}
	}
};

export const createSettings = async (inputs: SettingsInputs) => {
	const payload: SettingsInputs = {
		...inputs,
		typingTexts: inputs.typingTexts?.filter((text) => text !== ""),
	};

	try {
		const cookieStore = await cookies();
		const jwt = cookieStore.get("jwt")?.value;
		if (!jwt)
			return {
				success: false,
				message: "Unauthorized!",
			};

		const res = await axios.post(`${API_URL}/settings`, payload, {
			withCredentials: true,
			headers: {
				cookie: `token=${jwt}`,
			},
		});

		return {
			success: res.data?.success,
			settings: res.data?.settings,
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: error.response?.data?.message,
				};
			}

			if (error.response?.data.errors)
				return {
					errors: error.response?.data.errors,
					success: false,
				};
			else
				return {
					success: false,
					message:
						error.response?.data?.message || "Faild to create an settings",
				};
		} else {
			return {
				success: false,
				message: "Faild to create an settings",
			};
		}
	}
};

export const updateSettings = async (inputs: SettingsInputs) => {
	const payload: SettingsInputs = {
		...inputs,
		typingTexts: inputs.typingTexts?.filter((text) => text !== ""),
	};
	try {
		const cookieStore = await cookies();
		const jwt = cookieStore.get("jwt")?.value;
		if (!jwt)
			return {
				success: false,
				message: "Unauthorized!",
			};

		const res = await axios.put(`${API_URL}/settings`, payload, {
			withCredentials: true,
			headers: {
				cookie: `token=${jwt}`,
			},
		});

		return {
			success: res.data?.success,
			settings: res.data?.settings,
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: error.response?.data?.message,
				};
			}

			if (error.response?.data.errors)
				return {
					errors: error.response?.data.errors,
					success: false,
				};
			else
				return {
					success: false,
					message:
						error.response?.data?.message || "Faild to update an settings",
				};
		} else {
			return {
				success: false,
				message: "Faild to update an settings",
			};
		}
	}
};

export const updateSettingsAvatar = async (input: FormData) => {
	try {
		const cookieStore = await cookies();
		const jwt = cookieStore.get("jwt")?.value;
		if (!jwt)
			return {
				success: false,
				message: "Unauthorized!",
			};

		const res = await axios.patch(`${API_URL}/settings/avatar`, input, {
			withCredentials: true,
			headers: {
				cookie: `token=${jwt}`,
			},
		});

		return {
			success: res.data?.success,
			settings: res.data?.settings,
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: error.response?.data?.message,
				};
			}

			if (error.response?.data.errors)
				return {
					errors: error.response?.data.errors,
					success: false,
				};
			else
				return {
					success: false,
					message:
						error.response?.data?.message ||
						"Faild to update an settings avatar",
				};
		} else {
			return {
				success: false,
				message: "Faild to update an settings avatar",
			};
		}
	}
};

export const updateSettingsResume = async (input: FormData) => {
	try {
		const cookieStore = await cookies();
		const jwt = cookieStore.get("jwt")?.value;
		if (!jwt)
			return {
				success: false,
				message: "Unauthorized!",
			};

		const res = await axios.patch(`${API_URL}/settings/resume`, input, {
			withCredentials: true,
			headers: {
				cookie: `token=${jwt}`,
			},
		});

		return {
			success: res.data?.success,
			settings: res.data?.settings,
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: error.response?.data?.message,
				};
			}

			if (error.response?.data.errors)
				return {
					errors: error.response?.data.errors,
					success: false,
				};
			else
				return {
					success: false,
					message:
						error.response?.data?.message ||
						"Faild to update an settings resume",
				};
		} else {
			return {
				success: false,
				message: "Faild to update an settings resume",
			};
		}
	}
};
