import { Box, Button, InputLabel, LinearProgress, MenuItem, Select, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
import useCustomReqData from '../../../../AuthProvider/useCustomReqData';
import useAdminData from '../../../../AuthProvider/useAdminData';

const MyAsset = () => {
    const { user, loading } = useContext(AuthContext);
    const [customreq] = useCustomReqData();
    const mycustomreq = customreq?.filter((req)=>req?.email==user?.email);
    const [selectCat, setSelectCat] = useState('');
    const [selectInputText, setSelectInputText] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [isCategory, setIsCategory] = useState(false);
    const [admin] = useAdminData();
    const adm = admin?.filter((ad) => ad?.email == user?.email);
    const handleSelectInputTextChange = (e) => {
        const term = e.target.value;
        setSelectInputText(term);
        setIsSearch(!!term);
        setIsCategory(false);
    };
    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectCat(category);
        setIsCategory(!!category);
        setIsSearch(false);
    };
    const filteredObjects = mycustomreq?.filter(obj => {
        const titleMatches = obj?.assetName?.toLowerCase().includes(selectInputText?.toLowerCase());
        const categoryMatches = !selectCat || obj?.type === selectCat;
        return (isSearch && titleMatches) || (isCategory && categoryMatches) || (!isSearch && !isCategory);
    });
    console.log(filteredObjects);
    if (loading) {
        return (<Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>);
    }
    return (
        <div>
            <br />
            <br />
            <br />
            <span className='grid grid-cols-2'>
                <form className='w-[80%] lg:w-full mx-auto mt-3 flex flex-col items-center'>
                    <InputLabel id="demo-simple-select-label" className='pb-2 text-xl font-semibold'>Return Based Filter</InputLabel>
                    <Select
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        value={selectCat}
                        onChange={handleCategoryChange}
                        disabled={isSearch}
                        className='w-full'
                    >
                        <MenuItem value="">
                            <em>Select ...</em>
                        </MenuItem>
                        <MenuItem value={1}>Returnable</MenuItem>
                        <MenuItem value={2}>Non-Returnable</MenuItem>
                    </Select>
                </form>
                <form action="" className='w-[80%] mx-auto mt-3 flex flex-col items-center'>
                    <InputLabel id="demo-simple-select-label" className='pb-2 text-xl font-semibold'>Product Name Based Search</InputLabel>
                    
                    <TextField
                        autoComplete="given-name"
                        name="additional"
                        value={selectInputText}
                        onChange={handleSelectInputTextChange}
                        disabled={isCategory}
                        fullWidth
                        label="Enter product Name ..."
                    />
                </form>
            </span>
            <div className='w-[80%] lg:w-full mx-auto my-10 grid grid-cols-1 lg:grid-cols-4 gap-3'>
                {
                    filteredObjects?.map((dataa, i) => (
                        <div className='w-full h-96  border-black'>
                            <div className='w-full h-full shadow-xl rounded-lg relative flex flex-col items-center bg-[#F6E8D5] border-[#af5845] mx-auto'>
                                
                                <img src={dataa.image} className='w-full h-[40%] rounded-t-lg' alt="https://i.ibb.co/HT36ypS/1.webp" />
                                <h1 className='text-lg bg-[#af584586] px-3 rounded-b-lg absolute text-white'>{dataa.catagory}</h1>
                                {
                                    dataa.isAproved == true?
                                    <h1 className='text-lg mt-1 bg-green-400 px-2 rounded-r-lg text-white'>Aproved</h1>
                                    :
                                    <h1 className='text-lg mt-1 bg-red-400 px-2 rounded-r-lg text-white'>Pending</h1>
                                }
                                <h1 className='text-xl  mt-2 font-medium text-[#af5845]'>{dataa.assetName}</h1>
                                <h1 className='text-2xl font-semibold my-1 text-[#af5845]'>${dataa.price}</h1>
                                <br />
                                <Button variant="contained bg-[#af5845]" className='text-white'>Buy It Now</Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default MyAsset;