import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import qsParser from 'querystring';
import { fetchDeliveryItem, fetchDriversIfNeeded, updateDeliveryItem } from '../../actions/index';
import { Main } from '../Main/Main';

class UpdateDelivery extends Component {

    constructor(props) {
        super(props);
        this.id = qsParser.parse(props.location.search.substr(1)).id;
        this.state = {
            selectedDriverId: null
        }
    }

    componentDidMount = () => {
        const { dispatch } = this.props;
        dispatch(fetchDriversIfNeeded())
            .then(dispatch(fetchDeliveryItem(this.id)))
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(updateDeliveryItem(this.id, this.getSelectedDriverId()));
    };

    onChange = (event) => {
        this.setState({
            selectedDriverId: event.target.value
        });
    };

    getSelectedDriverId = () => {
        const { item } = this.props;
        const { selectedDriverId } = this.state;
        return selectedDriverId === null ? item.driver_id : selectedDriverId;
    };

    render = () => {
        const { item, drivers, submitStatus, errors } = this.props;
        const isInvalidClass = (errors && errors.driver_id) ? 'is-invalid' : '';

        if (submitStatus === 'SUCCESS') {
            return <Redirect push to="/"/>
        }

        return (
            <Main title="Edit Delivery">
                <form onSubmit={this.onSubmit}>
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
                            <select className={`form-control ${isInvalidClass}`} value={this.getSelectedDriverId()} name="driver_id" onChange={this.onChange}>
                                <option value="">- Select One -</option>
                                {
                                    Object.keys(drivers).map((driverId) => {
                                        const driver = drivers[driverId] || {};
                                        return <option key={driverId} value={driverId}>{driver.name}</option>
                                    })
                                }

                            </select>
                            {submitStatus === 'FAILED'
                                ? <div className="invalid-feedback">{errors && errors.driver_id}</div>
                                : null}

                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </Main>
        );
    };
}

const mapStateToProps = (state, props) => {
    const { deliveries, drivers, form: { submitStatus, errors } } = state;
    const { id } = qsParser.parse(props.location.search.substr(1));

    return {
        item: deliveries.items ? deliveries.items[id] : {},
        drivers: drivers.items || {},
        submitStatus,
        errors
    }
};

export default connect(mapStateToProps)(UpdateDelivery);