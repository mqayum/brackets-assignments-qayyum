import CustomerDashMenu from "./CustomerDashMenu";
import Link from "next/link"
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {isAdmin, isDesigner, isVendor} from "../../helpers/authorization.helper";
import {IUserObj} from "../../types/types";
import VendorDashMenu from "./VendorDashMenu";
import {useRouter} from "next/router";
import DesignerDashMenu from "./DesignerDashMenu";
import AdminDashMenu from "./AdminDashMenu";
import {useGetUserQuery} from "../../api/userApi";

const Sidebar = () => {
    const {data} = useGetUserQuery()
    // const user = useSelector((state:RootState)=>state.auth.user);
    const router = useRouter()

    const displayRoleBasedMenu = (user: IUserObj) => {
        const url = router.route;
        if (url.includes("/dashboard/admin") && isAdmin(user))
            return <AdminDashMenu />
        else if(url.includes("/dashboard/designer") && isDesigner(user))
            return <DesignerDashMenu />
        else if(url.includes("/dashboard/vendor") && isVendor(user))
            return <VendorDashMenu />
        else if (url.includes("/dashboard/customer"))
            return <CustomerDashMenu />
    }

    return (
        <>
            <div className="drawer drawer-mobile fixed top-16 z-50 lg:top-0 lg:block w-64">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                    <ul className="menu menu-compact border-r-2 p-4 lg:h-screen bg-blue-200">
                        {/*<h1 className="font-bold min-h-16 flex items-center justify-center bg-primary text-center text-2xl text-white">DIM.</h1>*/}
                        <li><Link href="/" className="btn btn-primary text-white">Go Home</Link></li>
                        {data && displayRoleBasedMenu(data.user)}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar