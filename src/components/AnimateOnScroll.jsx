import { useEffect, useRef, useState } from "react";

const AnimateOnScroll = ({ children, className, threshold = 0.1 }) => {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{
				threshold,
			},
		);

		const currentRef = ref.current;
		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [threshold]);

	return (
		<div
			ref={ref}
			className={`${className} transition-all duration-1000 ease-out ${
				isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
			}`}
		>
			{children}
		</div>
	);
};

export default AnimateOnScroll;
