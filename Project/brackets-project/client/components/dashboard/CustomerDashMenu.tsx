import Link from "next/link";
import {MdOutlineDashboard, MdOutlineManageAccounts, MdOutlinePalette, MdOutlineRequestPage, MdOutlineFeedback} from "react-icons/md"
import {CgProfile, CgList, CgFileDocument} from "react-icons/cg"
import {BsListNested} from "react-icons/bs"


const CustomerDashMenu = () => {
    return(
        <>
            <li className="mt-5 active"><Link href="/dashboard/customer/"><MdOutlineDashboard/> Dashboard</Link></li>
            <li className="menu-title">
                <span>Account</span>
            </li>
            <li><Link href="/dashboard/customer/profile" ><CgProfile/> Profile</Link></li>
            <li><Link href="/dashboard/customer/account"><MdOutlineManageAccounts/> Account Settings</Link></li>
            <li className="menu-title">
                <span>Orders</span>
            </li>
            <li><Link href="#"><MdOutlineRequestPage/>Active Orders</Link></li>
            <li><Link href="#"><CgList/>Order History</Link></li>
            <li className="menu-title">
                <span>Hire Requests</span>
            </li>
            <li><Link href="#"><CgFileDocument/> Create Request</Link></li>
            <li><Link href="#"><BsListNested/> Show Request</Link></li>
            <li className="menu-title">
                <span>Other</span>
            </li>
            <li><Link href="#"><MdOutlinePalette/> Saved Designs</Link></li>
            <li><Link href="#"><MdOutlineFeedback/> System Feedbacks</Link></li>
        </>
    )
}
export default CustomerDashMenu;