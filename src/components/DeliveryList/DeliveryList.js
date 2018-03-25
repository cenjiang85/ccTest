import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchDeliveries, fetchDriversIfNeeded } from '../../actions/index';
import { Main } from '../Main/Main';
import { DeliveryItem } from './DeliveryItem/DeliveryItem';

class DeliveryList extends Component {

    componentDidMount = () => {
        const { dispatch } = this.props;
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
    const { deliveries, drivers } = state;

    if (!deliveries.items) {
        return {
            items: [],
            isFetching: true
        }
    }

    const items = Object.keys(deliveries.items).map((key) => {
        const item = deliveries.items[key];
        return {
            id: key,
            ...item,
            driver_name: drivers.items[item.driver_id].name
        }
    });

    return {
        items,
        isFetching: drivers.isFetching || deliveries.isFetching
    };
};

export default connect(mapStateToProps)(DeliveryList);