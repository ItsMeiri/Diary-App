import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Confirm, Container, Dropdown, Icon } from "semantic-ui-react";
import userService from "../../services/userService";
import "../css/entry.css";

const Entry = ({ title, author, content, feeling, id, visible, history, showAuthor }) => {
	const [open, setOpen] = useState(false);
	const [faved, setFaved] = useState(false);
	const [favIndex, setFavIndex] = useState(-1);
	let [favoriteList, setFavoriteList] = useState([]);
	let curUser = userService.getCurrentUser();

	const toggleFavorite = async () => {
		setFaved(faved => !faved);
		if (!faved) {
			let fav = await Axios.post(`http://localhost:4000/api/users/favorites/${id}`, { headers: { "Content-Type": "application/json", "x-auth-token": userService.getJwt() } });
		} else {
			let unfav = await Axios.delete(`http://localhost:4000/api/users/favorites/${id}`, { headers: { "Content-Type": "application/json", "x-auth-token": userService.getJwt() } });
		}
	};

	const isFaved = async () => {
		const userFavorites = await userService.getFavoritesList();
		let index = userFavorites.findIndex(entry => entry._id === id);
		index >= 0 ? setFaved(true) : setFaved(false);
		setFavIndex(index);
		setFavoriteList(userFavorites);
	};

	useEffect(() => {
		isFaved();
	}, []);

	return (
		<React.Fragment>
			<Container className="entry-container">
				<div className="favorite-icon" onClick={toggleFavorite}>
					<Icon name={`star${faved ? "" : " outline"}`} />
				</div>
				<div className="entry-texts">
					<h3 className="entry-title">{title}</h3>
					<p className="entry-content">{content}</p>
					{showAuthor && (
						<small className="entry-author">
							By: <Link to={`/user/${favoriteList[favIndex]?.user_id?._id}`}>{favoriteList[favIndex]?.user_id?.name}</Link>{" "}
						</small>
					)}
				</div>
				<div className="icon-container">{feeling === "happy" ? <Icon className="entry-feeling" size="huge" color="green" name="smile outline"></Icon> : feeling === "neutral" ? <Icon className="entry-feeling" size="huge" color="orange" name="meh outline"></Icon> : <Icon className="entry-feeling" size="huge" color="red" name="frown outline"></Icon>}</div>
				{visible && (
					<div className="options-icon">
						<Dropdown icon="dropdown">
							<Dropdown.Menu>
								<Dropdown.Item as={Link} to={{ pathname: "/edit-entry", state: { entry_id: id, title, content, feeling } }} text="Edit" />
								<Dropdown.Item onClick={() => setOpen(true)} text="Delete" />
								<Confirm open={open} onCancel={() => setOpen(false)} onConfirm={() => history.push("/delete-entry", { entry_id: id })} />
							</Dropdown.Menu>
						</Dropdown>
					</div>
				)}
			</Container>
		</React.Fragment>
	);
};

export default Entry;
