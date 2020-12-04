import { Container, Divider, LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Row, Col, Navbar, Nav } from "react-bootstrap";
import { head } from "lodash";
import { getCurrentUSCovidData } from "../api/covid";
import CovidMap from "../components/Dashboard/CovidMap";
import moment from "moment";
import StatsCards from "../components/Common/StatsCards";

const Dashboard = ({}) => {
	const [usCovidData, setUSCovidData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		getCurrentUSCovidData().then((response) => {
			setUSCovidData(response);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return (
			<div className="loading-bar">
				<LinearProgress color="secondary" />
				<div
					className="d-flex justify-content-center align-items-center flex-column"
					style={{ height: "90vh" }}
				>
					<div>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
							style={{ width: "350px" }}
						/>
					</div>
					<div>
						<h1>Loading Covid Data...</h1>
					</div>
				</div>
			</div>
		);
	}
	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand>COVID-19 Data | United States of America</Navbar.Brand>
				<Nav className="ml-auto">
					<Nav.Link href="/">Other Data</Nav.Link>
				</Nav>
			</Navbar>
			<Container>
				<Divider variant="middle" />
				<br />
				<h2>Overall US Data</h2>
				<h3 className="text-muted">
					Last Updated:{" "}
					{moment(head(usCovidData).lastModified).format(
						"MMMM Do YYYY, h:mm a"
					)}
				</h3>
				<Row className="my-3">
					<Col md={5}>
						<Row className="flex-column">
							<StatsCards
								dataSource={head(usCovidData)}
								keysForRender={[
									"death",
									"hospitalized",
									"positive",
									"recovered",
								]}
							/>
						</Row>
					</Col>
					<Col>
						<Row className="flex-column">
							<StatsCards
								dataSource={head(usCovidData)}
								highlightTrend
								keysForRender={[
									"deathIncrease",
									"hospitalizedIncrease",
									"positiveIncrease",
								]}
							/>
						</Row>
					</Col>
				</Row>

				<Divider variant="middle" />
				<CovidMap />
			</Container>
		</>
	);
};

export default Dashboard;
