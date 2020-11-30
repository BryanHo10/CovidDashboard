import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/Login";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/">
					<Login />
				</Route>
				{/* <Route path="/">
						<Login />
					</Route>
          <Route path="/">
						<Login />
					</Route> */}
			</Switch>
		</Router>
	);
}

export default App;
