import React, { useContext } from 'react';
import MyCustomReq from './MyCustomReq';
import PendingReq from './Pendingreq';
import MonthlyReq from './MonthlyReq';
import useTeamData from '../../../../AuthProvider/useTeam';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
import { Box, CssBaseline } from '@mui/material';

const EmpHome = () => {
    const [team, refetch]=useTeamData();
    const{user,loading}=useContext(AuthContext);
    if (loading) {
        <Box>
            <CssBaseline></CssBaseline>
        </Box>
    }
    refetch();
    const isintm = team?.filter(fn=>fn?.usremail==user?.email);
    
    return (
        <div>
            {
        isintm.length>0?
        <span>
            <MyCustomReq></MyCustomReq>
            <br /><br />
            <PendingReq></PendingReq>
            <br /><br />
            <MonthlyReq></MonthlyReq>

        </span>
        :
        <h1 className='text-4xl'>Contact with HR</h1>
    }
        </div>
    );
};

export default EmpHome;