import { useRef, useState } from 'react'
import { Swiper as SwiperCore } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import AnimatedSectionTitle from '../components/AnimatedSectionTitle'
import Pagination from '../components/Pagination'
import ProjectCard from '../components/ProjectCard'
import TechStackSlider from '../components/TechStackSlider'
import useMedia from '../hooks/useMedia'

const projects = [
	{
		name: 'MR. GULA',
		image: '/mrgula.png',
		techStack: ['React', 'TailwindCSS', 'Sanity CMS'],
		link: 'https://mr-gula.vercel.app/',
	},
	{
		name: 'ERICK SKORM PORTFOLIO',
		image: 'erick-skorm.png',
		techStack: ['React', 'TailwindCSS'],
		link: 'https://erickskorm.art',
	},
]

const Projects = () => {
	const { md } = useMedia()
	const [activeIndex, setActiveIndex] = useState(0)
	const swiperRef = useRef<SwiperCore | null>(null)

	return (
		<section
			className="relative flex flex-col justify-center items-center"
			id="projects"
			data-section
		>
			{/* Slider */}
			<TechStackSlider />
			{/* Content Wrapper */}
			<div className="relative flex flex-col items-center justify-center w-full h-full py-6">
				{/* iPhone Image */}
				<div className=" flex flex-col w-full">
					<div className="flex justify-center xl:items-center border-b border-secondary md:border-none w-full px-2 pb-12 md:p-0 space-x-2 md:space-x-12 xl:space-x-24">
						<img
							src="iphone.png"
							alt="Mr. Gula website"
							className="md:p-0 h-full w-full max-w-[200px] md:max-w-[250px] xl:max-w-[350px] object-cover animate-floating"
						/>

						{/* Project Description */}
						<div className="pt-[50px] pr-2 text-start space-y-2 md:space-y-4 md:border-b border-secondary pb-2 max-h-[300px]">
							<AnimatedSectionTitle
								word="Projects"
								className="font-display text-xl md:text-2xl lg:text-3xl"
							/>
							<p className="text-xs md:text-base max-w-[180px] md:max-w-[300px]">
								The projects I develop use the latest
								technologies and are tailored to meet each
								client's specific needs. Over the years, I’ve
								worked on various projects, both at companies
								I’ve been part of and as a freelancer,
								delivering custom solutions that drive results.
							</p>
						</div>
					</div>
				</div>

				{md ? (
					<div className="flex justify-center space-x-4 overflow-hidden pb-4 w-full my-12">
						{projects.map((project, index) => (
							<ProjectCard key={index} {...project} />
						))}
					</div>
				) : (
					<>
						<Swiper
							loop
							freeMode
							onSwiper={swiper => (swiperRef.current = swiper)}
							onSlideChange={swiper =>
								setActiveIndex(swiper.realIndex)
							}
							breakpoints={{
								640: {
									slidesPerView: 1,
								},
								768: {
									slidesPerView: 2,
								},
								1024: {
									slidesPerView: 3,
								},
							}}
							className="w-full max-w-7xl mt-12"
						>
							{projects.map((project, index) => (
								<SwiperSlide
									key={index}
									className="flex justify-center items-center"
								>
									<div className="flex justify-center items-center w-full">
										<ProjectCard key={index} {...project} />
									</div>
								</SwiperSlide>
							))}
						</Swiper>

						<Pagination
							length={projects.length}
							activeIndex={activeIndex}
							onChange={index =>
								swiperRef.current?.slideToLoop(index)
							}
							className="mt-8"
						/>
					</>
				)}
			</div>
		</section>
	)
}

export default Projects
