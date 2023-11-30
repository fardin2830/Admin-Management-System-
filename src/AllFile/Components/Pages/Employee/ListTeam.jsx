import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../AuthProvider/useAxiosSecure";
import { Avatar, Box, LinearProgress, Table, Typography } from "@mui/material";
import useTeamData from "../../../AuthProvider/useTeam";
import Swal from "sweetalert2";
import { AdminPanelSettings, Person } from "@mui/icons-material";


export default function ListTeam() {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    if (loading) {
        return (<Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>);
    }
    const [team, refetch] = useTeamData();
    refetch();
    const teamMem = team?.filter(tm => tm?.usremail == user.email);
    const teamhr = teamMem[0]?.hremail;
    const allteamMem = team?.filter(tm => tm?.hremail == teamhr);
    return (
        <Table
            aria-label="table with ellipsis texts"
            noWrap
        >
            <thead>
                <tr>
                    <th>Name</th>
                    <th className='text-center w-[20%] lg:w-[20%]'>Member Type</th>
                </tr>
            </thead>
            <tbody>
                {
                    allteamMem.map(tmm => (
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
                            
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}