import React, {ReactElement} from "react";
import Image from "next/image"
import DashboardLayout from "../../../../components/layouts/DashboradLayout";
import {useGetDesignerQuery} from "../../../../api/spApi";
import Link from "next/link";
import {BACKEND_URL} from "../../../../config/constants";
import DesignerDashboard from "../index";


const DesignerProfile = () => {
    const {data, isSuccess} = useGetDesignerQuery();

    if (isSuccess){
        const designer = data.sp
        return (
            <>
                <div className="card flex justify-between items-center bg-base-100 px-10">
                    <figure>
                        {designer.brandLogo ?
                            <Image src={`${BACKEND_URL}/${designer.brandLogo}`} width={150} height={150} className="mask mask-circle" alt="Profile Image"/>:
                            <Image src={`${BACKEND_URL}/avatar.png`} width={150} height={150} className="mask mask-circle" alt="Profile Image"/>}
                    </figure>
                    <div className="card-title flex flex-col text-3xl mt-5">
                        <span>{designer.spName}</span>
                    </div>
                    <div className="card-body">

                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-1 text-sm">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Brand Name</div>
                                    <div className="px-4 py-2">{designer.spName}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Job Title</div>
                                    <div className="px-4 py-2">{designer.jobTitle}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Skills</div>
                                    <div className="px-4 py-2 flex gap-2 flex-wrap">{designer.skills.map(s=>{
                                        return <span key={s} className="badge badge-primary">{s}</span>
                                    })}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Biography</div>
                                    <div className="px-4 py-2">{designer.bio}</div>
                                </div>
                            </div>
                        </div>
                        <Link href="/dashboard/designer/profile/edit" className="btn btn-outline btn-primary" >
                            Update Profile
                        </Link>
                    </div>
                </div>
            </>
        )
    }

}
DesignerProfile.getLayout = (page:ReactElement) => {
  return (
        <DashboardLayout>
          {page}
        </DashboardLayout>
      )
}
DesignerProfile.requiredRole = "DESIGNER"

export default DesignerProfile