import React from 'react';
import { ToastContainer } from 'react-toastr';
import { Grid } from 'react-bootstrap';

// Partials
import FormSelectField from '../../../common/formComponents/FormSelectField_2';
import SortableProducts from './partials/SortableProducts';

// Services
import categoriesService from '../../../../services/categories/categoryService';

// Constants
import { TOASTR_MESSAGES } from '../../../../data/constants/componentConstants';

class ReorderProductsInCategory extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			nestedCategories: [],
			currentCategoryId: '',
			products: [],
			newProductsOrder: [],
			loading: true
		};
	}

	componentDidMount () {
		this.loadNestedCategories();
	}

	loadNestedCategories = () => {
		categoriesService
			.loadNestedCategories(this.state)
			.then(res => {

				let currentCategoryId = res[0].id;
				let products = res.filter(c => c.id === currentCategoryId)[0].products;

				this.setState({
					nestedCategories: res,
					currentCategoryId: currentCategoryId
				}, () => this.loadProducts(products));
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});
	};

	loadProducts = (products) => {
		products.forEach(p => p.images.reverse());
		this.setState({products: products, loading: false});
	};

	handleChange = (e) => {

		let selectedCategoryName = e.target.value;

		let selectedCategoryId = this.state.nestedCategories.filter(c => c.name === selectedCategoryName)[0].id;

		let products = this.state.nestedCategories.filter(c => c.id === selectedCategoryId)[0].products;

		this.setState({currentCategoryId: selectedCategoryId, loading: true}, () => this.loadProducts(products));
	};

	handleOrderChange = (reorderedItems) => {
		this.setState({newProductsOrder: reorderedItems});
	};

	saveNewOrder = () => {
		categoriesService.saveUpdatedProductsOrder(this.state.newProductsOrder.map(p => p.id), this.state.currentCategoryId)
			.then(res => {
				this.loadNestedCategories();
			})
			.catch(err => {
				this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
					closeButton: false,
				});
			});
	};

	render () {

		let selectForm;

		if (this.state.nestedCategories.length > 0) {

			selectForm = (<FormSelectField
				selected={this.state.currentCategoryId}
				optionsList={this.state.nestedCategories}
				onChange={this.handleChange}/>);
		}

		return (
			<Grid id='reorder-products'>

				<ToastContainer
					ref={ref => this.toastContainer = ref}
					className="toast-bottom-right"
				/>


				<h3>Подреждане на продукти в категория</h3>

				{selectForm}

				{this.state.loading && <div className="admin-loader"/>}

				{!this.state.loading && this.state.products.length === 0 &&
				<h4> Няма продукти в избраната категория </h4>
				}

				{!this.state.loading && this.state.products.length > 0 &&
				<div>
					<div id="admin-sortable">

						{!this.state.loading && this.state.products.length > 0 &&

						<SortableProducts sortableItems={this.state.products}
						                  handleOrderChange={this.handleOrderChange}/>
						}
					</div>

					<div className='buttons-container'>
						<button className='btn btn-default' onClick={() => this.props.history.go(-1)}>Назад</button>
						<button className='btn btn-primary' onClick={this.saveNewOrder}>Запази подреждането</button>
					</div>
				</div>
				}


			</Grid>
		);
	}
}

export default ReorderProductsInCategory;
