import React, { useContext } from 'react';
import useAdminData from '../../../AuthProvider/useAdminData';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import useTeamData from '../../../AuthProvider/useTeam';

const PackLimit = () => {
    const [admin]=useAdminData();
    const { user, loading, logOut } = useContext(AuthContext);
    const adm = admin?.filter((adm) => adm?.email == user?.email);
    const limit = adm[0]?.memberlimit;
    const [team,refetch]=useTeamData();
    refetch();
    const tt = team?.filter((adm) => adm?.hremail == user?.email);
    return (
        <div>
            <h1>{limit-tt?.length}</h1>
        </div>
    );
};

export default PackLimit;