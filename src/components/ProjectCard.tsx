type ProjectCardProps = {
	name: string;
	image: string;
	techStack: string[];
	link?: string;
};

const ProjectCard = ({ name, image, techStack, link }: ProjectCardProps) => {
	return (
		<div className="flex flex-col max-w-2xs min-w-2xs h-fit w-fit rounded-2xl border border-secondary py-6">
			<div className="flex justify-between items-center px-6">
				<div>{name}</div>
				<div className="flex space-x-2">
					<div className="w-3 h-3 bg-secondary rounded-full"></div>
					<div className="w-3 h-3 bg-secondary rounded-full"></div>
				</div>
			</div>
			<a href={link} target="_blank" rel="noopener noreferrer">
				<img
					src={image}
					alt={name}
					className="w-96 aspect-square object-cover my-4"
				/>
			</a>
			<div className="text-start px-6">
				<span className="font-semibold">Tech used:</span>{' '}
				{techStack.join(', ')}
			</div>
		</div>
	);
};

export default ProjectCard;
