import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/404";
import Layout from "./components/Layout";

function App() {
	return (
		<Layout>
			<Router>
				<Switch>
					<Route exact path="/">
						<Dashboard />
					</Route>
					<Route>
						<NotFound />
					</Route>
				</Switch>
			</Router>
		</Layout>
	);
}

export default App;
