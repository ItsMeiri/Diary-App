import React, { useState } from "react";
import Joi from "joi-browser";
import { Button, Container, Divider, Form, Header, Icon, Input, Message } from "semantic-ui-react";
import userService, { login } from "../services/userService";
import { Redirect } from "react-router-dom";
import { getCurrentUser } from "./../services/userService";

const Signin = ({ user }) => {
	const [values, setValues] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
	const [submit, setSubmit] = useState(false);
	const [submitError, setSubmitError] = useState("");
	const [submitSuccess, setSubmitSuccess] = useState(false);

	let errorStyle = {
		color: "red",
		display: "block",
		marginTop: "0.75em",
		marginBottom: "-1em",
	};

	let schema = {
		email: Joi.string().required().min(6).max(255).email().label("Email"),
		password: Joi.string().required().min(6).max(1024).label("Password"),
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		const errorMsg = validateField(name, value);

		if (errorMsg) {
			setErrors({ ...errors, [name]: errorMsg });
		} else {
			delete errors[name];
		}

		setValues({ ...values, [name]: value });
	};

	const doSubmit = e => {
		e.preventDefault();

		setErrors({});
		let formErrors = validateForm();
		if (formErrors) {
			setErrors(formErrors);
		} else {
			setSubmit(true);
			login(values.email, values.password)
				.then(data => {
					setSubmitSuccess(true);
					setSubmitError("");
					const userId = userService.getCurrentUser()._id;
					window.location = `/user/${userId}`;
				})
				.catch(error => {
					setSubmitSuccess(false);
					setSubmitError(error.response.data);
				});
			setSubmit(false);
		}
	};

	const validateField = (name, value) => {
		let field = { [name]: value };
		let fieldSchema = { [name]: schema[name] };
		const { error } = Joi.validate(field, fieldSchema);
		return error ? error.details[0].message : null;
	};

	const validateForm = () => {
		let validation = Joi.validate(values, schema, { abortEarly: false });
		const { error } = validation;
		if (!error) return null;
		const formErrors = {};
		for (let item of error.details) {
			formErrors[item.path[0]] = item.message;
		}
		return formErrors;
	};

	if (user) {
		return <Redirect to={{ pathname: "/" }} />;
	}

	return (
		<React.Fragment>
			<Header as="h1" icon textAlign="center" size="huge" style={{ marginTop: "1em", color: "#6391D6" }}>
				<Icon name="write" style={{ marginBottom: "0.3em" }} />
				<Header.Content>Sign In</Header.Content>
				<Header.Subheader>
					<strong>Sign in to add entries.</strong>
				</Header.Subheader>
			</Header>
			<Container as="div" text>
				<Form method="POST" loading={submit} noValidate autoComplete="off" onSubmit={doSubmit}>
					{submitError && <Message negative icon="user x" content={submitError} />}
					{submitSuccess && <Message positive icon="user plus" content="Logged in succesfully!" />}
					<Input onChange={handleInputChange} fluid size="large" label="Email *" type="email" name="email" placeholder="Email" defaultValue={values["email"]} />
					{errors["email"] ? <span style={errorStyle}>{errors["email"]}</span> : <span style={errorStyle}> </span>}
					{/* <Input required fluid size="large" label="Email *" type="email" name="email" /> */}
					<Divider hidden />
					<Input onChange={handleInputChange} required fluid size="large" label="Password *" type="password" name="password" placeholder="password" defaultValue={values["password"]} />
					{errors["password"] ? <span style={errorStyle}>{errors["password"]}</span> : <span style={errorStyle}> </span>}
					{/* <Input required fluid size="large" label="Password *" type="password" name="password" ref={register} /> */}
					<Divider hidden />
					<Container textAlign="center">
						<Button size="huge" style={{ backgroundColor: "#6391D6" }} inverted>
							Sign in
						</Button>
					</Container>
				</Form>
			</Container>
		</React.Fragment>
	);
};

export default Signin;
