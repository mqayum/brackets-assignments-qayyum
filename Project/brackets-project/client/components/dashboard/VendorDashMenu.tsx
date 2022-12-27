import Link from "next/link";
import {MdOutlineDashboard, MdOutlineManageAccounts, MdOutlinePalette, MdOutlineRequestPage, MdOutlineFeedback} from "react-icons/md"
import {CgProfile, CgList, CgFileDocument} from "react-icons/cg"
import {FiBox} from "react-icons/fi";
import {GoIssueOpened} from "react-icons/go"
import {TbListDetails} from "react-icons/tb"
import {BiDollarCircle} from "react-icons/bi"

const VendorDashMenu = () => {
    return(
        <>
            <li className="mt-5"><Link href="/dashboard/vendor" className="active"><MdOutlineDashboard/> Dashboard</Link></li>
            <li className="menu-title">
                <span>Portfolio</span>
            </li>
            <li><Link href="/dashboard/vendor/profile"><CgProfile/>Vendor Profile</Link></li>
            <li><Link href="/dashboard/vendor/product"><FiBox/>Add New Product</Link></li>
            <li><Link href="/dashboard/vendor/product/listed"><TbListDetails/>Listed Products</Link></li>
            <li className="menu-title">
                <span>Orders</span>
            </li>
            <li><Link href="#"><MdOutlineRequestPage/>Active Orders</Link></li>
            <li><Link href="#"><GoIssueOpened/>Disputed Orders</Link></li>
            <li><Link href="#"><CgList/>Order History</Link></li>
            <li className="menu-title">
                <span>Hire Requests</span>
            </li>
            <li><Link href="#"><CgFileDocument/> Buyer Requests</Link></li>
            <li className="menu-title">
                <span>Other</span>
            </li>
            <li><Link href="#"><BiDollarCircle/> Balance Withdraw</Link></li>
            <li><Link href="#"><MdOutlineFeedback/> System Feedbacks</Link></li>
        </>
    )
}
export default VendorDashMenu;