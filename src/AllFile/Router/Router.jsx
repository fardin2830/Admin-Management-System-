import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Root/Root";
import SignIn from "../Components/Pages/Home/Login";
import Joinemployee from "../Components/Pages/Home/JoinasEmployee";
import Joinadmin from "../Components/Pages/Home/JoinasAdmin";
import PackPay from "../Components/Pages/Admin/Payment/PackPay";
import Home from "../Components/Pages/Home/Home";
import AddAnEmployeePage from "../Components/Pages/AddAnEmployee/AddAnEmployeePage";
import ReqAsset from "../Components/Pages/AddAnEmployee/ReqForanAsset/Reqforanasset";
import CustomRequest from "../Components/Pages/Admin/AddAsset";
import AssetList from "../Components/Pages/Admin/AssetList";
import MyEmployeeList from "../Components/Pages/MyEmployeeList/MyEmployeeList";
import MyTeamList from "../Components/Pages/Employee/MyTeamList";
import Profile from "../Components/Pages/Employee/Profile";
import MyAsset from "../Components/Pages/Home/EmployeeHome/Myasset";
import CustomRequ from "../Components/Pages/Home/EmployeeHome/CustomRequ";
import AdminReqList from "../Components/Pages/Admin/AdminReqList";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[

        {
          path:"/",
          element: <Home></Home>
        },
        {
          path:"/login",
          element: <SignIn></SignIn>
        },
        {
          path:"/joinemployee",
          element:<Joinemployee></Joinemployee>
        },
        {
          path:"/joinadmin",
          element:<Joinadmin></Joinadmin>
        },
        {
          path:"/payment",
          element:<PackPay></PackPay>
        },
        {
          path:"/addEmployee",
          element:<AddAnEmployeePage></AddAnEmployeePage>
        },
        {
          path:"/requestforanasset",
          element:<ReqAsset></ReqAsset>
        },
        {
          path:"/addasset",
          element:<CustomRequest></CustomRequest>
        },
        {
          path:"/assetlist",
          element:<AssetList></AssetList>
        },
        {
          path:"/myemployeelist",
          element:<MyEmployeeList></MyEmployeeList>
        },
        {
          path:"/myteam",
          element:<MyTeamList></MyTeamList>
        },
        {
          path:"/profile",
          element:<Profile></Profile>
        },
        {
          path:"/myasset",
          element:<MyAsset></MyAsset>
        },
        {
          path:"/cusreq",
          element:<CustomRequ></CustomRequ>
        },
        {
          path:"/adminreqlist",
          element:<AdminReqList></AdminReqList>
        },
      ]
    }
  ]);
export default router;