import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Layout = () => {
	return (
		<div className="flex flex-col min-h-screen bg-gunmetal-400 max-w-5xl md:border-x-[1px] border-y-0 border-paynes-gray-600 px-2">
			<Header />
			<main className="flex-grow overflow-hidden">
				<Outlet /> {/* This renders the current route's component */}
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
