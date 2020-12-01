import { Paper, Tab, Tabs } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getHistoricStateData } from "../../api/covid";
import { getStateByAbbr } from "../../utils/format";

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

	useEffect(() => {
		getHistoricStateData(state.toLowerCase()).then((data) => {
			console.log(data);
		});
	}, []);

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
					<Tab value="positve" label="Number of Positive Cases" />
					<Tab value="recover" label="Number Recovered" />
				</Tabs>
			</Paper>
			<TabPanel value={value} index="deaths">
				Number of Deaths
			</TabPanel>
			<TabPanel value={value} index="positve">
				Number of Positive Cases
			</TabPanel>
			<TabPanel value={value} index="recover">
				Number Recovered
			</TabPanel>
		</div>
	);
};
export default CovidState;
