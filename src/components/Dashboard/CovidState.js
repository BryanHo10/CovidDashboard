import { Paper, Tab, Tabs } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { head } from "lodash";
import moment from "moment";
import { getHistoricStateData } from "../../api/covid";
import { getStateByAbbr } from "../../utils/format";
import GraphChart from "../Common/Graph";

const TabPanel = ({ children, value, index, ...other }) => {
	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{value === index && <div>{children}</div>}
		</div>
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
			<h1>
				{getStateByAbbr(state)} ({state})
			</h1>
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
				<div>
					<h2>Past 50 Days</h2>
					{data && <GraphChart data={prepStateData(data, "death")} />}
				</div>
			</TabPanel>
			<TabPanel value={value} index="positive">
				<div>
					<h2>Past 50 Days</h2>
					{data && <GraphChart data={prepStateData(data, "positive")} />}
				</div>
			</TabPanel>
			<TabPanel value={value} index="recover">
				<div>
					<h2>Past 50 Days</h2>
					{data && <GraphChart data={prepStateData(data, "recovered")} />}
				</div>
			</TabPanel>
		</div>
	);
};
export default CovidState;
