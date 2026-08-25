import { useEffect, useState } from "react";

export function useTypingEffect(strings: string[], speed = 60, pause = 2000) {
	const [text, setText] = useState("");
	const [stringIndex, setStringIndex] = useState(0);
	const [charIndex, setCharIndex] = useState(0);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		const current = strings[stringIndex] || "";
		let timeout: ReturnType<typeof setTimeout>;

		if (!deleting && charIndex < current?.length) {
			timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
		} else if (!deleting && charIndex === current.length) {
			timeout = setTimeout(() => setDeleting(true), pause);
		} else if (deleting && charIndex > 0) {
			timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
		} else if (deleting && charIndex === 0) {
			timeout = setTimeout(() => {
				setDeleting(false);
				setStringIndex((s) => (s + 1) % strings.length);
			}, 0);
		}

		timeout = setTimeout(() => setText(current.substring(0, charIndex)), 0);

		return () => clearTimeout(timeout);
	}, [charIndex, stringIndex, deleting, strings, speed, pause]);

	return text;
}
