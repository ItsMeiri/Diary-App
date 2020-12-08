import Axios from "axios";
import "./css/UserEntries.css";
import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown, Item, Message } from "semantic-ui-react";
import userService from "../services/userService";
import PageHeader from "./common/PageHeader";
import Entry from "./common/Entry";
import { Link } from "react-router-dom";

const UserEntries = props => {
	const [foundUser, setFoundUser] = useState(null);
	const [filterArr, setFilterArr] = useState("all");

	const curUser = userService.getCurrentUser();
	const filterArrOptions = [
		{
			key: "happy",
			text: "happy",
			value: "happy",
			label: { color: "green" },
		},
		{
			key: "neutral",
			text: "neutral",
			value: "neutral",
			label: { color: "orange" },
		},
		{
			key: "sad",
			text: "sad",
			value: "sad",
			label: { color: "red" },
		},
		{
			key: "all",
			text: "all",
			value: "all",
			label: { color: "brown" },
		},
	];

	const { id: urlUserId } = props;

	useEffect(() => {
		getUser();
	}, [urlUserId]);

	const getUser = async () => {
		try {
			const { data } = await Axios.get(`http://localhost:4000/api/users/${urlUserId}`, { headers: { "x-auth-token": userService.getJwt() } });
			setFoundUser(data);
		} catch {
			setFoundUser(null);
		}
	};

	// const checkIfFaved = async entry_id => {
	// 	const curUserFavorites = await userService.getFavoritesList();
	// 	console.log(curUserFavorites);
	// 	console.log(curUserFavorites.indexOf(entry_id) >= 0);

	// 	return curUserFavorites.indexOf(entry_id) >= 0 ? true : false;
	// };
	return foundUser ? (
		<React.Fragment>
			<Container className="profile_item">
				<Item.Group>
					<Item>
						<Item.Image size="small" wrapped src={foundUser.picture_uri} />
						<Item.Content>
							<Item.Header className="profile_name">{foundUser.name}</Item.Header>
							<Item.Description className="profile_description">Birthday: {new Date(foundUser.birthday).toLocaleDateString("he-IL").replace(/\./g, "/")}</Item.Description>
						</Item.Content>
					</Item>
				</Item.Group>
				<div className="user-control-wrapper">
					{urlUserId === curUser._id && (
						<Button className="user-control-button" as={Link} to={{ pathname: "/add-entry" }} inverted>
							Add a new Entry
						</Button>
					)}
					<Button className="user-control-button" as={Link} to={{ pathname: `/user/${foundUser._id}/favorites` }} inverted>
						My Favorites
					</Button>
					<Button className="user-control-button" as="a" href={`mailto:${foundUser.email}`} inverted>
						Contact Me
					</Button>
				</div>
			</Container>
			<Container text textAlign="right">
				<div>
					<span>Show me entries that are {"  "}</span>
					<Dropdown inline options={filterArrOptions} defaultValue={filterArrOptions[3].value} onChange={(e, { value }) => setFilterArr(value)} />
				</div>
			</Container>
			<Container>
				{!foundUser.entries.filter(entry => (filterArr !== "all" ? filterArr === entry.feeling : true)).length ? (
					<Message size="huge" content="There are no entries" />
				) : (
					foundUser.entries
						.filter(entry => (filterArr !== "all" ? filterArr === entry.feeling : true))
						.map(entry => (
							<Entry
								key={entry._id}
								visible={urlUserId === curUser._id}
								author={foundUser}
								id={entry._id}
								title={entry.title}
								content={entry.content}
								feeling={entry.feeling}
								history={props.history}
								showAuthor={false}
								// isFaved={() => checkIfFaved(entry._id)}
							/>
						))
						.reverse()
				)}
			</Container>
		</React.Fragment>
	) : (
		<PageHeader title="User not found" desc="The requested user page is not available" icon="user close" />
	);
};

export default UserEntries;
