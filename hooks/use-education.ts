import {
	addEducation,
	deleteEducation,
	getEducation,
	getEducations,
	updateEducation,
} from "@/lib/education";
import { EducationEntry } from "@/types/experience";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useEducations = () => {
	return useQuery({
		queryKey: ["educations"],
		queryFn: async () => await getEducations(),
	});
};

export const useEducation = (id: string) => {
	return useQuery({
		queryKey: ["educations", id],
		queryFn: async () => await getEducation(id),
	});
};

export const useAddEducation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["add education"],
		mutationFn: async (education: EducationEntry) =>
			await addEducation(education),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["educations"] });
		},
	});
};

export const useUpdateEducation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["update education"],
		mutationFn: async ({
			education,
			id,
		}: {
			education: EducationEntry;
			id: string;
		}) => await updateEducation(education, id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["educations"] });
		},
	});
};
export const useDeleteEducation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["delete education"],
		mutationFn: async (id: string) => await deleteEducation(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["educations"] });
		},
	});
};
