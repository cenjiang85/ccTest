import { combineReducers } from 'redux';
import {
    REQUEST_DELIVERIES,
    RECEIVE_DELIVERIES,
    REQUEST_DRIVERS,
    RECEIVE_DRIVERS,
    RECEIVE_DELIVERY_ITEM,
    SUBMIT_DELIVERY_FORM,
    SET_SUBMIT_SUCCESS,
    SET_SUBMIT_ERROR,
    RESET_FORM
} from '../actions';

const drivers = (state = { isFetching: false, items: null }, action) => {
    switch (action.type) {
        case REQUEST_DRIVERS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_DRIVERS:
            return {
                ...state,
                isFetching: false,
                items: action.drivers
            };
        default:
            return state;
    }
};

const deliveries = (state = { isFetching: false, items: null }, action) => {
    switch (action.type) {
        case REQUEST_DELIVERIES:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_DELIVERIES:
            return {
                ...state,
                isFetching: false,
                items: action.deliveries
            };
        case RECEIVE_DELIVERY_ITEM:
            return {
                ...state,
                isFetching: false,
                items: {
                    [action.id]: action.item
                }
            };
        default:
            return state;
    }
};

const form = (state = { submitStatus: null, errors: null }, action) => {
    switch (action.type) {
        case SUBMIT_DELIVERY_FORM:
            return {
                ...state,
                submitStatus: 'IN_PROGRESS',
                error: null
            };
        case SET_SUBMIT_SUCCESS:
            return {
                ...state,
                submitStatus: 'SUCCESS',
                error: null
            };
        case SET_SUBMIT_ERROR:
            return {
                ...state,
                submitStatus: 'FAILED',
                errors: action.errors
            };
        case RESET_FORM:
            return {
                ...state,
                submitStatus: null,
                errors: null
            };
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    deliveries,
    drivers,
    form
});
