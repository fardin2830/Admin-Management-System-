import React from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveDrawer from './Drawer';

const Root = () => {
    return (
        <div>
            <ResponsiveDrawer></ResponsiveDrawer>
        </div>
    );
};

export default Root;