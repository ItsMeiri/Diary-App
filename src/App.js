import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Signup from "./components/Signup";

import "./App.css";
import { Route, Switch } from "react-router-dom";
import Signin from "./components/Signin";
import { getCurrentUser, getJwt } from "./services/userService";
import Axios from "axios";
import Signout from "./components/Signout";
import UserEntries from "./components/UserEntries";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AddEntry from "./components/AddEntry";
import DeleteEntry from "./components/DeleteEntry";
import EditEntry from "./components/EditEntry";
import Search from "./components/Search";
import UserFavorites from "./components/UserFavorites";
import About from "./components/common/About";

Axios.defaults.headers.common["x-auth-token"] = getJwt();

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		async function setUserState() {
			const { data } = await Axios.get("http://localhost:4000/api/users/me");
			if (data._id) {
				setUser(data);
			} else {
				setUser(null);
			}
		}
		const userJwt = getCurrentUser();
		if (userJwt) {
			setUserState();
		}
	}, []);

	return (
		<React.Fragment>
			<div className="App">
				<header>
					<Navbar user={user} />
				</header>
				<main style={{ minHeight: "90vh" }}>
					<Switch>
						<ProtectedRoute exact path="/search" user={user} component={Search}></ProtectedRoute>
						<ProtectedRoute exact path="/user/:id/favorites" user={user} component={UserFavorites}></ProtectedRoute>
						<ProtectedRoute exact path="/user/:id" user={user} component={UserEntries}></ProtectedRoute>
						<ProtectedRoute exact path="/signout" user={user} component={Signout}></ProtectedRoute>
						<ProtectedRoute exact path="/add-entry" user={user} component={AddEntry}></ProtectedRoute>
						<ProtectedRoute exact path="/delete-entry" user={user} component={DeleteEntry}></ProtectedRoute>
						<ProtectedRoute exact path="/edit-entry" user={user} component={EditEntry}></ProtectedRoute>
						<Route exact path="/signup" user={user} render={props => <Signup {...props} user={user} />}></Route>
						<Route exact path="/signin" user={user} render={props => <Signin {...props} user={user} />}></Route>
						<Route exact path="/about" component={About}></Route>
						<Route exact path="/" component={Home}></Route>
					</Switch>
				</main>
				<Footer />
			</div>
		</React.Fragment>
	);
}

export default App;
