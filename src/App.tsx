import './App.css';
import About from './components/About';
import Header from './components/Header';
import Hero from './components/Hero';
import PageTracker from './components/PageTracker';
function App() {
	return (
		<>
			<Header />
			<main>
				<PageTracker />
				<Hero />
				<About />
				<section id="projects" className="w-full h-screen">
					hello
				</section>
			</main>
		</>
	);
}

export default App;
