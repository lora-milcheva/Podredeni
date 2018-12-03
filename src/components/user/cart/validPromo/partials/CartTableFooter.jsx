import React from 'react';

import { CART, CURRENCY } from '../../../../../data/constants/componentConstants';

class CartTableFooter extends React.Component {
	constructor (props) {
		super(props);
	}
	render() {

		let resolution = this.props.resolution;
		let totalSum = this.props.totalSum;
		let colSpan = this.props.colSpan;

		return (
			<div className="table-footer">

				{CART.totalSum}&nbsp;{totalSum}&nbsp;{CURRENCY}

			</div>
		);
	}
}

export default CartTableFooter;
