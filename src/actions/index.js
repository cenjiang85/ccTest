// Constants that defines action types used in this app
export const REQUEST_DELIVERIES = 'REQUEST_DELIVERIES';
export const RECEIVE_DELIVERIES = 'RECEIVE_DELIVERIES';
export const REQUEST_DRIVERS = 'REQUEST_DRIVERS';
export const RECEIVE_DRIVERS = 'RECEIVE_DRIVERS';
export const RECEIVE_DELIVERY_ITEM = 'RECEIVE_DELIVERY_ITEM';
export const SUBMIT_DELIVERY_FORM = 'SUBMIT_DELIVERY_FORM';
export const SET_SUBMIT_SUCCESS = 'SET_SUBMIT_SUCCESS';
export const SET_SUBMIT_ERROR = 'SET_SUBMIT_ERROR';
export const RESET_FORM = 'RESET_FORM';


// Constants store the endpoint URLs
const DELIVERIES_API_URL = 'http://localhost:8000/api/deliveries.php';
const DRIVERS_API_URL = 'http://localhost:8000/api/drivers.php';


// General action creators
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

const submitDeliveryForm = () => {
    return { type: SUBMIT_DELIVERY_FORM }
};

const setSubmitSuccess = () => {
    return { type: SET_SUBMIT_SUCCESS }
};

const setSubmitError = (json) => {
    return {
        type: SET_SUBMIT_ERROR,
        errors: json.errors
    }
};

export const resetForm = () => {
    return { type: RESET_FORM }
};


// Async action creators that handles Side-Effects, i.e. APIs / Error handling / logging
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
        .then(resp => handleErrors(resp, dispatch))
        .then(resp => resp.json())
        .then(json => dispatch(receiveDeliveryItem(id, json)))
        .catch(error => console.log(error));
};

export const addDeliveryItem = (item) => dispatch => {
    dispatch(submitDeliveryForm());
    return fetch(DELIVERIES_API_URL, {
        body: JSON.stringify(item),
        headers: { 'content-type': 'application/json' },
        method: 'POST'
    })
        .then(resp => handleErrors(resp, dispatch))
        .then(() => dispatch(setSubmitSuccess()))
        .catch(error => console.log(error));
};

export const updateDeliveryItem = (id, driver_id) => dispatch => {
    dispatch(submitDeliveryForm());
    return fetch(`${DELIVERIES_API_URL}?id=${id}`, {
        body: JSON.stringify({ driver_id }),
        headers: { 'content-type': 'application/json' },
        method: 'PUT'
    })
        .then(resp => handleErrors(resp, dispatch))
        .then(() => dispatch(setSubmitSuccess()))
        .catch(error => console.log(error));
};

export const deleteDeliveryItem = (id) => dispatch => {
    dispatch(submitDeliveryForm());
    return fetch(`${DELIVERIES_API_URL}?id=${id}`, {
        method: 'DELETE'
    })
        .then(resp => handleErrors(resp, dispatch))
        .then(() => dispatch(setSubmitSuccess()))
        .catch(error => console.log(error));
};

const handleErrors = (resp, dispatch) => {
    if (!resp.ok) {
        resp.json().then(json => dispatch(setSubmitError(json)));
        throw Error(resp.statusText);
    }
    return resp;
};

// Since driver list never change, once they get loaded in the app, we should never re-fetch it again
const shouldFetchDrivers = (state) => {
    const { drivers } = state;

    if (drivers.isFetching) {
        return false
    }

    return !drivers.items;
};

export const fetchDriversIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchDrivers(getState())) {
        return dispatch(fetchDrivers());
    }
    return Promise.resolve();
};
