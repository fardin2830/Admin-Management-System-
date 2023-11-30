import React from 'react';
import ListTeam from './ListTeam';
import Birthday from './Birthday';

const MyTeamList = () => {
    return (
        <div>
            <h1 className='text-3xl text-center mb-3'>My Team</h1>
            <ListTeam></ListTeam>
            <h1 className='text-3xl text-center mb-3'>Upcoming Event</h1>
            <Birthday></Birthday>
        </div>
    );
};

export default MyTeamList;