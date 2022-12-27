
import DashboardLayout from "../../../components/layouts/DashboradLayout";
import {ReactElement} from "react";
import Head from "next/head";

const AdminDashboard = () => {

    return (
        <div>
            <Head>
                <title>Dashboard</title>
            </Head>

            This is designer dashboard
        </div>
    )
}
AdminDashboard.getLayout = (page:ReactElement) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}
AdminDashboard.requiredRole = "ADMIN";

export default AdminDashboard;