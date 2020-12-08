import React from "react";
import { Divider, Header, Icon } from "semantic-ui-react";

const PageHeader = ({ title, desc, icon }) => {
	let headerStyle = {
		paddingBottom: "1.3em",
		paddingTop: "1.3em",
		marginBottom: "1.3em",
		marginTop: "1.3em",
		lineHeight: "1.5",
	};

	return (
		<React.Fragment>
			<Header as="h1" icon textAlign="center" color="blue" size="huge" style={{ marginTop: "1em" }}>
				<Icon name={icon} style={{ marginBottom: "0.3em" }} />
				<Header.Content style={(headerStyle, { fontSize: "2em" })}>{title}</Header.Content>
				<Header.Subheader style={headerStyle}>
					<strong>{desc}</strong>
				</Header.Subheader>
			</Header>
			<Divider />
		</React.Fragment>
	);
};

export default PageHeader;
