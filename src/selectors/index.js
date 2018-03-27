/**
 * This files contains all the selectors needed for components
 * Selectors are used to get / transform data from the state
 */

/**
 * Selector to get driver items from state
 * @param {Object} state - Redux store
 * @returns {Object} Drivers items object
 */
export const getDrivers = (state) => {
    return state.drivers.items || {};
};

/**
 * Selector to transform Deliveries to an Array, replace driver_id to driver_name
 * @param {Object} state - Redux store
 * @returns {Array} List of Deliveries, with Driver's name for each item
 */
export const getDeliveriesWithDriverName = (state) => {
    const { deliveries, drivers } = state;

    if (!deliveries.items) {
        return [];
    }

    return Object.keys(deliveries.items).map((key) => {
        const item = deliveries.items[key];
        return {
            id: key,
            ...item,
            driver_name: drivers.items[item.driver_id].name
        }
    });
};

/**
 * Selector to get a specific delivery from state by looking up the id
 * @param {Object} state - Redux store
 * @param {String} id - The id of the Delivery
 * @returns {Object|null} The delivery object if it is in state, otherwise null
 */
export const getDeliveryById = (state, id) =>{
    const { deliveries: { items } } = state;
    return items ? items[id] : null
};

/**
 * Selector to get the fetching status from the state
 * @param {Object} state - Redux store
 * @returns {Boolean} -  if either drivers or deliveries is fetching, true, otherwise false
 */
export const isFetching = (state) => {
    const { deliveries, drivers } = state;
    return drivers.isFetching || deliveries.isFetching;
};

/**
 * Selector to get the submit status from the state
 * @param {Object} state - Redux store
 * @returns {String} - The submitStatus text
 */
export const getSubmitStatus = (state) => {
    const { form: { submitStatus } } = state;
    return submitStatus;
};

/**
 * Selector to get sever errors from state
 * @param {Object} state - Redux store
 * @returns {Object} - Server errors object, contains error message
 */
export const getErrors = (state) => {
    const { form: { errors } } = state;
    return errors;
};