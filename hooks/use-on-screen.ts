"use client";

import { useEffect, useRef, useState } from "react";

export function useOnScreen<T extends HTMLElement = HTMLDivElement>(
	rootMargin = "0px",
) {
	const ref = useRef<T | null>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (typeof IntersectionObserver === "undefined") {
			setVisible(true);
			return;
		}
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					obs.disconnect();
				}
			},
			{ rootMargin },
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, [rootMargin]);

	return { ref, visible };
}
