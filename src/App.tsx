import './App.css';
import About from './components/About';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import PageTracker from './components/PageTracker';
import Projects from './components/Projects';
import ScrollToTopButton from './components/ScrollToTopButton';
function App() {
	return (
		<>
			<Header />
			<main className="overflow-x-hidden">
				<PageTracker />
				<Hero />
				<About />
				<Experience />
				<Projects />
				<Contact />
			</main>
			<Footer />
			<ScrollToTopButton />
		</>
	);
}

export default App;
