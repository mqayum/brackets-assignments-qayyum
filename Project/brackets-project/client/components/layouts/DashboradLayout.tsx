import {LayoutProp} from "../../types/types";
import Sidebar from "../../components/dashboard/Sidebar";
import DashNav from "../dashboard/DashNav";
import PagePath from "../dashboard/PagePath";
import {useRouter} from "next/router";


const DashboardLayout = ({children} : LayoutProp) => {
    const router = useRouter();
    return(
        <>
            <div className="flex flex-col-reverse lg:flex-row">
                <Sidebar />
                <div className="w-full lg:w-[calc(100%-16rem)] lg:ml-64">
                    <DashNav />
                    <div className="p-5">
                        <PagePath url={router.route}/>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
export default DashboardLayout