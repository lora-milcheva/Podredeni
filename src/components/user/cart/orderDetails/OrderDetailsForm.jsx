import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Checkbox, Button } from 'react-bootstrap';

import { ToastContainer } from 'react-toastr';

import RecipientDetails from './recipientDetails/RecipientDetails';
import DeliveryToEkontOffice from './deliveryDetails/DeliveryToEkontOffice';
import DeliveryToAddress from './deliveryDetails/DeliveryToAddress';
import DeliveryOptions from './deliveryDetails/DeliveryOptions';
import Comment from './comment/Comment';

class OrderDetails extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			recipientInfo: this.props.data.recipientInfo,
			ekontDetails: this.props.data.ekontDetails,
			addressDetails: this.props.data.addressDetails,
			comment: this.props.data.comment,
			toAddress: this.props.data.toAddress,
			termsAgreed: false
		};

		this.agreed = React.createRef();
	}

	updateInfo = (stateProp, data) => {
		this.setState({[stateProp]: data}, () => {
			this.props.onChange('orderDetails', this.state);
		});
	};

	handleCheckBox = (e) => {
		this.setState({termsAgreed: e.target.checked}, () => console.log(this.state));
	};

	submitInfo = (e) => {
		e.preventDefault();

		if (!this.state.termsAgreed) {
			this.toastContainer.warning('Моля, съгласете се с условията за ползване!', '', {
				closeButton: true,
			});

			this.agreed.current.focus();
			return;
		}

		this.props.continue();
	};

	render () {
		return (
			<form onSubmit={(e) => this.submitInfo(e)}>

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>

				<Row className="bg-light">
					<Col sm={12}>
						<h3>Данни за получателя</h3>
						<hr/>
						<RecipientDetails
							data={this.state.recipientInfo}
							onChange={this.updateInfo}/>
					</Col>
				</Row>

				<Row>
					<Col sm={12}>
						<h3>Данни за доставка</h3>
						<hr/>

						<DeliveryOptions
							onChange={this.updateInfo}
							toAddress={this.state.toAddress}/>

						<hr/>

						{!this.state.toAddress &&
						<DeliveryToEkontOffice
							data={this.state.ekontDetails}
							onChange={this.updateInfo}/>}

						{this.state.toAddress &&
						<DeliveryToAddress
							data={this.state.addressDetails}
							onChange={this.updateInfo}/>}
					</Col>
				</Row>

				<Row>
					<Col sm={12}>
						<h3>Допълнителна информация</h3>
						<hr/>
						<Comment
							data={this.state.comment}
							onChange={this.updateInfo}/>

						<label>
							<input type="checkbox"
							       ref={this.agreed}
							       name="termsAgreed"
							       defaultChecked={this.state.termsAgreed}
							       onChange={this.handleCheckBox}/>
							Съгласен/а съм с <Link to={'/products'} className="btn-link">Условията за
							ползване.</Link>
						</label>

					</Col>
				</Row>

				<Row className="buttons-container">
					<Col xs={3}>
						<Button bsStyle='default' onClick={this.props.cancelOrder}>Отказ</Button>
					</Col>
					<Col xs={9} className="text-right">
						<Button onClick={this.props.goBack}>Назад</Button>
						<Button bsStyle='primary' type="submit">Напред</Button>
					</Col>
				</Row>
			</form>
		);
	}
}

export default OrderDetails;
