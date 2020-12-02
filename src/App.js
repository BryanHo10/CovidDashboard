import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/404";

function App() {
	return (
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
	);
}

export default App;
