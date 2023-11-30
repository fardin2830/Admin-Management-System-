import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useCustomReqData from '../../../AuthProvider/useCustomReqData';
import { Approval, Delete } from '@mui/icons-material';
import useAxiosSecure from '../../../AuthProvider/useAxiosSecure';
import Swal from 'sweetalert2';
import axios from 'axios';



export default function Listad() {
    const[customreq,refetch]=useCustomReqData();
    const axiosSecure = useAxiosSecure();
    refetch();
    const handleUpdate = async (id,aprove) => {
        refetch();
        const ml = id;
        const mll = aprove;
        console.log(ml , mll);
        const userrrr = {
            _id: id,
            isAproved:true
        };
        // console.log(userrrr);
        axios.patch('http://localhost:3000/customreq', userrrr)
            // .then(res => console.log(res.data.matchedCount))
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Member Limit has been Updated`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

        //     .catch(error => console.log(error))
    }
    const handleDelete = (id) => {
        console.log(id);
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
                    axiosSecure.delete(`/customreq/${id}`)
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
    const rows = customreq;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Asset Name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Req. Date</TableCell>
            <TableCell align="right" className='w-[30%]'>Additional Note</TableCell>
            <TableCell align="right">Button</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {row.assetName}
              </TableCell>
              <TableCell align="right">{row.catagory == 1?<h1>RETURNABLE</h1>:<h1>NON-RETURNABLE</h1>}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.day}/{row.month}/{row.year}</TableCell>
              <TableCell align="right">{row.additional}</TableCell>
              <TableCell align="right"><span className='p-4 bg-slate-300 text-white rounded-full' onClick={() => handleUpdate(row?._id,row?.isAproved)} ><Approval></Approval></span>    <span className='p-4 bg-slate-300 text-white rounded-full' onClick={() => handleDelete(row?._id)} ><Delete></Delete></span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}