import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Layout from './router/Layout';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [{ path: '/', element: <Home /> }],
	},
]);

function App() {
	return <RouterProvider router={routes} />;
}

export default App;
