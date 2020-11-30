import { Container, LinearProgress, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { getCurrentUSCovidData } from "../api/covid";

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
			<Row>
				<Col md={4}>
					<Card>
						<Card.Body>
							<Card.Title>Data</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up
								the bulk of the card's content.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card>
						<Card.Body>
							<Card.Title>Data</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up
								the bulk of the card's content.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card>
						<Card.Body>
							<Card.Title>Data</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up
								the bulk of the card's content.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Dashboard;
