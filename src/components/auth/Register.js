import React from 'react';
import { withRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastr';

import { Grid, Form, FormGroup, Col, Button } from 'react-bootstrap';

import FormInputField from '../common/formComponents/FormInputField';

import authService from '../../services/auth/authService';

import constants from '../../data/constants/componentConstants';

class Register extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			confirmPassword: ''
		};
	}

	getData (e) {
		this.setState({[e.target.name]: e.target.value});
	}

	registerUser = (e) => {
		e.preventDefault();

		if (this.state.password !== this.state.confirmPassword) {
			this.toastContainer.error(constants.ERROR_MESSAGES.passwordsMismatch, '', {
				closeButton: true,
			});
			return
		}

		authService
			.register(this.state)
			.then(res => {
				console.log(res);

				this.props.history.push('/login');
			})
			.catch(err => console.log(err));
	};

	handleChange = (e) => {
		this.setState({[e.target.name] : e.target.value})
	};

	cancelRegistration = () => {
		this.setState({
			email: '',
			password: '',
			confirmPassword: ''
		});

		this.props.history.go(-1);
	};

	render () {

		return (
			<Grid>
				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				<Col xs={12} md={4}>
					<Form onSubmit={this.registerUser}>
						<h1>{constants.USER_ACCOUNT.register}</h1>

						<FormInputField
							label={constants.USER_ACCOUNT.email}
							name="email"
							type="email"
							value={this.state.email}
							required={true}
							onChange={this.handleChange}/>


						<FormInputField
							label={constants.USER_ACCOUNT.password}
							name="password"
							type="password"
							value={this.state.password}
							required={true}
							onChange={this.handleChange}/>


						<FormInputField
							label={constants.USER_ACCOUNT.confirmPassword}
							name="confirmPassword"
							type="password"
							value={this.state.confirmPassword}
							required={true}
							onChange={this.handleChange}/>


						<FormGroup>
							<Button onClick={this.cancelRegistration}>{constants.USER_ACCOUNT.cancel}</Button>
							<Button type="reset">Reset</Button>
							<Button type="submit" bsStyle="primary">{constants.USER_ACCOUNT.register}</Button>
						</FormGroup>
					</Form>
				</Col>
			</Grid>

		);
	}
}

export default withRouter(Register);