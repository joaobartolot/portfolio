import { useEffect, useState } from 'react';

const useActiveSection = (threshold: number = 0.5) => {
	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		const sections = Array.from(
			document.querySelectorAll('[data-section]')
		) as HTMLElement[];

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{ threshold }
		);

		sections.forEach(section => observer.observe(section));

		return () => observer.disconnect();
	}, [threshold]);

	return activeId;
};

export default useActiveSection;
