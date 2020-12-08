import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./css/navbar.css";
import { Container, Icon, Image, Menu } from "semantic-ui-react";

const Navbar = ({ user }) => {
	return (
		<nav>
			<Menu stackable inverted borderless style={{ backgroundColor: "#b58542" }} width={5} size="huge">
				<Container>
					<Menu.Item as={Link} to="/">
						<div className="logo">
							<img src={require("../images/logo.svg")} alt="logo" />
							<strong>Diary-APP</strong>
						</div>
					</Menu.Item>
					<Menu.Item as={NavLink} to="/about">
						About
					</Menu.Item>
					{user && (
						<React.Fragment>
							<Menu.Item as={NavLink} to={`/search`}>
								Search
							</Menu.Item>
							<Menu.Item as={NavLink} to={`/user/${user._id}`} position="right">
								{user.name}
							</Menu.Item>
							<Menu.Item as={NavLink} to="/signout">
								Sign Out
							</Menu.Item>
						</React.Fragment>
					)}
					{!user && (
						<React.Fragment>
							<Menu.Item as={NavLink} to="/signin" position="right">
								Sign In
							</Menu.Item>
							<Menu.Item as={NavLink} to="/signup">
								Sign Up
							</Menu.Item>
						</React.Fragment>
					)}
				</Container>
			</Menu>
		</nav>
	);
};

export default Navbar;
