import * as React from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import { Details, Home, Info } from '@mui/icons-material';
import useAsset from '../../../../AuthProvider/useAsset';
import { Avatar, Box, Button, Container, CssBaseline, Grid, InputLabel, LinearProgress, MenuItem, Modal, Select, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
import useCustomReqData from '../../../../AuthProvider/useCustomReqData';

const defaultTheme = createTheme();
export default function MonthlyReq() {
    const{user,loading}=React.useContext(AuthContext);
    if (loading) {
        return (<Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>);
    }
    const today = new Date();
    const month = today.getMonth();
    const [customreq, refetch] = useCustomReqData();
    refetch();
    const cst =customreq?.filter(ct=>ct?.email==user?.email);
    const rows = cst?.filter(cs=>cs?.month==month);
    return (
        <Sheet variant="soft" sx={{ pt: 1, borderRadius: 'sm' }}>
            <Table
                stripe="odd"
                hoverRow
                sx={{ captionSide: 'top', '& tbody': { bgcolor: 'background.surface' } }}
            >
                <caption>Pending List</caption>
                <thead>
                    <tr>
                        <th className='w-[30%]'>Asset Name</th>
                        <th className='text-center'>Price</th>
                        <th className='text-center'>Type</th>
                        <th className='text-center'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.assetName} className='text-center'>
                            <td className='text-left'>{row.assetName}</td>
                            <td>{row.price}</td>
                            <td>{row.type == 1 ? <h1>Returnable</h1> : <h1>Non-Returnable</h1>}</td>
                            <td>
                                {
                                    row.isAproved==false?
                                    <h1>Pending</h1>
                                    :
                                    <h1>Approved</h1>

                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Sheet>
    );
}