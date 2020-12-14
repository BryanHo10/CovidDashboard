import { Container, LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StateCounty_Models, US_STATES } from "../constants";
import NotFound from "./404";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import "./StateCounty.css";
import CountyView from "../components/County/County";

const STATE_CODES = US_STATES.map((state) => state.abbr);

const StateCounty = () => {
	const { stateCode } = useParams();
	const [loading, setLoading] = useState(false);
	const [currentCounty, setCurrentCounty] = useState(null);
	let map = null;

	useEffect(() => {
		map = am4core.create("chartdiv", am4maps.MapChart);

		map.geodata = StateCounty_Models[stateCode];

		map.projection = new am4maps.projections.Miller();

		var polygonSeries = map.series.push(new am4maps.MapPolygonSeries());

		polygonSeries.useGeodata = true;
		var polygonTemplate = polygonSeries.mapPolygons.template;
		polygonTemplate.tooltipText = "{name}";
		polygonTemplate.fill = am4core.color("#b26666");
		polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
		polygonTemplate.draggable = false;

		// Create hover state and set alternative fill color
		var hs = polygonTemplate.states.create("hover");
		hs.properties.fill = am4core.color("#7b2525");
		polygonTemplate.events.on("hit", renderCountyData);
	}, []);
	if (!STATE_CODES.includes(stateCode)) {
		return <NotFound />;
	}

	if (loading) {
		return (
			<div className="loading-bar">
				<LinearProgress color="secondary" />
				<div
					className="d-flex justify-content-center align-items-center flex-column"
					style={{ height: "90vh" }}
				>
					<div>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
							style={{ width: "350px" }}
						/>
					</div>
					<div>
						<h1>Loading Covid Data...</h1>
					</div>
				</div>
			</div>
		);
	}
	const renderCountyData = (e) => {
		setCurrentCounty(e.target.dataItem.dataContext.name);
		e.target.series.chart.zoomToMapObject(e.target, 2);
	};
	return (
		<div className="county-view">
			<Container>
				<div className="text-center">
					<h3>
						<Link to="/">{"<"} Go Back</Link>
					</h3>
				</div>

				<h1>Select a county in the current state ({stateCode})</h1>
				<div id="chartdiv"></div>
				{currentCounty && (
					<CountyView countyCode={currentCounty} stateCode={stateCode} />
				)}
			</Container>
		</div>
	);
};

export default StateCounty;
