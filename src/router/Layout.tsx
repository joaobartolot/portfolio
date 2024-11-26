import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Layout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow">
				<Outlet /> {/* This renders the current route's component */}
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
