import React from "react";
import { Segment } from "semantic-ui-react";

const Footer = () => {
	return (
		<footer style={{ position: "relative", bottom: "0", width: "100%" }}>
			<Segment content="All rights reserved 2020 &copy;" textAlign="center" inverted style={{ backgroundColor: "#b58542" }} />
		</footer>
	);
};

export default Footer;
