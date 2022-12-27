import React, {ReactElement} from "react";
import Image from "next/image"
import DashboardLayout from "../../../../components/layouts/DashboradLayout";
import {useGetVendorQuery} from "../../../../api/spApi";
import Link from "next/link";
import {BACKEND_URL} from "../../../../config/constants";
import ListedProducts from "../product/listed";


const VendorProfile = () => {
    const {data, isSuccess} = useGetVendorQuery();
    console.log(data, isSuccess);

    if (isSuccess){
        const vendor = data.sp
        return (
            <>
                <div className="card flex justify-between items-center bg-base-100 px-10">
                    <figure>
                        {vendor.brandLogo ?
                            <Image src={`${BACKEND_URL}/${vendor.brandLogo}`} width={150} height={150} className="mask mask-circle" alt="Profile Image"/>:
                            <Image src={`${BACKEND_URL}/avatar.png`} width={150} height={150} className="mask mask-circle" alt="Profile Image"/>}
                    </figure>
                    <div className="card-title flex flex-col text-3xl mt-5">
                        <span>{vendor.spName}</span>
                    </div>
                    <div className="card-body">

                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-2 text-sm">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Brand Name</div>
                                    <div className="px-4 py-2">{vendor.spName}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Business Contact</div>
                                    <div className="px-4 py-2">{vendor.businessPhone}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Business Location</div>
                                    <div className="px-4 py-2">{vendor.businessAddress}</div>
                                </div>
                            </div>
                        </div>
                        <Link href="/dashboard/vendor/profile/edit" className="btn btn-outline btn-primary" >
                            Update Profile
                        </Link>
                    </div>
                </div>
            </>
        )
    }

}
VendorProfile.getLayout = (page:ReactElement) => {
  return (
        <DashboardLayout>
          {page}
        </DashboardLayout>
      )
}

VendorProfile.requiredRole = "VENDOR"

export default VendorProfile