import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import useEmployeeData from '../../../AuthProvider/useEmployeeData';
import { Box, LinearProgress } from '@mui/material';

const Profile = () => {
    const {user,loading}=useContext(AuthContext);
    const [employee,refetch]=useEmployeeData();
    if (loading) {
        return (<Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>);
    }
    refetch();
    const us = employee?.filter(em=>em?.email==user?.email)
    return (
        <div className='w-1/2 my-5 py-5 mx-auto  bg-yellow-400'>
            <h1 className='text-3xl mb-3 text-center font-semibold mx-auto'>{us[0]?.firstName}</h1>
            <h1 className='text-3xl mb-3 text-center font-semibold mx-auto'>{us[0]?.email}</h1>
            <h1 className='text-3xl mb-3 text-center font-semibold mx-auto'>{us[0]?.day}/{us[0]?.month}/{us[0]?.year}</h1>
            
        </div>
    );
};

export default Profile;