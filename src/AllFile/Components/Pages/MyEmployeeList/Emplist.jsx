import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import { AdminPanelSettings, Delete, Person } from '@mui/icons-material';
import useTeamData from '../../../AuthProvider/useTeam';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { LinearProgress } from '@mui/material';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../AuthProvider/useAxiosSecure';

export default function TableTextEllipsis() {
    const { user, loading } = React.useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    if (loading) {
        return (<Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>);
    }
    const [team, refetch] = useTeamData();
    refetch();
    const teamMem = team?.filter(tm => tm.hremail == user.email);
    const handleDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    console.log(result);
                    axiosSecure.delete(`/team/${id}`)
                        .then(res => {
                            console.log(res);
                            if (res.data.deletedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });
                            }
                        })
                }
            });
    };
    return (
        <Table
            aria-label="table with ellipsis texts"
            noWrap
        >
            <thead>
                <tr>
                    <th>Name</th>
                    <th className='text-center w-[20%] lg:w-[20%]'>Member Type</th>
                    <th className='text-center w-[20%] lg:w-[10%]'>
                        Delete
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    teamMem.map(tmm => (
                        <tr className=' my-2'>
                            <td>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Avatar src="/static/images/avatar/1.jpg" />
                                    <Box sx={{ minWidth: 0 }}>
                                        <Typography noWrap fontWeight="lg">
                                            {tmm.usrname}
                                        </Typography>
                                        <Typography noWrap level="body-sm">
                                            {tmm.usremail}
                                        </Typography>
                                    </Box>
                                </Box>
                            </td>
                            <td className='text-center'>
                                {
                                    tmm?.usrtype == 'employee' ?
                                        <Person></Person>
                                        :
                                        <AdminPanelSettings></AdminPanelSettings>
                                }
                            </td>
                            <td className='text-center'><span onClick={() => handleDelete(tmm?._id)} className='w-max p-3 border bg-slate-200 text-black rounded-full mx-auto'><Delete></Delete></span></td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}