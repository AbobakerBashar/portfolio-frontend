"use server";

import {
	JourneyEntry,
	JourneyMutationRes,
	JourneyRes,
	JourneysRes,
} from "@/types/experience";
import axios from "axios";
import { getToken } from "./getToken";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const getJourneys = async (): Promise<JourneysRes> => {
	try {
		const res = await axios.get(`${BASE_URL}/journeys`);
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: "An unexpected error occurred. Please try again later.",
				};
			} else if (error.response?.data.message) {
				return {
					success: false,
					message: error.response.data.message,
				};
			} else {
				return {
					success: false,
					message: "An unexpected error occurred. Please try again later.",
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

export const getJourneyById = async (id: string): Promise<JourneyRes> => {
	try {
		const res = await axios.get(`${BASE_URL}/journeys/${id}`);
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 500) {
				return {
					success: false,
					message: "An unexpected error occurred. Please try again later.",
				};
			} else if (error.response?.data.message) {
				return {
					success: false,
					message: error.response.data.message,
				};
			} else {
				return {
					success: false,
					message: "An unexpected error occurred. Please try again later.",
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

export const addJourney = async (
	journey: Omit<JourneyEntry, "id">,
): Promise<JourneyMutationRes | undefined> => {
	try {
		const token = await getToken();
		if (!token) {
			return {
				success: false,
				message: "Unauthorized",
			};
		}

		const res = await axios.post(`${BASE_URL}/journeys`, journey, {
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
			} else if (error.response?.data) {
				if (error.response.data.message) {
					return {
						success: false,
						message: error.response.data.message,
					};
				} else if (error.response.data.errors) {
					return {
						success: false,
						errors: error.response.data.errors,
					};
				}
			} else {
				return {
					success: false,
					message: "An unexpected error occurred. Please try again later.",
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

export const updateJourney = async (
	journey: JourneyEntry,
): Promise<JourneyMutationRes | undefined> => {
	try {
		const token = await getToken();
		if (!token) {
			return {
				success: false,
				message: "Unauthorized",
			};
		}

		const res = await axios.put(`${BASE_URL}/journeys/${journey.id}`, journey, {
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
			} else if (error.response?.data) {
				if (error.response.data.message) {
					return {
						success: false,
						message: error.response.data.message,
					};
				} else if (error.response.data.errors) {
					return {
						success: false,
						errors: error.response.data.errors,
					};
				}
			} else {
				return {
					success: false,
					message: "An unexpected error occurred. Please try again later.",
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

export const deleteJourney = async (
	id: string,
): Promise<JourneyMutationRes | undefined> => {
	try {
		const token = await getToken();
		if (!token) {
			return {
				success: false,
				message: "Unauthorized",
			};
		}

		const res = await axios.delete(`${BASE_URL}/journeys/${id}`, {
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
			} else if (error.response?.data) {
				if (error.response.data.message) {
					return {
						success: false,
						message: error.response.data.message,
					};
				} else if (error.response.data.errors) {
					return {
						success: false,
						errors: error.response.data.errors,
					};
				}
			} else {
				return {
					success: false,
					message: "An unexpected error occurred. Please try again later.",
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
