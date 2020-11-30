const formatTitleCase = (str) => {
	return str.replace(
		/\w\S*/g,
		(txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	);
};
const formatReadableNumber = (number) => {
	return new Intl.NumberFormat("en-US").format(number);
};

export { formatTitleCase, formatReadableNumber };
