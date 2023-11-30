import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useEmployeeData = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { refetch, data: employee = [] } = useQuery({
        queryKey: ['employee', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/employee?email=${user.email}`);
            return res.data;
        }
    })

    return [employee, refetch]
};
export default useEmployeeData;