import React from 'react';
import userService from '../services/userService';
import { useState } from 'react';
import {
	Container,
	Form,
	Header,
	Label,
	Radio,
	Segment,
	TextArea,
} from 'semantic-ui-react';
import './css/addEntry.css';
import { Icon } from 'semantic-ui-react';
import { Message } from 'semantic-ui-react';
import { Divider } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import Joi from 'joi-browser';
import Axios from 'axios';
import serverUrl from '../services/serverUrl';

const AddEntry = () => {
	let curUser = userService.getCurrentUser();
	const [values, setValues] = useState({
		title: '',
		content: '',
		feeling: '',
	});

	const [errors, setErrors] = useState({});
	const [submit, setSubmit] = useState(false);
	const [submitError, setSubmitError] = useState('');
	const [submitSuccess, setSubmitSuccess] = useState(false);

	let errorStyle = {
		color: 'red',
	};

	let schema = {
		title: Joi.string().required().min(6).max(32),
		content: Joi.string().required().min(6).max(1024),
		feeling: Joi.string()
			.required()
			.valid('happy', 'sad', 'neutral'),
	};

	const handleInputChange = (e, { value, name }) => {
		const errorMsg = validateField(name, value);

		if (errorMsg) {
			setErrors({ ...errors, [name]: errorMsg });
		} else {
			delete errors[name];
		}

		setValues({ ...values, [name]: value });
	};

	const doSubmit = (e) => {
		e.preventDefault();

		setErrors({});
		let formErrors = validateForm();
		if (formErrors) {
			setErrors(formErrors);
		} else {
			setSubmit(true);
			Axios.post(`${serverUrl}/api/entries`, values, {
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': userService.getJwt(),
				},
			})
				.then((resp) => {
					setSubmitSuccess(true);
					setSubmitError('');
					window.location = `/user/${curUser._id}`;
				})
				.catch((err) => {
					console.log(err);
					setSubmitSuccess(false);
					setSubmitError(err.response.data);
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
				<Header.Content>Add an Entry</Header.Content>
				<Header.Subheader>
					<strong>Add an entry to your jornal.</strong>
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
							content="Entry added successfully!"
						/>
					)}
					<Form.Field
						id="title-input"
						name="title"
						control={Input}
						label="Title *"
						placeholder="Title *"
						onChange={handleInputChange}
					/>
					{errors['title'] && (
						<span style={errorStyle}>
							{errors['title']}
						</span>
					)}
					{/* <Input required fluid size="large" label="Title *" type="title" name="title" /> */}
					<Divider hidden />
					<Form.Field
						id="content-input"
						name="content"
						control={TextArea}
						label="Content *"
						placeholder="Content"
						onChange={handleInputChange}
					/>
					{errors['content'] && (
						<span style={errorStyle}>
							{errors['content']}
						</span>
					)}
					<Divider hidden />
					<Container
						textAlign="center"
						className="radio-container"
					>
						<Form.Field
							className="radio-feeling"
							name="feeling"
							control={Radio}
							label={
								<Icon
									name="smile outline"
									size="huge"
									color={
										values.feeling === 'happy'
											? 'green'
											: 'grey'
									}
								/>
							}
							value="happy"
							onClick={handleInputChange}
						/>
						<Form.Field
							className="radio-feeling"
							name="feeling"
							control={Radio}
							label={
								<Icon
									name="meh outline"
									size="huge"
									color={
										values.feeling === 'neutral'
											? 'orange'
											: 'grey'
									}
								/>
							}
							value="neutral"
							onClick={handleInputChange}
						/>
						<Form.Field
							className="radio-feeling"
							name="feeling"
							control={Radio}
							label={
								<Icon
									name="frown outline"
									size="huge"
									color={
										values.feeling === 'sad'
											? 'red'
											: 'grey'
									}
								/>
							}
							value="sad"
							onClick={handleInputChange}
						/>
					</Container>
					{errors['feeling'] && (
						<span style={errorStyle}>
							"feeling" must by happy, sad or neutral
						</span>
					)}
					<Divider hidden />
					<Container textAlign="center">
						<Button
							size="huge"
							style={{ backgroundColor: '#6391D6' }}
							inverted
						>
							Add
						</Button>
					</Container>
				</Form>
			</Container>
		</React.Fragment>
	);
};

export default AddEntry;
