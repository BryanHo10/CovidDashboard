import React from "react";
import { Col, Nav, Navbar, Row } from "react-bootstrap";

const Layout = ({ children }) => {
	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="/">
					COVID-19 Data | United States of America
				</Navbar.Brand>
				<Nav className="ml-auto">
					<Nav.Link href="/world">World Data</Nav.Link>
				</Nav>
			</Navbar>
			{children}
			<div className="text-right py-3 px-5 ">
				{" "}
				<strong className="h5">&copy; 2020 Bryan Ho and Matthieu Tran </strong>
			</div>
		</>
	);
};
export default Layout;
