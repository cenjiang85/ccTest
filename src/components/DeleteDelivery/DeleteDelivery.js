import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import qsParser from 'querystring';
import { fetchDeliveryItem, deleteDeliveryItem } from '../../actions';
import { Main } from '../Main/Main';

class DeleteDelivery extends Component {

    constructor(props) {
        super(props);
        this.id = qsParser.parse(props.location.search.substr(1)).id;
    }

    componentDidMount = () => {
        const { dispatch } = this.props;
        dispatch(fetchDeliveryItem(this.id));
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(deleteDeliveryItem(this.id));
    };

    render = () => {
        const { item, submitStatus } = this.props;

        if (!this.id) {
            return <Main title="Missing delivery ID" />
        }

        if (!item) {
            return <Main title="Invalid delivery ID" />
        }

        if (submitStatus === 'SUCCESS') {
            return <Redirect push to="/"/>
        }

        return (
            <Main title="Delete Delivery">
                <form onSubmit={this.onSubmit}>
                    <p>Are you sure you want to delete this delivery?</p>
                    <button type="submit" className="btn btn-danger">Delete</button>
                </form>
            </Main>
        );
    };
}

const mapStateToProps = (state, props) => {
    const {  deliveries, form: { submitStatus } } = state;
    const { id } = qsParser.parse(props.location.search.substr(1));

    return {
        item: deliveries.items ? deliveries.items[id] : null,
        submitStatus
    }
};

export default connect(mapStateToProps)(DeleteDelivery);