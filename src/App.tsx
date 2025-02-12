import './App.css';
import About from './components/About';
import Experience from './components/Experience';
import Header from './components/Header';
import Hero from './components/Hero';
import PageTracker from './components/PageTracker';
import Projects from './components/Projects';
function App() {
	return (
		<>
			<Header />
			<main>
				<PageTracker />
				<Hero />
				<About />
				<Experience />
				<Projects />
			</main>
		</>
	);
}

export default App;
