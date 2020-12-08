import React from "react";
import "./css/home.css";
import { Button, Container, Divider } from "semantic-ui-react";
import PageHeader from "./common/PageHeader";
import { Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import userService from "../services/userService";

const Home = () => {
	const curUser = userService.getCurrentUser();

	return (
		<React.Fragment>
			<div className="home-main">
				<Container textAlign="center" className="home-container">
					<PageHeader title="Welcome to Diary-App!" desc="Journal your thoughts and feelings and share it with the world." icon="book" />
					{!curUser && (
						<React.Fragment>
							<Header as="h2" textAlign="center">
								Join us now!
							</Header>
							<Button as={Link} to="/signup" size="huge" primary>
								Sign up
							</Button>
							<Divider hidden />
							<p>
								Already have an account?
								<Link to="/signin"> Sign in</Link>
							</p>
						</React.Fragment>
					)}
					{curUser && (
						<React.Fragment>
							<Header as="h2" textAlign="center">
								Want to share something?
							</Header>
							<Button as={Link} to="/add-entry" size="huge" primary>
								Write an Entry
							</Button>
						</React.Fragment>
					)}
				</Container>
			</div>
		</React.Fragment>
	);
};

export default Home;
