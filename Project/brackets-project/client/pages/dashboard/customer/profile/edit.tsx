import React, {ReactElement, useEffect, useState} from "react";
import Image from "next/image"
import DashboardLayout from "../../../../components/layouts/DashboradLayout";
import {useGetUserQuery, useUpdateProfileImageMutation, useUpdateProfileMutation} from "../../../../api/userApi";
import {FiUpload} from "react-icons/fi"
import {useRouter} from "next/router";
import toast from "react-hot-toast";
import {TUploadImage} from "../../../../types/types";
import {BACKEND_URL} from "../../../../config/constants";

const CustomerProfile = () => {
    const {data, isSuccess} = useGetUserQuery();
    const [updateProfile, {error}] = useUpdateProfileMutation()

    const [updateProfileImage, {error:uploadError}] = useUpdateProfileImageMutation();

    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        username: "",
        phone: "",
        email: "",
    })

    useEffect(()=>{
        if (isSuccess){
            setState(data.user);
        }
    },[data])


    const router = useRouter();
    const clickUploadButton = () => {
        if (window !== undefined && document !== undefined){
            document.getElementById("profile")?.click();
        }
    }

    if (isSuccess){
        const user = data.user

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const name = event.target.name;
            const value = event.target.value;
            setState({ ...state, [name]: value });

        };
        const handleSubmit = async () => {
            try {
                const res = await updateProfile({data:state, userId:user.id}).unwrap();
                if (!error){
                    toast.success("Profile Updated Successful.");
                    router.push("/dashboard/customer/profile")
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
                formData.append("profileImage", files[0]);

                const uploadRes = await updateProfileImage({formData, userId:user.id});
                if (!uploadError)
                    toast.success("Profile Image Updated Successfully.");
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
                            {user.profileImage ?
                                <Image src={`${BACKEND_URL}/${user.profileImage}`} width={150} height={150} className="mask mask-circle" alt="Profile Image"/>:
                                <Image src={`${BACKEND_URL}/avatar.png`} width={150} height={150} className="mask mask-circle" alt="Profile Image"/>}
                        </figure>
                        <div className="card-title flex flex-col text-3xl mt-5">
                            <span>{user.firstname} {user.lastname}</span>
                            <div className="px-4 py-2 flex gap-2">
                                <button className="btn btn-primary flex gap-2" onClick={clickUploadButton}>
                                    <FiUpload />
                                    Upload Profile Image
                                </button>
                                <input type="file" accept="image/*" hidden={true} id="profile" name="profileImage" onChange={uploadImage} />
                            </div>
                        </div>
                        <div className="card-body">
                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-2 text-sm">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">First Name</div>
                                    <div className="px-4 py-2">
                                        <input type="text" placeholder="First Name" name="firstname" value={state.firstname} onChange={handleChange} className="input input-sm input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Last Name</div>
                                    <div className="px-4 py-2">
                                        <input type="text" placeholder="Last Name" name="lastname" value={state.lastname} onChange={handleChange} className="input input-sm input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Username</div>
                                    <div className="px-4 py-2">
                                        <input type="text" placeholder="User Name" name="username" value={state.username} onChange={handleChange} className="input input-sm input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Email.</div>
                                    <div className="px-4 py-2">
                                        <input type="text" placeholder="Email Address" name="email" value={state.email} onChange={handleChange} className="input input-sm input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                                    <div className="px-4 py-2">
                                        <input type="text" placeholder="Phone" name="phone" value={state.phone} onChange={handleChange} className="input input-sm input-bordered w-full max-w-xs" />
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
CustomerProfile.getLayout = (page:ReactElement) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

// export const getServerSideProps = async (ctx:GetServerSidePropsContext) => {
//     return await refetchUserState(ctx)
// }

export default CustomerProfile