"use client";

import {
	createProject,
	deleteProject,
	loadProjects,
	updateProject,
	type DashboardProject,
	type ProjectFormValues,
} from "@/lib/projects";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const PROJECTS_QUERY_KEY = ["dashboard", "projects"] as const;

export function useProjects() {
	return useQuery({
		queryKey: PROJECTS_QUERY_KEY,
		queryFn: loadProjects,
	});
}

export function useProject(id: string | undefined) {
	return useQuery({
		queryKey: ["dashboard", "projects", id],
		queryFn: () => loadProjects().find((p) => p.id === id),
		enabled: Boolean(id),
	});
}

export function useAddProject() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (values: ProjectFormValues) => createProject(values),
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
		}) => updateProject(id, values),
		onSuccess: (updated: DashboardProject | undefined) => {
			queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
			if (updated) {
				queryClient.setQueryData<DashboardProject>(
					["dashboard", "projects", updated.id],
					updated,
				);
			}
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
