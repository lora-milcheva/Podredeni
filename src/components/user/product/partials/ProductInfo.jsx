import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Grid, PageHeader, Image, Label, Tabs, Tab } from 'react-bootstrap';

class ProductInfo extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		const product = this.props.data;

		return (
			<Row>
				<Col xs={12}>
					<PageHeader>
						{product.name + ' '}<Label bsStyle="info">New</Label>
					</PageHeader>
					<p>{product.description}</p>
					<p>Price: <span className="price">{product.price}</span></p>
				</Col>
			</Row>
		);
	}
}

export default ProductInfo;