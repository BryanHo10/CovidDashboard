import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/404";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Login />
				</Route>
				<Route exact path="/home">
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
