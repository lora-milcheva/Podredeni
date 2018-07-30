import React from 'react';
import { ToastContainer } from 'react-toastr';

import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import newsService from '../../../services/news/newsService';

import { RESOLUTIONS } from '../../../data/constants/componentConstants';
import FormTextareaField from "../../common/formComponents/FormTextareaField";
import FormInputField from "../../common/formComponents/FormInputField";

import { TOASTR_MESSAGES, BUTTONS_BG, CREATE_INPUTS } from '../../../data/constants/componentConstants';

class NewsEdit extends React.Component {

    newsId = this.props.match.params.id;

    constructor (props) {
        super(props);

        this.state = {
            title: '',
            imageUrl: '',
            content: '',
            resolution: window.innerWidth
        };
    }

    componentDidMount () {
        window.scrollTo(0, 0);
        window.addEventListener('orientationchange',  this.handleResolutionChange );
        window.addEventListener('resize', this.handleResolutionChange);

        this.loadNewsData();
    }

    componentWillUnmount () {
        window.removeEventListener('orientationchange', this.handleResolutionChange );
        window.removeEventListener('resize', this.handleResolutionChange);
    }

    loadNewsData = () => {
        newsService
            .loadNews(this.newsId)
            .then(res => {
                this.setState({title: res.news.title, imageUrl: res.news.imageUrl, content: res.news.content});
            })
            .catch(err => {
                this.props.history.push('/error');
            });
    };

    saveChanges = () => {
        newsService.updateNews(this.state, this.newsId)
            .then(res => {

            this.toastContainer.success(TOASTR_MESSAGES.successNewsEdit, '', {
                closeButton: false,
            });
        })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });

    };

    handleResolutionChange = () => {
        this.setState({resolution: window.innerWidth})
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render () {
        let resolution = this.state.resolution < RESOLUTIONS.xs;
	    let isAdmin = sessionStorage.getItem('role') === 'admin';

        return (
            <Grid id="news-edit">

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />

                <Row>
                    <Col xs={resolution ? 12 : 6} sm={6} md={5}>
                        <Image src={this.state.imageUrl}/>
                    </Col>

                    <Col xs={resolution ? 12 : 6} sm={6} md={7}>
                        <FormInputField
                            type="text"
                            label={CREATE_INPUTS.title}
                            name="title"
                            value={this.state.title}
                            required={true}
                            onChange={this.handleChange}
                            disabled={false}/>

                        <FormTextareaField
                            label={CREATE_INPUTS.content}
                            name="content"
                            value={this.state.content}
                            required={true}
                            onChange={this.handleChange}/>

                        <FormTextareaField
                            label={CREATE_INPUTS.imageUrl}
                            name="imageUrl"
                            value={this.state.imageUrl}
                            required={true}
                            onChange={this.handleChange}/>


                        <div className="text-center">
		                    {!isAdmin &&
                            <Link className={"btn-custom default md"} to={{pathname: '/news'}}>{BUTTONS_BG.back}</Link>
		                    }

		                    {isAdmin &&
                            <Link className={"btn btn-default"} to={{pathname: '/news'}} >{BUTTONS_BG.back}</Link>
		                    }

                            <button className="btn btn-primary" onClick={this.saveChanges}>{BUTTONS_BG.confirm}</button>
                        </div>
                    </Col>

                </Row>

            </Grid>
        );
    }
}

export default NewsEdit;