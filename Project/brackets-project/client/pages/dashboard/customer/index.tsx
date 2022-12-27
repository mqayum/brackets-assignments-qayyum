import Head from "next/head"
import DashboardLayout from "../../../components/layouts/DashboradLayout"
import {ReactElement} from "react";

const CustomerDashboard = () => {
    return (
        <div>
            <Head>
                <title>Dashboard</title>
            </Head>
            This is customers dashboard
        </div>
    )
}

CustomerDashboard.getLayout = function (page:ReactElement){
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}
export default CustomerDashboard