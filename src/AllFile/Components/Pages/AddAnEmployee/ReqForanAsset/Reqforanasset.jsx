import { useContext, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import useCustomReqData from "../../../../AuthProvider/useCustomReqData";
import useAdminData from "../../../../AuthProvider/useAdminData";
import { Box, Button, InputLabel, LinearProgress, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const ReqAsset = () => {
    const { user, loading } = useContext(AuthContext);
    const [customreq] = useCustomReqData();
    const mycustomreq = customreq?.filter((req) => req?.email == user?.email);
    const [selectCat, setSelectCat] = useState('');
    const [selectInputText, setSelectInputText] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [isCategory, setIsCategory] = useState(false);
    const [approvalStatus, setApprovalStatus] = useState('');
    const [isApprovalStatus, setIsApprovalStatus] = useState(false);
    const [admin] = useAdminData();
    const adm = admin?.filter((ad) => ad?.email == user?.email);
    // Modal start
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubu = (e) => {
        e.preventDefault();
        const additionalNote = e.target.elements.additional.value;
        console.log(additionalNote);
    }
    // Modal End 
    const handleApprovalStatusChange = (e) => {
        const status = e.target.value;
        setApprovalStatus(status);
        setIsApprovalStatus(!!status);
        setIsSearch(false);
        setIsCategory(false);
    };
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
    // const filteredObjects = mycustomreq?.filter(obj => {
    //     const titleMatches = obj?.assetName?.toLowerCase().includes(selectInputText?.toLowerCase());
    //     const categoryMatches = !selectCat || obj?.type === selectCat;
    //     return (isSearch && titleMatches) || (isCategory && categoryMatches) || (!isSearch && !isCategory);
    // });
    const filteredObjects = mycustomreq?.filter(obj => {
        const titleMatches = obj?.assetName?.toLowerCase().includes(selectInputText?.toLowerCase());
        const categoryMatches = !selectCat || obj?.type === selectCat;
        const approvalMatches = !approvalStatus || (obj?.isApproved && approvalStatus === 'approved') || (!obj?.isApproved && approvalStatus === 'pending');
        return (isSearch && titleMatches) || (isCategory && categoryMatches) || (isApprovalStatus && approvalMatches) || (!isSearch && !isCategory && !isApprovalStatus);
    });

    // console.log(filteredObjects);
    if (loading) {
        return (<Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>);
    }
    return (
        <div>
            <span className='grid grid-cols-1 lg:grid-cols-3'>
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
                <form className='w-[80%] mx-auto mt-3 flex flex-col items-center'>
                    <InputLabel id="demo-simple-select-label" className='pb-2 text-xl font-semibold'>Approval Status</InputLabel>
                    <Select
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        value={approvalStatus}
                        onChange={handleApprovalStatusChange}
                        disabled={isSearch || isCategory}
                        className='w-full'
                    >
                        <MenuItem value="">
                            <em>Select ...</em>
                        </MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                    </Select>
                </form>
            </span>
            <div className='w-[80%] lg:w-full mx-auto my-10 grid grid-cols-1 lg:grid-cols-4 gap-3'>
                {
                    filteredObjects?.map((dataa, i) => (
                        <div className='w-full h-96  border-black'>
                            <div className='w-full h-full shadow-xl rounded-lg relative flex flex-col items-center bg-[#F6E8D5] border-[#af5845] mx-auto'>

                                <img src={dataa.image} className='w-full h-[40%] rounded-t-lg' alt="https://i.ibb.co/HT36ypS/1.webp" />
                                <h1 className='text-lg bg-[#af584586] px-3 my-1 rounded-b-lg text-white'>{dataa.catagory}</h1>
                                <span className="flex gap-2 items-center">
                                    {
                                        dataa.isAproved == true ?
                                            <h1 className='text-lg mt-1 bg-green-400 px-2 rounded-lg text-white'>Aproved</h1>
                                            :
                                            <h1 className='text-lg mt-1 bg-red-400 px-2 rounded-lg text-white'>Pending</h1>
                                    }
                                    {
                                        dataa.quantity == 0 ?
                                            <h1 className='text-lg mt-1 bg-red-400 px-2 rounded-lg text-white'>Out of Stock</h1>
                                            :
                                            <h1 className='text-lg mt-1 bg-green-400 px-2 rounded-lg text-white'>Available</h1>
                                    }
                                </span>
                                <h1 className='text-xl  mt-2 font-medium text-[#af5845]'>{dataa.assetName}</h1>
                                <h1 className='text-2xl font-semibold my-1 text-[#af5845]'>${dataa.price}</h1>
                                <br />
                                <Button variant="contained" className='text-white bg-[#af5845]' onClick={handleOpen}>Request</Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <form action="" className='w-full mx-autolex flex-col items-center justify-center' onSubmit={handleSubu}>
                                            <InputLabel id="demo-simple-select-label" className='pb-2 text-xl font-semibold'>Additional Note</InputLabel>
                                            <br />

                                            <TextField
                                                autoComplete="given-name"
                                                name="additional"
                                                fullWidth
                                                label="Enter Additional Note here ..."
                                            />
                                            <br />
                                            <Button variant="contained" className='text-white bg-[#af5845] mt-3' type="submit">Submit</Button>
                                        </form>
                                    </Box>
                                </Modal>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ReqAsset;