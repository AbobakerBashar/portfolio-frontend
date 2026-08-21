import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	loadAbout,
	createAbout,
	updateAbout,
	updateAboutImage,
} from "@/lib/about";
import type { AboutType } from "@/types/about";

export const useAbout = () => {
	return useQuery({
		queryKey: ["about"],
		queryFn: async () => loadAbout(),
	});
};

export const useCreateAbout = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["about"],
		mutationFn: async (about: FormData) => await createAbout(about),
		onSuccess: (data) => {
			if (data?.about) queryClient.setQueryData(["about"], data.about);
		},
	});
};

export const useUpdateAbout = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["about"],
		mutationFn: async (
			about: AboutType & {
				image?: {
					url: string;
					publicId: string;
				};
			},
		) => await updateAbout(about),
		onSuccess: (data) => {
			if (data?.about) queryClient.setQueryData(["about"], data.about);
		},
	});
};

export const useUpdateAboutImage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["about"],
		mutationFn: async (image: FormData) => await updateAboutImage(image),
		onSuccess: (data) => {
			if (data?.about) queryClient.setQueryData(["about"], data.about);
		},
	});
};
