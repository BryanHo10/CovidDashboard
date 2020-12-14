import { Container } from "@material-ui/core";
import Iframe from "react-iframe";
import React from "react";
const WorldData = () => {
	return (
		<Container>
			<Iframe
				url="https://public.domo.com/cards/aOm4g"
				width="100%"
				height="600px"
				marginheight="0"
				marginwidth="0"
				frameborder="0"
			/>
			<Iframe
				url="https://public.domo.com/cards/aAR5B"
				width="100%"
				height="600px"
				marginheight="0"
				marginwidth="0"
				frameborder="0"
			/>
		</Container>
	);
};
export default WorldData;
