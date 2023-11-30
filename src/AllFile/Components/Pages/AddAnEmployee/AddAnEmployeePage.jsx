import React from 'react';
import PackLimit from './PackLimit';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import NonEmpList from './NonGroupEmployeeList';

const AddAnEmployeePage = () => {
    return (
        <div>
            <div className='w-20 h-20 font-semibold bg-white text-red-600 shadow-lg mx-auto rounded-full text-4xl flex justify-center items-center'>
            <PackLimit></PackLimit>

            </div>
            <div className='mx-auto border bg-red-300 mt-2 w-max rounded-lg'>
            <Link to={'/payment'}>
            <Button>Increase Your Member Limit</Button>
            </Link>
            </div>
            <br />
            <NonEmpList></NonEmpList>
        </div>
    );
};

export default AddAnEmployeePage;