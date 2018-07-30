import React from 'react';
import { Link } from 'react-router-dom';

import { Col } from 'react-bootstrap';

import utils from '../../../../../../utils/utils';
import CartTableFooter from '../../../../cart/products/partials/CartTableFooter';

class NewsCard extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {

		const data = this.props.data;

		return (


			<Link to={'/news/' + data.id}>

				<Col xs={this.props.xsRes} sm={6} md={4} lg={4} className="news-card">

					<div className="news-image-container">
						<img className="news-image" src={data.imageUrl} alt="News image"/>
					</div>

					<div className="news-body">
						<h4 className="news-title">{data.title}</h4>
						<p className="news-date">{utils.formatDate(data.creationDate)}</p>
					</div>
				</Col>

			</Link>

		);
	}
}

export default NewsCard;