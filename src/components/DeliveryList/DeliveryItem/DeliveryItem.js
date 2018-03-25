import React from 'react';

const DeliveryItem = ({ item }) => {
    const { id, date, name, driver_name } = item;
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{date}</td>
            <td>{name}</td>
            <td>{driver_name}</td>
            <td className="text-right">
                <a className="btn btn-outline-primary" href="update.php?id=<?php echo $id; ?>">Edit</a>&nbsp;
                <a className="btn btn-outline-danger" href="delete.php?id=<?php echo $id; ?>">Delete</a>
            </td>
        </tr>
    );
};

export { DeliveryItem };