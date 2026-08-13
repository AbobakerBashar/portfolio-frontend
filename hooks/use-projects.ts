"use client";

import {
	createProject,
	getProjects,
	deleteProject,
	getProjectById,
	updateProject,
	updateProjectImage,
} from "@/lib/project";

import type {
	ProjectResponse,
	ProjectsResponse,
	ProjectFormValues,
	MutationProjectResponse,
} from "@/types/project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const PROJECTS_QUERY_KEY = ["dashboard", "projects"] as const;

export function useProjects() {
	return useQuery<ProjectsResponse>({
		queryKey: PROJECTS_QUERY_KEY,
		queryFn: getProjects,
	});
}

export function useProject(id: string) {
	return useQuery<ProjectResponse>({
		queryKey: [...PROJECTS_QUERY_KEY, id],
		queryFn: async () => {
			const res = await getProjectById(id);
			return res;
		},

		enabled: !!id,
	});
}

export function useAddProject() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (values: FormData) => await createProject(values),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
		},
	});
}

export function useUpdateProject() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			values,
		}: {
			id: string;
			values: ProjectFormValues;
		}) => await updateProject(id, values),
		onSuccess: (data: MutationProjectResponse | undefined) => {
			queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
			queryClient.invalidateQueries({
				queryKey: [...PROJECTS_QUERY_KEY, data?.project?.id],
			});
		},
	});
}

export function useUpdateProjectImage() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, value }: { id: string; value: FormData }) =>
			await updateProjectImage(id, value),
		onSuccess: (data: MutationProjectResponse | undefined) => {
			queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
			queryClient.invalidateQueries({
				queryKey: [...PROJECTS_QUERY_KEY, data?.project?.id],
			});
		},
	});
}

export function useDeleteProject() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => deleteProject(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
		},
	});
}
