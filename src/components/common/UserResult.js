import React from "react";
import { Redirect } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";

const UserResult = ({ name, email, id, birthday, picture_uri, history }) => {
	const userLink = () => {
		return history.push(`/user/${id}`);
	};

	return (
		<Card onClick={userLink}>
			<Image src={picture_uri} wrapped />
			<Card.Content>
				<Card.Header>{name}</Card.Header>
				<Card.Description>Birthday: {new Date(birthday).toLocaleDateString("he-IL").replace(/\./g, "/")}</Card.Description>
			</Card.Content>
		</Card>
	);
};

export default UserResult;
