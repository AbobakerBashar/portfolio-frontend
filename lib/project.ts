import {
	MutationProjectResponse,
	ProjectFormValues,
	ProjectResponse,
	ProjectsResponse,
} from "@/types/project";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const createProject = async (
	formData: FormData,
): Promise<MutationProjectResponse | undefined> => {
	try {
		const res = await axios.post(`${BASE_URL}/projects`, formData, {
			withCredentials: true,
		});
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

export const getProjects = async (): Promise<ProjectsResponse | undefined> => {
	try {
		const res = await axios.get(`${BASE_URL}/projects`);
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
					message: error.response.data.message,
					error: error.response.data.error,
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
export const getProjectById = async (
	id: string,
): Promise<ProjectResponse | undefined> => {
	try {
		const res = await axios.get(`${BASE_URL}/projects/${id}`);

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
					message: error.response.data.message,
					error: error.response.data.errors.error,
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

export const deleteProject = async (id: string) => {
	try {
		const res = await axios.delete(`${BASE_URL}/projects/${id}`, {
			withCredentials: true,
		});
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
					message: error.response.data.message,
					error: error.response.data.error || "",
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

export const updateProject = async (
	id: string,
	values: ProjectFormValues,
): Promise<MutationProjectResponse | undefined> => {
	try {
		const res = await axios.patch(`${BASE_URL}/projects/${id}`, values, {
			withCredentials: true,
		});
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

export const updateProjectImage = async (
	id: string,
	value: FormData,
): Promise<MutationProjectResponse | undefined> => {
	try {
		const res = await axios.patch(`${BASE_URL}/projects/${id}/image`, value, {
			withCredentials: true,
		});
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
