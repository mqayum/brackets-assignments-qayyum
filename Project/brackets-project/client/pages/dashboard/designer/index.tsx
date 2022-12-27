
import DashboardLayout from "../../../components/layouts/DashboradLayout";
import {ReactElement} from "react";
import Head from "next/head";

const DesignerDashboard = () => {

    return (
        <div>
            <Head>
                <title>Dashboard</title>
            </Head>
            This is designer dashboard
        </div>
    )
}
DesignerDashboard.getLayout = (page:ReactElement) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}
DesignerDashboard.requiredRole = "DESIGNER"

export default DesignerDashboard;