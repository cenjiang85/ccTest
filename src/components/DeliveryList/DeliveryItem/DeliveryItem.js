import React from 'react';
import { Link } from 'react-router-dom';

const DeliveryItem = ({ item }) => {
    const { id, date, name, driver_name } = item;
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{date}</td>
            <td>{name}</td>
            <td>{driver_name}</td>
            <td className="text-right">
                <Link className="btn btn-outline-primary" to={`update?id=${id}`}>Edit</Link>&nbsp;
                <Link className="btn btn-outline-danger" to={`delete?id=${id}`}>Delete</Link>
            </td>
        </tr>
    );
};

export { DeliveryItem };