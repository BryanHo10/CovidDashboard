import { Container, Divider, LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { pick, head } from "lodash";
import { getCurrentUSCovidData } from "../api/covid";
import { formatReadableNumber, formatTitleCase } from "../utils/format";
import CovidMap from "../components/Dashboard/CovidMap";
import moment from "moment";

const StatsCards = ({ dataSource, keysForRender, highlightTrend }) => {
	const covidStats = pick(dataSource, keysForRender);
	return Object.keys(covidStats).map((category, idx) => {
		const isNegative = covidStats[category] < 0;
		return (
			<Col className="pt-3" key={`card_${idx}`}>
				<Card>
					<Card.Body>
						<Card.Title>{formatTitleCase(category)} Count</Card.Title>
						<Card.Text>
							<span
								className={`h1 ${
									highlightTrend
										? isNegative
											? "text-danger"
											: "text-success"
										: ""
								}`}
							>
								{formatReadableNumber(covidStats[category])}
							</span>
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		);
	});
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
			<h2>
				Last Updated:{" "}
				{moment(head(usCovidData).lastModified).format("MMMM Do YYYY, h:mm a")}
			</h2>
			<Row className="my-3">
				<Col md={5}>
					<Row className="flex-column">
						<StatsCards
							dataSource={head(usCovidData)}
							keysForRender={["death", "hospitalized", "positive", "recovered"]}
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
	);
};

export default Dashboard;
