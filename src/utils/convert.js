import { US_STATES } from "../constants";

const StateAbbrToLongName = (abbr) => {
	let full_name = null;
	if (typeof abbr !== "string") {
		return abbr;
	}
	US_STATES.forEach((item) => {
		if (abbr.toUpperCase() === item.abbr) {
			full_name = item.full_name;
		}
	});
	return full_name;
};
export { StateAbbrToLongName };
