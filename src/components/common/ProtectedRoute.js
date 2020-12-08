import React from "react";
import { Route, Redirect } from "react-router-dom";
import userService from "../../services/userService";

const ProtectedRoute = ({ path, component: Component, user, render, ...rest }) => {
	let curUser = userService.getCurrentUser();
	return (
		<Route
			{...rest}
			render={props => {
				if (!curUser) {
					return <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />;
				}

				return Component ? <Component {...props} user={user} id={props.match.params.id} /> : render(props);
			}}
		/>
	);
};

export default ProtectedRoute;
