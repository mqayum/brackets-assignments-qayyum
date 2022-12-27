import React, {ReactElement, useEffect, useState} from "react";
import Image from "next/image"
import DashboardLayout from "../../../../components/layouts/DashboradLayout";
import {useGetVendorQuery, useUpdateVendorMutation, useUpdateLogoMutation} from "../../../../api/spApi";
import {FiUpload} from "react-icons/fi"
import {useRouter} from "next/router";
import toast from "react-hot-toast";
import {TUploadImage} from "../../../../types/types";
import {BACKEND_URL} from "../../../../config/constants";
import ListedProducts from "../product/listed";

const VendorProfile = () => {
    const {data, isSuccess} = useGetVendorQuery();

    const [updateVendor, {error}] = useUpdateVendorMutation()

    const [updateLogo, {error:uploadError}] = useUpdateLogoMutation();

    const [state, setState] = useState({
        spName: "",
        businessPhone: "",
        businessAddress: ""
    })

    useEffect(()=>{
        if (isSuccess){
            setState(data.sp);
        }
    },[data])


    const router = useRouter();
    const clickUploadButton = () => {
        if (window !== undefined && document !== undefined){
            document.getElementById("logo")?.click();
        }
    }

    if (isSuccess){
        const vendor = data.sp

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const name = event.target.name;
            const value = event.target.value;
            setState({ ...state, [name]: value });

        };
        const handleSubmit = async () => {
            try {
                const res = await updateVendor({data:state, spId:vendor.id}).unwrap();
                if (!error){
                    toast.success(" Vendor Profile Updated Successfully.");
                    router.push("/dashboard/vendor/profile")
                }
            }
            catch (e) {
                // @ts-ignore
                toast.error("Error: "+e.data.message);
                console.log(e)
            }
        }
        const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
            try {
                const formData = new FormData();
                const files = e.target.files;
                // @ts-ignore
                formData.append("brandLogo", files[0]);

                const uploadRes = await updateLogo({formData, spId:vendor.id});
                if (!uploadError)
                    toast.success("Business Logo Updated Successfully.");
            }
            catch (e) {
                // @ts-ignore
                toast.error("Error: "+e.data.message);
                console.log(e)
            }
        }
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
                            <div className="px-4 py-2 flex gap-2">
                                <button className="btn btn-primary flex gap-2" onClick={clickUploadButton}>
                                    <FiUpload />
                                    Upload Profile Image
                                </button>
                                <input type="file" accept="image/*" hidden={true} id="logo" name="brandLogo" onChange={uploadImage} />
                            </div>
                        </div>
                        <div className="card-body">
                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-2 text-sm">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Brand Name</div>
                                    <div className="px-4 py-2">
                                        <input type="text" placeholder="Brand Name" name="spName" value={state.spName} onChange={handleChange} className="input input-sm input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Business Contact</div>
                                    <div className="px-4 py-2">
                                        <input type="text" placeholder="Business Phone" name="businessPhone" value={state.businessPhone} onChange={handleChange} className="input input-sm input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Business Address</div>
                                    <div className="px-4 py-2">
                                        <input type="text" placeholder="Business Address" name="businessAddress" value={state.businessAddress} onChange={handleChange} className="input input-sm input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleSubmit}
                            className="btn btn-outline btn-primary">Update Profile
                        </button>
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