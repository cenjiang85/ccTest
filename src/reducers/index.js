import { combineReducers } from 'redux';
import {
    REQUEST_DELIVERIES,
    RECEIVE_DELIVERIES,
    REQUEST_DRIVERS,
    RECEIVE_DRIVERS,
    REQUEST_DELIVERY,
    RECEIVE_DELIVERY_ITEM
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

export const rootReducer = combineReducers({
    deliveries,
    drivers
});
