import React from "react";
import { Card, Col } from "react-bootstrap";
import { pick } from "lodash";
import { formatReadableNumber, formatTitleCase } from "../../utils/format";

const StatsCards = ({
	dataSource,
	keysForRender,
	highlightTrend,
	colWidth,
}) => {
	const covidStats = pick(dataSource, keysForRender);
	return Object.keys(covidStats).map((category, idx) => {
		const isNegative = covidStats[category] < 0;
		return (
			<Col md={colWidth} className="pt-3" key={`card_${idx}`}>
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
export default StatsCards;
