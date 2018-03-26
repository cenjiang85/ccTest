import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchDriversIfNeeded, addDeliveryItem } from '../../actions/index';
import { Main } from '../Main/Main';

class AddDelivery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: '',
            driver_id: ''
        };
    }

    componentDidMount = () => {
        const { dispatch } = this.props;
        dispatch(fetchDriversIfNeeded());
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(addDeliveryItem(this.state));
    };

    onChange = (field) => (event) => {
        this.setState({
            [field]: event.target.value
        });
    };

    render = () => {
        const { drivers, submitStatus, errors = {} } = this.props;
        const isInvalidClass = (errors && errors.driver_id) ? 'is-invalid' : '';

        if (submitStatus === 'SUCCESS') {
            return <Redirect push to="/"/>
        }

        return (
            <Main title="Create Delivery">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <label htmlFor="deliveryDate" className="col-sm-2 col-form-label">Date</label>
                        <div className="col-sm-10">
                            <input type="text" className={`form-control ${errors.date && 'is-invalid'}`} id="deliveryDate" name="date" onChange={this.onChange('date')} />
                            {submitStatus === 'FAILED' && <div className="invalid-feedback">{errors.date}</div>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="deliveryName" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className={`form-control ${errors.name && 'is-invalid'}`} id="deliveryName" name="name" onChange={this.onChange('name')} />
                            {submitStatus === 'FAILED' && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="deliveryDriver" className="col-sm-2 col-form-label">Driver</label>
                        <div className="col-sm-10">
                            <select className={`form-control ${isInvalidClass}`} value={this.state.driver_id} name="driver_id" onChange={this.onChange('driver_id')}>
                                <option value="">- Select One -</option>
                                {
                                    Object.keys(drivers).map((driverId) => {
                                        const driver = drivers[driverId] || {};
                                        return <option key={driverId} value={driverId}>{driver.name}</option>
                                    })
                                }

                            </select>
                            {submitStatus === 'FAILED' && <div className="invalid-feedback">{errors.driver_id}</div>}

                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </Main>
        );
    };
}

const mapStateToProps = (state) => {
    const {  drivers, form: { submitStatus, errors } } = state;
    return {
        drivers: drivers.items || {},
        submitStatus,
        errors
    }
};

export default connect(mapStateToProps)(AddDelivery);