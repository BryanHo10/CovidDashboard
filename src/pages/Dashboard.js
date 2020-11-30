import { Container, Divider, LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { pick, head } from "lodash";
import { getCurrentUSCovidData } from "../api/covid";
import { formatReadableNumber, formatTitleCase } from "../utils/format";

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
		return <LinearProgress color="secondary" />;
	}
	return (
		<Container>
			<h1>Dashboard</h1>
			<Divider variant="middle" />
			<Row>
				<StatsCards dataSource={head(usCovidData)} />
			</Row>
		</Container>
	);
};

export default Dashboard;
