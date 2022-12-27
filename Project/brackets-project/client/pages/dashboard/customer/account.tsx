import Head from "next/head";
import {ReactElement} from "react";
import DashboardLayout from "../../../components/layouts/DashboradLayout";
import CustomerDashboard from "./index";
import {useGetUserQuery, useToggle2faMutation} from "../../../api/userApi";
import toast,{Toaster} from "react-hot-toast";

const Account = () => {
    const {data, isSuccess} = useGetUserQuery();
    const [toggle2fa, {error}] = useToggle2faMutation();
    if (isSuccess){
        const user = data.user;
        const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
            try {
                const res = await toggle2fa().unwrap();
                toast.success(res.message, {
                    duration: 2000
                })
            }
            catch (e) {

            }

        }
        return (
            <div className="card w-full bg-base-100 shadow-xl">
                <Toaster />
                <div className="card-body">
                    <h2 className="card-title">Account Settings</h2>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Enable Two-Factor Authentication</span>
                            <input type="checkbox" className="toggle" onChange={handleToggle} checked={user.twoFactorAuth}/>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}
Account.getLayout = function (page:ReactElement){
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}
export default Account;