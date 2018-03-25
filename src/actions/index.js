export const REQUEST_DELIVERIES = 'REQUEST_DELIVERIES';
export const RECEIVE_DELIVERIES = 'RECEIVE_DELIVERIES';
export const REQUEST_DRIVERS = 'REQUEST_DRIVERS';
export const RECEIVE_DRIVERS = 'RECEIVE_DRIVERS';
export const REQUEST_DELIVERY = 'REQUEST_DELIVERY';
export const RECEIVE_DELIVERY_ITEM = 'RECEIVE_DELIVERY_ITEM';
export const ADD_DELIVERY = 'ADD_DELIVERY';
export const UPDATE_DELIVERY = 'UPDATE_DELIVERY';
export const DELETE_DELIVERY = 'DELETE_DELIVERY';

const DELIVERIES_API_URL = 'http://localhost:8000/api/deliveries.php';
const DRIVERS_API_URL = 'http://localhost:8000/api/drivers.php';

const requestDeliveries = () => {
    return { type: REQUEST_DELIVERIES };
};

const receiveDeliveries = (json) => {
    return {
        type: RECEIVE_DELIVERIES,
        deliveries: json
    }
};

const requestDrivers = () => {
    return { type: REQUEST_DRIVERS };
};

const receiveDrivers = (json) => {
    return {
        type: RECEIVE_DRIVERS,
        drivers: json
    }
};

const receiveDeliveryItem = (id, json) => {
    return {
        type: RECEIVE_DELIVERY_ITEM,
        id,
        item: json
    };
};


export const fetchDeliveries = () => dispatch => {
    dispatch(requestDeliveries());
    return fetch(DELIVERIES_API_URL)
        .then(resp => resp.json())
        .then(json => dispatch(receiveDeliveries(json)));
};

export const fetchDrivers = () => dispatch => {
    dispatch(requestDrivers());
    return fetch(DRIVERS_API_URL)
        .then(resp => resp.json())
        .then(json => dispatch(receiveDrivers(json)));
};

export const fetchDeliveryItem = (id) => dispatch => {
    dispatch(requestDeliveries());
    return fetch(`${DELIVERIES_API_URL}?id=${id}`)
        .then(resp => resp.json())
        .then(json => dispatch(receiveDeliveryItem(id, json)))
};

export const addDelivery = (item) => {
    return {
        type: ADD_DELIVERY,
        item
    }
};

export const updateDelivery = (item) => {
    return {
        type: UPDATE_DELIVERY,
        item
    }
};

export const deleteDelivery = (id) => {
    return {
        type: DELETE_DELIVERY,
        id
    };
};