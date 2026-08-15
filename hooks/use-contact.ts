import { sendMsg } from "@/lib/contact";
import { ContactInput } from "@/types/contact";
import { useMutation } from "@tanstack/react-query";

export const useSendMsg = () => {
	return useMutation({
		mutationKey: ["contact", "send"],
		mutationFn: async (contact: ContactInput) => {
			const res = await sendMsg(contact);
			return res;
		},
	});
};
