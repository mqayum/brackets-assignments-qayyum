import Link from "next/link";
import {MdOutlineDashboard, MdOutlineRequestPage, MdOutlineFeedback} from "react-icons/md"
import {CgProfile, CgList, CgFileDocument} from "react-icons/cg"
import {FiPackage} from "react-icons/fi";
import {GoIssueOpened} from "react-icons/go"
import {TbListDetails} from "react-icons/tb"
import {BiDollarCircle} from "react-icons/bi"
import { AiOutlinePicture } from "react-icons/ai"

const DesignerDashMenu = () => {
    return(
        <>
            <li className="mt-5"><Link href="/dashboard/designer" className="active"><MdOutlineDashboard/> Dashboard</Link></li>
            <li className="menu-title">
                <span>Portfolio</span>
            </li>
            <li><Link href="/dashboard/designer/profile"><CgProfile/>Designer Profile</Link></li>
            <li><Link href="#"><FiPackage/>Service Packages</Link></li>
            <li><Link href="#"><AiOutlinePicture/>Add New Design</Link></li>
            <li><Link href="#"><TbListDetails/>Listed Designs</Link></li>
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
export default DesignerDashMenu;