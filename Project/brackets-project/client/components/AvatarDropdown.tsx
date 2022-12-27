import Image from "next/image";
import {isAdmin, isDesigner, isVendor} from "../helpers/authorization.helper";
import Link from "next/link";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {setAuth} from "../store/authSlice";
import {deleteCookie, setCookie} from "cookies-next";
import {useLogoutMutation} from "../api/userApi";
import {IUserObj} from "../types/types";
import toast, {Toaster} from "react-hot-toast";
import {BACKEND_URL} from "../config/constants";
import React from "react";


const AvatarDropdown = ({user}: { user:IUserObj }) => {
    const [logout, {error}] = useLogoutMutation();
    const router = useRouter();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const res = await logout();
            if (!error){
                toast.success("Logged Out Successfully.");
                dispatch(setAuth(false));
                deleteCookie("token")
                router.push("/")
            }
        }
        catch (e) {
            toast.error("Something is Wrong");
            console.log(e)
        }
    }
    return (
        <div className="navbar-end dropdown dropdown-bottom flex gap-3">
            <Toaster />
            <h1 className="uppercase">{user.firstname} {user.lastname}</h1>
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
                <div className="w-10 rounded-full">
                    {user.profileImage ?
                        <Image src={`${BACKEND_URL}/${user.profileImage}`} width={50} height={50} className="mask mask-circle" alt="Profile Image"/>:
                        <Image src={`${BACKEND_URL}/avatar.png`} width={50} height={50} className="mask mask-circle" alt="Profile Image"/>}
                </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 drop-shadow-lg menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                {
                    isAdmin(user) ?
                        <li className="border-b">
                            <Link href="/dashboard/admin">Admin Panel</Link>
                        </li>
                        :
                        <></>
                }
                <li>
                    <Link href="/dashboard/customer/profile" className="justify-between">Dashboard</Link>
                </li>
                {
                    isVendor(user) ?
                        <li>
                            <Link href="/dashboard/vendor/profile">Vendor Dashboard</Link>
                        </li>
                        :
                        <li>
                            <Link href="/register/vendor">Register As Vendor</Link>
                        </li>

                }
                {
                    isDesigner(user) ?
                        <li>
                            <Link href="/dashboard/designer/profile">Designer Dashboard</Link>
                        </li>
                        :
                        <li>
                            <Link href="/register/designer">Register As Designer</Link>
                        </li>
                }
                <li>
                    <button onClick={logoutHandler}>Logout</button>
                </li>
            </ul>
        </div>
    )
}
export default AvatarDropdown;