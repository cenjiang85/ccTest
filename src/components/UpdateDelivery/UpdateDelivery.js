import React, { Component } from 'react';
import { connect } from 'react-redux'
import qsParser from 'querystring';
import { fetchDeliveryItem, fetchDriversIfNeeded } from '../../actions/index';
import { Main } from '../Main/Main';

class UpdateDelivery extends Component {

    constructor(props) {
        super(props);
        this.id = qsParser.parse(this.props.location.search.substr(1)).id;
    }

    componentDidMount = () => {
        const { dispatch } = this.props;
        dispatch(fetchDriversIfNeeded())
            .then(dispatch(fetchDeliveryItem(this.id)))
    };

    render = () => {
        const { item, drivers } = this.props;

        return (
            <Main title="Edit Delivery">
                <form>
                    <div className="form-group row">
                        <label htmlFor="deliveryDate" className="col-sm-2 col-form-label">Date</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder={item.date} readOnly />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="deliveryName" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" placeholder={item.name} readOnly />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="deliveryDriver" className="col-sm-2 col-form-label">Driver</label>
                        <div className="col-sm-10">
                            <select className="form-control is-invalid" id="deliveryDriver" name="driver_id">
                                <option value="">- Select One -</option>
                                {
                                    Object.keys(drivers).map((driverId) => {
                                        const driver = drivers[driverId] || {};
                                        return <option key={driverId} value={driverId} defaultValue={item.driver_id === driverId}>{driver.name}</option>
                                    })
                                }

                            </select>
                            <div className="invalid-feedback">

                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </Main>
        );
    };
}

const mapStateToProps = (state, props) => {
    const { deliveries, drivers } = state;
    const { id } = qsParser.parse(props.location.search.substr(1));

    return {
        item: deliveries.items ? deliveries.items[id] : {},
        drivers: drivers.items || {}
    }
};

export default connect(mapStateToProps)(UpdateDelivery);