import {
	addJourney,
	deleteJourney,
	getJourneyById,
	getJourneys,
	updateJourney,
} from "@/lib/journey";
import { JourneyEntry } from "@/types/experience";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useJourneys = () => {
	return useQuery({
		queryKey: ["journeys"],
		queryFn: async () => await getJourneys(),
	});
};

export const useJourney = (id: string) => {
	return useQuery({
		queryKey: ["journeys", id],
		queryFn: async () => await getJourneyById(id),
	});
};

export const useAddJourney = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["journeys", "add"],
		mutationFn: async (journey: Omit<JourneyEntry, "id">) =>
			await addJourney(journey),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["journeys"] });
		},
	});
};

export const useUpdateJourney = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["journeys", "update"],
		mutationFn: async (journey: JourneyEntry) => await updateJourney(journey),
		onSuccess: (updatedJourney) => {
			queryClient.invalidateQueries({ queryKey: ["journeys"] });
			queryClient.invalidateQueries({
				queryKey: ["journeys", updatedJourney?.learningJourney?.id],
			});
		},
	});
};

export const useDeleteJourney = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["journeys", "delete"],
		mutationFn: async (id: string) => await deleteJourney(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["journeys"] });
		},
	});
};
