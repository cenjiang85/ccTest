import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchDeliveryItem, deleteDeliveryItem } from '../../actions';
import { getSubmitStatus, getDeliveryById } from '../../selectors';
import { getIdFromUrl } from '../../utils';
import { Main } from '../Main/Main';

class DeleteDelivery extends Component {

    constructor(props) {
        super(props);
        this.id = getIdFromUrl(props);
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
    return {
        item: getDeliveryById(state, getIdFromUrl(props)),
        submitStatus: getSubmitStatus(state)
    }
};

export default connect(mapStateToProps)(DeleteDelivery);