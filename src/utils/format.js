import { US_STATES } from "../constants";
import { isEmpty, head } from "lodash";

const formatTitleCase = (str) => {
	const s = str.replace(/([A-Z])/g, " $1").trim();
	return s.replace(
		/\w\S*/g,
		(txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	);
};
const formatReadableNumber = (number) => {
	return new Intl.NumberFormat("en-US").format(number);
};
const getStateByAbbr = (abbr) => {
	const filteredView = US_STATES.filter((state) => state.abbr === abbr);
	if (!isEmpty(filteredView)) return head(filteredView).full_name;
	return abbr;
};
export { formatTitleCase, formatReadableNumber, getStateByAbbr };
