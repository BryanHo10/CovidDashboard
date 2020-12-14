import { Paper, Tab, Tabs } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { head } from "lodash";
import moment from "moment";
import { getHistoricStateData } from "../../api/covid";
import { getStateByAbbr } from "../../utils/format";
import GraphChart from "../Common/Graph";
import { Col, Row } from "react-bootstrap";
import StatsCards from "../Common/StatsCards";
import { Link } from "react-router-dom";

const TabPanel = ({ children, value, index, ...other }) => {
	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{value === index && <div>{children}</div>}
		</div>
	);
};
const DataView = ({ children, data }) => {
	return (
		<Row className="my-3">
			<StatsCards
				dataSource={head(data)}
				highlightTrend
				keysForRender={[
					"deathIncrease",
					"hospitalizedIncrease",
					"positiveIncrease",
				]}
				colWidth={4}
			/>
			<StatsCards
				dataSource={head(data)}
				keysForRender={["death", "hospitalized", "positive", "recovered"]}
				colWidth={3}
			/>

			<Col>{children}</Col>
		</Row>
	);
};
const CovidState = ({ stateData }) => {
	const {
		daeath,
		positive,
		recovered,
		negative,
		hospitalized,
		state,
	} = stateData;
	const [value, setValue] = useState("deaths");
	const [data, setData] = useState(null);

	useEffect(() => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "smooth",
		});
		getHistoricStateData(state.toLowerCase()).then((data) => {
			setData(data);
		});
	}, [stateData]);

	const prepStateData = (data, keyword) => {
		const graphData = [...data]
			.splice(0, 50)
			.map((date, idx) => {
				return {
					Date: moment(date.dateModified).format("MM/DD/YYYY"),
					Cases: date[keyword] || 0,
				};
			})
			.reverse();
		return graphData;
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<div>
			<div className="d-flex justify-content-between">
				<h1>
					{getStateByAbbr(state)} ({state})
				</h1>
				<h2>
					<Link to={`${state}`}>View Counties {">"}</Link>
				</h2>
			</div>

			<Paper>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					centered
				>
					<Tab value="deaths" label="Number of Deaths" />
					<Tab value="positive" label="Number of Positive Cases" />
					<Tab value="recover" label="Number Recovered" />
				</Tabs>
			</Paper>

			<TabPanel value={value} index="deaths">
				<DataView data={data}>
					<div className="px-5">
						<br />
						<h2>Past 50 Days</h2>
						{data && <GraphChart data={prepStateData(data, "death")} />}
					</div>
				</DataView>
			</TabPanel>
			<TabPanel value={value} index="positive">
				<DataView data={data}>
					<div className="px-5">
						<br />
						<h2>Past 50 Days</h2>
						{data && <GraphChart data={prepStateData(data, "positive")} />}
					</div>
				</DataView>
			</TabPanel>
			<TabPanel value={value} index="recover">
				<DataView data={data}>
					<div className="px-5">
						<br />
						<h2>Past 50 Days</h2>
						{data && <GraphChart data={prepStateData(data, "recovered")} />}
					</div>
				</DataView>
			</TabPanel>
		</div>
	);
};
export default CovidState;
