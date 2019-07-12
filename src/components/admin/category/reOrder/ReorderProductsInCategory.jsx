import React from 'react';
import { ToastContainer } from 'react-toastr';
import { Grid, Row, Col, Table } from 'react-bootstrap';

// Partials
import ProductTableRow from '../../product/list/partials/ProductTableRow';
import FormSelectField from '../../../common/formComponents/FormSelectField_2';
import SortableProducts from './partials/SortableProducts';

// Services
import productsService from '../../../../services/products/productsService';
import categoriesService from '../../../../services/categories/categoryService';

import { TOASTR_MESSAGES } from '../../../../data/constants/componentConstants';

class FilterObject {
	constructor () {
		this.original = [];
		this.selected = [];
		this.matched = [];
	}
}

class ReorderProductsInCategory extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			products: [],

			newProductsOrder: [],

			categories: new FilterObject(),

			loading: true
		};
	}

	componentDidMount () {
		this.loadCategories();
	}

	loadCategories = () => {
		categoriesService
			.loadCategories(null,)
			.then(res => {
				let categories = Object.assign({}, this.state.categories);      //creating copy of object
				categories.original = res;                                                    //updating value
				categories.selected = [res[0].id];

				this.setState({
					categories: categories,
					selectedCategoryName: res[0].name
				}, () => {
					this.loadProducts();
				});
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});
	};

	loadProducts = () => {

		productsService
			.loadProducts(this.state, true)
			.then(res => {

				res.products.forEach(p => p.images.reverse());

				this.setState({
					products: res.products,
					loading: false
				});
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});
	};

	handleChange = (e) => {

		let newCategoryId = this.state.categories.original.filter(cat => cat.name === e.target.value)[0].id;

		let categories = Object.assign({}, this.state.categories);      //creating copy of object
		categories.selected = [newCategoryId];  //updating value

		this.setState({categories: categories, loading: true}, () => this.loadProducts());
	};

	handleOrderChange = (reorderedItems) => {
		this.setState({newProductsOrder: reorderedItems});
	};

	saveNewOrder = () => {
		console.log('from save')
	};

	render () {

		return (
			<Grid id='reorder-products'>

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>


				<h3>Подреждане на продукти в категория</h3>

				<hr/>


				<Row>
					<Col xs={12} className="buttons-container">
						<FormSelectField
							value={this.state.categories.selected.id}
							optionsList={this.state.categories.original}
							onChange={this.handleChange}/>

					</Col>
				</Row>


				<div id="admin-sortable">

					{this.state.loading && <div className="admin-loader"/>}

					{!this.state.loading && this.state.products.length === 0 &&
					<h3> Няма продукти в избраната категория </h3>
					}

					{!this.state.loading && this.state.products.length > 0 &&
					<Table striped bordered condensed hover id="admin-products-table">
						<SortableProducts sortableItems={this.state.products}
						                  handleOrderChange={this.handleOrderChange}/>
					</Table>}
				</div>

				<button className='btn btn-primary' onClick={this.saveNewOrder}>Запази подреждането</button>
			</Grid>
		);
	}
}

export default ReorderProductsInCategory;
