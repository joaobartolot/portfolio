import { Analytics } from '@vercel/analytics/react';
import './App.css';
import Footer from './layout/Footer';
import Header from './layout/Header';
import PageTracker from './layout/PageTracker';
import ScrollToTopButton from './layout/ScrollToTopButton';
import About from './sections/About';
import Contact from './sections/Contact';
import Experience from './sections/Experience';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
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
			<Analytics />
		</>
	);
}

export default App;
