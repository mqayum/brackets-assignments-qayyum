import Link from "next/link";
import {MdOutlineDashboard, MdOutlineCategory, MdAttachMoney, MdOutlineRequestPage, MdOutlineFeedback} from "react-icons/md"
import {CgIfDesign} from "react-icons/cg"
import {FiUsers} from "react-icons/fi";
import {GoIssueOpened} from "react-icons/go"
import {TbReportMoney, TbReportAnalytics, TbResize} from "react-icons/tb"
import {AiOutlineAppstoreAdd} from "react-icons/ai"

const AdminDashMenu = () => {
    return(
        <>
            <li className="mt-5"><Link href="#" className="active"><MdOutlineDashboard/> Dashboard</Link></li>
            <li className="menu-title">
                <span>Users</span>
            </li>
            <li><Link href="#"><FiUsers/> Manage Users</Link></li>
            <li className="menu-title">
                <span>Orders</span>
            </li>
            <li><Link href="#"><MdOutlineRequestPage/>Active Orders</Link></li>
            <li><Link href="#"><GoIssueOpened/>Disputed Orders</Link></li>
            <li className="menu-title">
                <span>Revenue</span>
            </li>
            <li><Link href="#"><MdAttachMoney/>Withdraw Requests</Link></li>
            <li><Link href="#"><TbReportAnalytics/>Profit Report</Link></li>
            <li><Link href="#"><TbReportMoney/>Total Payables</Link></li>

            <li className="menu-title">
                <span>Design Maker</span>
            </li>
            <li><Link href="#"><TbResize/> Canvas Sizes</Link></li>
            <li><Link href="#"><CgIfDesign/> Design Templates</Link></li>

            <li className="menu-title">
                <span>System</span>
            </li>
            <li><Link href="#"><AiOutlineAppstoreAdd/> Add Categories</Link></li>
            <li><Link href="#"><MdOutlineCategory/> View Categories</Link></li>
        </>
    )
}
export default AdminDashMenu;