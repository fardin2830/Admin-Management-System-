import React from 'react';
import Listad from './List';

const HomeAdmin = () => {
    return (
        <div>
            <h1 className='text-center text-3xl mb-3'>Pending List</h1>
            <Listad></Listad>
        </div>
    );
};

export default HomeAdmin;