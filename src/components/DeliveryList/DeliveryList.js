import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchDeliveries, fetchDriversIfNeeded, resetForm } from '../../actions/index';
import { Main } from '../Main/Main';
import { DeliveryItem } from '../DeliveryItem/DeliveryItem';
import { getDeliveriesWithDriverName, isFetching } from '../../selectors';

class DeliveryList extends Component {

    /**
     * Fetch the drivers and deliveries list when mount,
     * also reset the form state
     */
    componentDidMount = () => {
        const { dispatch } = this.props;
        dispatch(resetForm());
        dispatch(fetchDriversIfNeeded())
            .then(dispatch(fetchDeliveries()));
    };

    render = () => {
        const { items, isFetching } = this.props;
        const isEmpty = items.length === 0;
        return (
            <Main title="Deliveries">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Name</th>
                            <th scope="col">Driver</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isEmpty
                            ? (isFetching && <tr><td><h1>Loading...</h1></td></tr>)
                            : this.props.items.map(item => <DeliveryItem key={item.id} item={item}/>)
                        }
                    </tbody>
                </table>
            </Main>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        items: getDeliveriesWithDriverName(state),
        isFetching: isFetching(state)
    };
};

export default connect(mapStateToProps)(DeliveryList);