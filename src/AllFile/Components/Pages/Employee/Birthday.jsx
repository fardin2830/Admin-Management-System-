import { Avatar, Box, LinearProgress, Typography } from '@mui/material';
import React, { useContext } from 'react';
import useTeamData from '../../../AuthProvider/useTeam';
import useEmployeeData from '../../../AuthProvider/useEmployeeData';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const Birthday = () => {
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return (<Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>);
    }
    const [team] = useTeamData();
    const [employee, refetch] = useEmployeeData();
    refetch();
    const teamMem = team?.filter(tm => tm?.usremail == user.email);
    const teamhr = teamMem[0]?.hremail;
    const allteamMem = team?.filter(tm => tm?.hremail == teamhr);
    let birthday = employee.filter(aObj => allteamMem.some(bObj => bObj.usremail === aObj.email));

    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    console.log(allteamMem);
    console.log(birthday);
    console.log(employee);
    return (
        <div>
            {
                birthday?.map(bd => (
                    <div className=' w-full py-3 text-center'>
                        {bd.month == month ?
                            <div className=' bg-slate-300 py-2 shadow-lg rounded-lg'>
                                <h1 className='text-3xl font-bold' >
                                    {
                                        day-bd.day>1?
                                        <span>{day-bd.day} days to go..</span>
                                        :
                                        <span>Birthday is passed few days ago</span>
                                    }</h1>
                                <h1 className='text-3xl font-semibold'>{bd.firstName}</h1>
                                <h1 className='text-3xl font-bold' >{day}/{month}/{year}</h1>

                            </div>
                            :
                            <span className=' hidden '></span>
                        }
                    </div>

                ))
            }
        </div>
    );
};

export default Birthday;