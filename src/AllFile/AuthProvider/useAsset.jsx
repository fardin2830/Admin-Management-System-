import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "./AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useAsset = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { refetch, data: assetlist = [] } = useQuery({
        queryKey: ['assetlist', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/asset?email=${user?.email}`);
            return res.data;
        }
    })

    return [assetlist, refetch]
};
export default useAsset;