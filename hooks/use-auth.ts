import {
	createSettings,
	getSeetings,
	getUser,
	login,
	logout,
	registerUser,
	updateSettings,
	updateSettingsAvatar,
} from "@/lib/auth";
import { LoginInputs, RegisterInput, SettingsInputs } from "@/types/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRegister = () => {
	return useMutation({
		mutationKey: ["register"],
		mutationFn: async (inputs: RegisterInput) => await registerUser(inputs),
	});
};

export const useLogin = () => {
	return useMutation({
		mutationFn: async (inputs: LoginInputs) => await login(inputs),
	});
};

export const useLogout = () => {
	return useMutation({
		mutationFn: async () => logout(),
	});
};

export const useGetAdmin = () => {
	return useQuery({
		queryKey: ["admin"],
		queryFn: async () => await getUser(),
	});
};

export const useSettings = () => {
	return useQuery({
		queryKey: ["settings"],
		queryFn: async () => getSeetings(),
	});
};

export const useCreateSettings = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["settings"],
		mutationFn: async (inputs: SettingsInputs) => createSettings(inputs),
		onSuccess: (data) => {
			if (data?.settings) queryClient.setQueryData(["settings"], data.settings);
		},
	});
};

export const useUpdateSettings = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["settings"],
		mutationFn: async (inputs: SettingsInputs) => updateSettings(inputs),
		onSuccess: (data) => {
			if (data?.settings) queryClient.setQueryData(["settings"], data.settings);
		},
	});
};

export const useUpdateSettingsAvatar = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["settings"],
		mutationFn: async (input: FormData) => updateSettingsAvatar(input),
		onSuccess: (data) => {
			if (data?.settings) queryClient.setQueryData(["settings"], data.settings);
		},
	});
};
