import { Container } from "@material-ui/core";
import { ResponsiveBar } from "@nivo/bar";
import React from "react";

const GraphChart = ({ data }) => {
	return <MyResponsiveBar data={data} />;
};
export default GraphChart;

const MyResponsiveBar = ({ data, xLabel, yLabel }) => {
	return (
		<Container style={{ height: "50vh" }}>
			<ResponsiveBar
				data={data}
				keys={["Cases"]}
				indexBy="Date"
				margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
				padding={0.3}
				enableLabel={false}
				valueScale={{ type: "linear" }}
				indexScale={{ type: "band", round: true }}
				colors={{ scheme: "nivo" }}
				defs={[
					{
						id: "dots",
						type: "patternDots",
						background: "inherit",
						color: "#38bcb2",
						size: 4,
						padding: 1,
						stagger: true,
					},
					{
						id: "lines",
						type: "patternLines",
						background: "inherit",
						color: "#eed312",
						rotation: -45,
						lineWidth: 6,
						spacing: 10,
					},
				]}
				borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
				axisTop={null}
				axisRight={null}
				axisBottom={null}
				axisLeft={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legendOffset: -40,
				}}
				labelSkipWidth={12}
				labelSkipHeight={12}
				labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
				animate={true}
				motionStiffness={90}
				motionDamping={15}
			/>
		</Container>
	);
};
