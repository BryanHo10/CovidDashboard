import React, { useEffect, useState } from "react";
import USAMap from "react-usa-map";
import "./CovidMap.css";
import { getCurrentStatesData } from "../../api/covid";
import CovidState from "./CovidState";

const CovidMap = () => {
	const [covidStatesConfig, setCovidStatesConfig] = useState({});
	const [currentState, setCurrentState] = useState(null);

	useEffect(() => {
		getCurrentStatesData().then((data) => {
			setCovidStatesConfig(generateStatesConfig(data));
		});
	}, []);

	const generateClickHandler = (stateData) => {
		return (event) => {
			setCurrentState(stateData);
		};
	};
	const generateStatesConfig = (covidStates) => {
		let config = {};
		covidStates.forEach((stateData) => {
			const brightness = Math.abs(100 - Math.log(stateData.death) * 8.5);
			config[stateData.state] = {
				fill: `hsl(26, 100%, ${brightness}%)`,
				clickHandler: generateClickHandler(stateData),
			};
		});
		return config;
	};

	return (
		<div>
			<div>{currentState && <CovidState stateData={currentState} />}</div>
			<div className="covid-map">
				<USAMap customize={covidStatesConfig} />
			</div>
		</div>
	);
};
export default CovidMap;
