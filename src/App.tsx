import './App.css';
import About from './components/About';
import Experience from './components/Experience';
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
				<Experience />
			</main>
		</>
	);
}

export default App;
