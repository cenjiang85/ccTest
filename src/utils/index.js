/**
 * File contains util functions
 */

import qsParser from 'querystring';

/**
 * Util function to return id from props that contains react-router location info
 * @param {Object} props - contains router location info
 * @returns {String} - The value of the id from url
 */
export const getIdFromUrl = (props) => {
    return qsParser.parse(props.location.search.substr(1)).id || '';
};