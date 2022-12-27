
import DashboardLayout from "../../../components/layouts/DashboradLayout";
import {ReactElement} from "react";
import Head from "next/head";

const VendorDashboard = () => {

    return (
        <div>
            <Head>
                <title>Dashboard</title>
            </Head>
            This is vendor dashboard
        </div>
    )
}
VendorDashboard.getLayout = (page:ReactElement) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}
VendorDashboard.requiredRole = "VENDOR"

export default VendorDashboard;