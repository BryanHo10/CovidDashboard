import { Box, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getHistoricStateData } from "../../api/covid";
import { getStateByAbbr } from "../../utils/format";

const TabPanel = ({ children, value, index, ...other }) => {
	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
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
	const [value, setValue] = useState("one");

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
					<Tab value="one" label="Number of Deaths" />
					<Tab value="two" label="Number of Positive Cases" />
					<Tab value="three" label="Number Recovered" />
				</Tabs>
			</Paper>
			<TabPanel value={value} index="one">
				Number of Deaths
			</TabPanel>
			<TabPanel value={value} index="two">
				Number of Positive Cases
			</TabPanel>
			<TabPanel value={value} index="three">
				Number Recovered
			</TabPanel>
		</div>
	);
};
export default CovidState;
