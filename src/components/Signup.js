import React, { useState } from 'react';
import Joi from 'joi-browser';
import {
	Button,
	Container,
	Divider,
	Form,
	Header,
	Icon,
	Input,
	Message,
} from 'semantic-ui-react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import serverUrl from '../services/serverUrl';

const Signup = (props) => {
	let errorStyle = {
		color: 'red',
	};

	const [values, setValues] = useState({
		email: '',
		name: '',
		password: '',
		birthday: '',
		picture_uri: '',
	});
	const [errors, setErrors] = useState({});
	const [submit, setSubmit] = useState(false);
	const [submitError, setSubmitError] = useState('');
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const schema = {
		email: Joi.string()
			.required()
			.min(6)
			.max(255)
			.email()
			.label('Email'),
		password: Joi.string()
			.required()
			.min(6)
			.max(1024)
			.label('Password'),
		name: Joi.string()
			.required()
			.min(3)
			.max(255)
			.label('Name'),
		picture_uri: Joi.string()
			.min(6)
			.max(1024)
			.uri()
			.allow('')
			.label('Picture'),
		birthday: Joi.date()
			.max('now')
			.required()
			.label('Birthday'),
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const errorMsg = validateField(name, value);

		if (errorMsg) {
			setErrors({ ...errors, [name]: errorMsg });
		} else {
			delete errors[name];
		}

		setValues({ ...values, [name]: value });
	};

	function doSubmit(e) {
		e.preventDefault();

		setErrors({});
		let formErrors = validateForm();
		if (formErrors) {
			setErrors(formErrors);
		} else {
			setSubmit(true);
			if (values['picture_uri'] === '')
				delete values['picture_uri'];
			Axios.post(`${serverUrl}/api/users`, values)
				.then((data) => {
					setSubmitError('');
					setSubmitSuccess(true);
					setValues({
						email: '',
						name: '',
						password: '',
						birthday: '',
						picture_uri: '',
					});
					props.history.replace('/signin');
				})
				.catch((error) => {
					setSubmitSuccess(false);
					setSubmitError(error.response.data);
				});
			setSubmit(false);
		}
	}

	const validateForm = () => {
		let validation = Joi.validate(values, schema, {
			abortEarly: false,
		});
		const { error } = validation;
		if (!error) return null;
		const formErrors = {};
		for (let item of error.details) {
			formErrors[item.path[0]] = item.message;
		}
		return formErrors;
	};

	const validateField = (name, value) => {
		let field = { [name]: value };
		let fieldSchema = { [name]: schema[name] };
		const { error } = Joi.validate(field, fieldSchema);
		return error ? error.details[0].message : null;
	};

	if (props.user) {
		return <Redirect to={{ pathname: '/' }} />;
	}

	return (
		<React.Fragment>
			<Header
				as="h1"
				icon
				textAlign="center"
				size="huge"
				style={{ marginTop: '1em', color: '#6391D6' }}
			>
				<Icon
					name="write"
					style={{ marginBottom: '0.3em' }}
				/>
				<Header.Content>Sign up</Header.Content>
				<Header.Subheader>
					<strong>
						Sign up to start managing your jornal now!
					</strong>
				</Header.Subheader>
			</Header>
			<Container as="div" text>
				<Form
					method="POST"
					loading={submit}
					noValidate
					autoComplete="off"
					onSubmit={doSubmit}
				>
					{submitError && (
						<Message
							negative
							icon="user x"
							content={submitError}
						/>
					)}
					{submitSuccess && (
						<Message
							positive
							icon="user plus"
							content="User created!"
						/>
					)}
					<Input
						onChange={handleInputChange}
						fluid
						size="large"
						label="Email *"
						type="email"
						name="email"
						placeholder="Email"
						defaultValue={values['email']}
					/>
					{errors['email'] && (
						<span style={errorStyle}>
							{errors['email']}
						</span>
					)}
					{/* <Input required fluid size="large" label="Email *" type="email" name="email" /> */}
					<Divider hidden />
					<Input
						onChange={handleInputChange}
						required
						fluid
						size="large"
						label="Password *"
						type="password"
						name="password"
						placeholder="password"
						defaultValue={values['password']}
					/>
					{errors['password'] && (
						<span style={errorStyle}>
							{errors['password']}
						</span>
					)}
					{/* <Input required fluid size="large" label="Password *" type="password" name="password" ref={register} /> */}
					<Divider hidden />
					<Input
						onChange={handleInputChange}
						required
						fluid
						size="large"
						label="Name *"
						type="text"
						name="name"
						placeholder="Full Name"
						defaultValue={values['name']}
					/>
					{errors['name'] && (
						<span style={errorStyle}>{errors['name']}</span>
					)}
					{/* <Input required fluid size="large" label="Name *" type="text" name="name" ref={register} /> */}
					<Divider hidden />
					<Input
						onChange={handleInputChange}
						required
						fluid
						size="large"
						label="Birthday *"
						type="date"
						name="birthday"
						defaultValue={values['birthday']}
					/>
					{errors['birthday'] && (
						<span style={errorStyle}>
							{errors['birthday']}
						</span>
					)}
					{/* <Input required fluid size="large" label="Birthday *" type="date" name="birthday" placeholder="7 Nov 1997" ref={register} /> */}
					<Divider hidden />
					<Input
						onChange={handleInputChange}
						fluid
						size="large"
						label="Picture URL"
						type="text"
						name="picture_uri"
						placeholder="Profile Picture (URL)"
						defaultValue={values['picture_uri']}
					/>
					{errors['picture_uri'] && (
						<span style={errorStyle}>
							{errors['picture_uri']}
						</span>
					)}
					{/* <Input fluid size="large" label="Picture URL" type="text" name="picture_uri" ref={register} /> */}
					<Divider hidden />
					<Container textAlign="center">
						<Button
							size="huge"
							style={{ backgroundColor: '#6391D6' }}
							inverted
						>
							Sign up
						</Button>
					</Container>
				</Form>
			</Container>
		</React.Fragment>
	);
};

export default Signup;
