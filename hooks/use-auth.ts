import { getUser, login, logout, registerUser } from "@/lib/auth";
import { LoginInputs, RegisterInput } from "@/types/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

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
