import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/404";
import Layout from "./components/Layout";
import StateCounty from "./pages/StateCounty";
import WorldData from "./pages/WorldData";

function App() {
	return (
		<Layout>
			<Router>
				<Switch>
					<Route exact path="/">
						<Dashboard />
					</Route>
					<Route path="/world">
						<WorldData />
					</Route>
					<Route path="/:stateCode">
						<StateCounty />
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
