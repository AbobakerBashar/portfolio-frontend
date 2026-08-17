import Image from "next/image";

const AuthImage = () => {
	return (
		<div className="h-full relative hidden md:block">
			<Image
				src="/admin.png"
				alt="Admin panal"
				fill
				sizes="100%"
				className="object-cover"
			/>
		</div>
	);
};

export default AuthImage;
