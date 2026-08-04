"use client";

import { useEffect, useState } from "react";

export function useTyping(words: string[], speed = 70, pause = 1400) {
	const [text, setText] = useState("");
	const [wordIdx, setWordIdx] = useState(0);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		if (words.length === 0) return;
		const current = words[wordIdx % words.length];
		let timeout: ReturnType<typeof setTimeout> | undefined;

		if (!deleting && text.length < current.length) {
			timeout = setTimeout(
				() => setText(current.slice(0, text.length + 1)),
				speed,
			);
		} else if (!deleting && text.length === current.length) {
			timeout = setTimeout(() => setDeleting(true), pause);
		} else if (deleting && text.length > 0) {
			timeout = setTimeout(
				() => setText(current.slice(0, text.length - 1)),
				speed / 1.6,
			);
		} else if (deleting && text.length === 0) {
			setDeleting(false);
			setWordIdx((i) => (i + 1) % words.length);
		}

		return () => clearTimeout(timeout);
	}, [text, deleting, wordIdx, words, speed, pause]);

	return text;
}
