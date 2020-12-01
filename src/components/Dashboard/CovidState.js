import React from "react";
import { getStateByAbbr } from "../../utils/format";

const CovidState = ({ stateData }) => {
	const {
		daeath,
		positive,
		recovered,
		negative,
		hospitalized,
		state,
	} = stateData;
	return (
		<div>
			<h1>
				{getStateByAbbr(state)} ({state})
			</h1>
		</div>
	);
};
export default CovidState;
