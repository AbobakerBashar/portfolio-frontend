import { ContactInput, CreateContactRes } from "@/types/contact";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const sendMsg = async (
	contact: ContactInput,
): Promise<CreateContactRes | undefined> => {
	try {
		const res = await axios.post(`${BASE_URL}/contact`, contact);
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
