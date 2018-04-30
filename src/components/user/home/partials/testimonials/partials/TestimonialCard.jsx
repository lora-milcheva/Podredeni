import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Image } from 'react-bootstrap';

class TestimonialCard extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		const data = this.props.data;

		return (
			<Col xs={12} data={this.data} className="testimonial text-center">
				<Col xs={12}>
					<Image circle src={data.imageUrl} className='avatar' alt="Card image cap"/>
				</Col>
				<Col xs={6} xsOffset={3} className='testimonial-body'>
					<h4 className="">{data.name + ' ' + data.lastName}</h4>
					<p className="">{data.testimonial}</p>
				</Col>
			</Col>
		);
	}
}

export default TestimonialCard;