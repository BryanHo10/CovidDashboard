import { Container, Divider, LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { pick, head } from "lodash";
import { getCurrentUSCovidData } from "../api/covid";
import { formatReadableNumber, formatTitleCase } from "../utils/format";
import CovidMap from "../components/Dashboard/CovidMap";

const StatsCards = ({ dataSource }) => {
	const keysForRender = [
		"death",
		"hospitalized",
		"positive",
		"recovered",
		"negative",
	];
	const covidStats = pick(dataSource, keysForRender);
	return Object.keys(covidStats).map((category) => (
		<Col md={4} className="pt-3">
			<Card>
				<Card.Body>
					<Card.Title>{formatTitleCase(category)}</Card.Title>
					<Card.Text>{formatReadableNumber(covidStats[category])}</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	));
};
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
		<Container>
			<h1>Dashboard</h1>
			<Divider variant="middle" />
			<Row className="my-3">
				<StatsCards dataSource={head(usCovidData)} />
			</Row>
			<Divider variant="middle" />
			<CovidMap />
		</Container>
	);
};

export default Dashboard;
