import { useContext, useState } from "react";
import { Box, Button, InputLabel, LinearProgress, MenuItem, Modal, Select, Table, TextField, Typography } from "@mui/material";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAsset from "../../../AuthProvider/useAsset";
import { Delete, Update } from "@mui/icons-material";
import { Sheet } from "@mui/joy";
const AssetList = () => {
    const { user, loading } = useContext(AuthContext);
    const [assetlist] = useAsset();
    const myassetlist = assetlist?.filter((req) => req?.email == user?.email);
    const [selectCat, setSelectCat] = useState('');
    const [selectInputText, setSelectInputText] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [isCategory, setIsCategory] = useState(false);
    // const adm = customreq?.filter((ad) => ad?.email == user?.email);
    console.log(myassetlist);
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
    const filteredObjects = myassetlist?.filter(obj => {
        const titleMatches = obj?.assetName?.toLowerCase().includes(selectInputText?.toLowerCase());
        const categoryMatches = !selectCat || obj?.type === selectCat;

        return (isSearch && titleMatches) || (isCategory && categoryMatches) || (!isSearch && !isCategory);
    });
    console.log(filteredObjects);
    // console.log(filteredObjects);
    if (loading) {
        return (<Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>);
    }
    return (
        <div>
            <h1 className='text-center text-3xl'>Asset List Page</h1>
            <span className='grid grid-cols-1 lg:grid-cols-2'>
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
            <br />
            <Sheet variant="soft" sx={{ pt: 1, borderRadius: 'sm' }}>
                <Table
                    stripe="odd"
                    hoverRow
                    sx={{ captionSide: 'top', '& tbody': { bgcolor: 'background.surface' } }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: '30%' }}>Product Name</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Date</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredObjects.map((row) => (
                            <tr key={row.assetName} className="text-center">
                                <td>{row.assetName}</td>
                                <td>{
                                    row.type == 2 ?
                                        <h1>Returnable</h1>
                                        :
                                        <h1>Non-Returnabe</h1>
                                }</td>
                                <td>{row.quantity}</td>
                                <td>{row.day}-{row.month}-{row.year}</td>
                                <td><Update></Update><Delete></Delete></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Sheet>
        </div>
    );
};

export default AssetList;