import { COVID_TRACKING_PROJECT_URL, NOVEL_COVID_API_URL } from "./api";

// USA

const ALL_US_COVID_DATA_URL = "/v1/us/daily.json";
const CURRENT_US_COVID_DATA_URL = "/v1/us/current.json";
const CURRENT_STATE_COVID_DATA_URL = "/v1/states/current.json";
const STATE_COUNTY_COVID_DATA_URL = "/v3/covid-19/jhucsse/counties";

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
const getHistoricStateData = (state) => {
	const STATE_ALL_COVID_DATA_URL = `/v1/states/${state}/daily.json`;
	const url = `${COVID_TRACKING_PROJECT_URL}${STATE_ALL_COVID_DATA_URL}`;
	const response = fetch(url).then((data) => data.json());
	return response;
};
const getCurrentStatesData = () => {
	const url = `${COVID_TRACKING_PROJECT_URL}${CURRENT_STATE_COVID_DATA_URL}`;
	const response = fetch(url).then((data) => data.json());
	return response;
};
const getCountyData = (countyCode) => {
	const url = `${NOVEL_COVID_API_URL}${STATE_COUNTY_COVID_DATA_URL}/${countyCode}`;
	const response = fetch(url).then((data) => data.json());
	return response;
};
export {
	getHistoricUSCovidData,
	getCurrentUSCovidData,
	getHistoricStateData,
	getCurrentStatesData,
	getCountyData,
};
