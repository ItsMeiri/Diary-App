import React from "react";
import { Link } from "react-router-dom";
import "../css/about.css";
import { Container } from "semantic-ui-react";

const About = () => {
	return (
		<div className="about-main">
			<Container text>
				<h1 className="about-title">About Us</h1>
				<div>
					<h2 className="about-content-title">Welcome to Diary-APP!</h2>
					<p className="about-content">
						This is your go to place to share what's on your mind and heart! <br />
						You can categorize your entries by how you feel, so you can come back to all your happy, sad or neutral memories in the future. <br />
						You can visit other people's diaries and mark your favorite entries. <br /> Encountered someone with many sad entries? Send them an Email and share your positivity! <br />
						If you haven't already, sign up <Link to="/signup">here</Link>!
					</p>
				</div>
			</Container>
		</div>
	);
};

export default About;
