import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { getCountyData } from "../../api/covid";
import { StateAbbrToLongName } from "../../utils/convert";
import StatsCards from "../Common/StatsCards";
const CountyView = ({ countyCode, stateCode }) => {
	const [countyData, setCountyData] = useState(null);
	useEffect(() => {
		getCountyData(countyCode).then((response) => {
			response.forEach((item) => {
				if (item.province === StateAbbrToLongName(stateCode)) {
					setCountyData(item);
				}
			});
		});
	}, [countyCode, stateCode]);
	return (
		<div>
			<h1>
				{countyCode},{stateCode}
			</h1>
			{countyData && (
				<Row>
					<StatsCards
						dataSource={countyData.stats}
						keysForRender={["confirmed", "deaths", "recovered"]}
					/>
				</Row>
			)}
		</div>
	);
};
export default CountyView;
