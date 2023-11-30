
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from './AuthProvider';
import { useContext } from 'react';

const useCustomReqData = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { refetch, data: customreq = [] } = useQuery({
        queryKey: ['customreq', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/customreq?email=${user?.email}`);
            return res.data;
        }
    })

    return [customreq, refetch]
};
export default useCustomReqData;