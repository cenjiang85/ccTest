import React from 'react';

const Main = ({ title, children }) => {
    return (
        <main role="main">
            <h1>{title}</h1>
            {children}
        </main>
    );
};

export { Main };