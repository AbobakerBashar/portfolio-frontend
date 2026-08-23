import {
	addExperience,
	deleteExperience,
	editExperience,
	getExperiences,
} from "@/lib/experience";
import { ExperienceEntry } from "@/types/experience";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useExperience = () => {
	return useQuery({
		queryKey: ["experience"],
		queryFn: async () => getExperiences(),
	});
};

export const useAddExperience = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["experience"],
		mutationFn: async (experience: Omit<ExperienceEntry, "id">) =>
			await addExperience(experience),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["experience"] });
		},
	});
};

export const useEditExperience = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["experience"],
		mutationFn: async ({
			experience,
			id,
		}: {
			experience: Omit<ExperienceEntry, "id">;
			id: string;
		}) => await editExperience(experience, id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["experience"] });
		},
	});
};

export const useDeleteExperience = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["experience"],
		mutationFn: async (id: string) => await deleteExperience(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["experience"] });
		},
	});
};
