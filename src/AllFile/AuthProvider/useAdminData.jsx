import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from './AuthProvider';

const useAdminData = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { refetch, data: admin = [] } = useQuery({
        queryKey: ['admin', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin?email=${user.email}`);
            return res.data;
        }
    })

    return [admin, refetch]
};
export default useAdminData;