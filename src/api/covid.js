import { COVID_TRACKING_PROJECT_URL } from "./api";

// USA

const ALL_US_COVID_DATA_URL = "/v1/us/daily.json";
const CURRENT_US_COVID_DATA_URL = "/v1/us/current.json";
const ALL_STATES_COVID_DATA_URL = "/v1/states/daily.json";
const CURRENT_STATE_COVID_DATA_URL = "/v1/states/current.json";

const getHistoricUSCovidData = () => {
	const url = `${COVID_TRACKING_PROJECT_URL}${ALL_US_COVID_DATA_URL}`;
	const response = fetch(url).then((data) => data.json());
	return response;
};
const getCurrentUSCovidData = () => {
	const url = `${COVID_TRACKING_PROJECT_URL}${CURRENT_US_COVID_DATA_URL}`;
	const response = fetch(url).then((data) => data.json());
	return response;
};
const getHistoricStatesData = () => {
	const url = `${COVID_TRACKING_PROJECT_URL}${ALL_STATES_COVID_DATA_URL}`;
	const response = fetch(url).then((data) => data.json());
	return response;
};
const getCurrentStatesData = () => {
	const url = `${COVID_TRACKING_PROJECT_URL}${CURRENT_STATE_COVID_DATA_URL}`;
	const response = fetch(url).then((data) => data.json());
	return response;
};

export {
	getHistoricUSCovidData,
	getCurrentUSCovidData,
	getHistoricStatesData,
	getCurrentStatesData,
};
