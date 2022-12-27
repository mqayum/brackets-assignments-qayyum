import Link from "next/link";
import  "../styles/navbar.module.css"
import {FaBars} from "react-icons/fa"

import {hasCookie} from "cookies-next";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store/store";
import AvatarDropdown from "./AvatarDropdown";
import {useGetUserQuery} from "../api/userApi";
import {skipToken} from "@reduxjs/toolkit/query";


const TopNav = () => {
    // const [getUser, {data}] = useLazyGetUserQuery();
    const {data} = useGetUserQuery(undefined, {skip:!hasCookie("token")});

    const auth = useSelector((state:RootState)=>state.auth)

    return (
            <div className="navbar bg-base-100 sticky top-0 left-0 z-40 bg-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <FaBars/>
                        </label>
                        <ul tabIndex={0} className="menu drop-shadow-lg menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="bordered"><Link href="/">Home</Link></li>
                            <li><Link href="#">About</Link></li>
                            <li><Link href="#">Contact</Link></li>
                            <li><Link href="#">Designers</Link></li>
                            <li><Link href="#">Create Design</Link></li>
                        </ul>
                    </div>
                    <Link href="#" className="normal-case text-primary font-bold text-3xl">DIM.</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal bg-base-100">
                        <li className="bordered"><Link href="/">Home</Link></li>
                        <li><Link href="#">About</Link></li>
                        <li><Link href="#">Contact</Link></li>
                        <li><Link href="#">Designers</Link></li>
                        <li><Link href="#">Create Design</Link></li>
                    </ul>
                </div>
                { !auth.isAuthenticated || !hasCookie("token") ?
                    <div className="navbar-end">
                        <Link href="/login" className="btn btn-sm  btn-primary">Login</Link>
                        <Link href="/signup" className="ml-2 btn btn-sm btn-primary">Sign Up</Link>
                    </div> :
                    data ?
                        <AvatarDropdown user={data.user} /> : <></>
                }

            </div>

    )
}
export default TopNav;