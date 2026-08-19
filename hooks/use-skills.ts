"use client";

import {
	addSkill,
	deleteSkill,
	getSkills,
	updateSkill,
	getById,
} from "@/lib/skill";
import type { Skill, SkillFormValues } from "@/types/skill";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const SKILLS_QUERY_KEY = ["dashboard", "skills"] as const;

export function useSkills() {
	return useQuery({
		queryKey: SKILLS_QUERY_KEY,
		queryFn: async () => await getSkills(),
	});
}

export function useSkill(id: string | undefined) {
	return useQuery({
		queryKey: ["dashboard", "skills", id],
		queryFn: () => getById(id),
		enabled: Boolean(id),
	});
}

export function useAddSkill() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (values: SkillFormValues) => await addSkill(values),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY });
		},
	});
}

export function useUpdateSkill() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			values,
		}: {
			id: string;
			values: SkillFormValues;
		}) => {
			const res = await updateSkill(id, values);
			return res;
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY });
			if (data.skill) {
				queryClient.setQueryData<Skill>(
					["dashboard", "skills", data?.skill?.id],
					data.skill,
				);
			}
		},
	});
}

export function useDeleteSkill() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => deleteSkill(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY });
		},
	});
}
