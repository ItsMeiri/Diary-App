import Axios from "axios";
import React from "react";
import { Redirect } from "react-router-dom";
import userService from "../services/userService";

const DeleteEntry = props => {
	const curUser = userService.getCurrentUser();

	console.log(props);
	if (!props.location.state) return <Redirect to={{ pathname: "/" }}></Redirect>;
	const entryId = props.history.location.state.entry_id;
	console.log(entryId);

	Axios.delete(`http://localhost:4000/api/entries/${entryId}`, { headers: { "Content-Type": "application/json", "x-auth-token": userService.getJwt() } })
		.then(() => {
			console.log("success!");
			return <Redirect to={{ pathname: `/user/${curUser._id}` }}></Redirect>;
		})
		.catch(err => console.log(err));

	return <Redirect to={`/user/${curUser._id}`} />;
};

export default DeleteEntry;
