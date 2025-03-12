import Blob from '../assets/blobs/blob1.svg?react'
import GameContainer from '../components/GameContainer'
import HeroTextEffect from '../components/HeroTextEffect'
import ScrollIndicator from '../components/ScrollIndicator'

const Hero = () => {
	return (
		<section
			id="hero"
			className="relative flex h-screen w-full items-center justify-center overflow-visible"
			data-section
		>
			<div className="flex w-[80%] flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
				<div className="font-display mb-12 flex w-full justify-center text-start text-3xl md:m-0 md:w-1/2 md:text-5xl lg:text-7xl">
					<div className="h-[144px] w-[181px] md:h-[192px] md:w-[289px] lg:h-[288px] lg:w-[433px]">
						<HeroTextEffect />
					</div>
				</div>
				<div className="aspect-square w-64 overflow-visible md:ml-4 md:w-1/2 md:pb-12">
					<GameContainer />
				</div>
			</div>
			<ScrollIndicator className="absolute bottom-16 md:bottom-12" />
			<Blob className="text-secondary/25 absolute top-0 right-0 -z-10 h-full w-full scale-150 blur-2xl md:w-[50%]" />
		</section>
	)
}

export default Hero
