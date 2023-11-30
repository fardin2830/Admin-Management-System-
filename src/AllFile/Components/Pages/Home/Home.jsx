import React, { useContext } from 'react';
import Packages from './Packages';
import About from './About';
import Slider from './Banner';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import EmpHome from './EmployeeHome/EmpHome';
import { Box, LinearProgress } from '@mui/material';
import useEmployeeData from '../../../AuthProvider/useEmployeeData';
import useAdminData from '../../../AuthProvider/useAdminData';
import HomeAdmin from '../Admin/HomeAdmin';

const Home = () => {
    const {user,loading}=useContext(AuthContext);
    const [employee,refetch]=useEmployeeData();
    const [admin]=useAdminData();
    refetch();
    if (loading) {
        return (<Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>);
    }
    const emp = employee?.filter(em=>em?.email==user?.email);
    const adm = admin?.filter(em=>em?.email==user?.email);

    return (
        <div>
            {
                emp.length>0 ?
                <span>
                    <EmpHome></EmpHome>
                </span>
                :
                <span className='hidden'>
                </span>
            }
            {
                adm.length>0 ?
                <span>
                    <HomeAdmin></HomeAdmin>
                </span>
                :
                <span className='hidden'>
                </span>
            }
            {
                user ?

                <span className='hidden'>
                </span>
                :
                <span>
                    <Slider></Slider>
                    <Packages></Packages>
                    <br /><br />
                    <About></About>
                </span>
                
            }
        </div>
    );
};

export default Home;