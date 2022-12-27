import React, {ReactElement} from "react";
import Image from "next/image"
import DashboardLayout from "../../../../components/layouts/DashboradLayout";
import {useGetUserQuery} from "../../../../api/userApi";
import Link from "next/link";
import {BACKEND_URL} from "../../../../config/constants";


const CustomerProfile = () => {
    const {data, isSuccess} = useGetUserQuery();

    if (isSuccess){
        const user = data.user
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
                            {user.roles?.map(role=><span key={role} className="badge badge-primary">{role}</span>)}
                        </div>
                    </div>
                    <div className="card-body">

                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-2 text-sm">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">First Name</div>
                                    <div className="px-4 py-2">{user.firstname}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Last Name</div>
                                    <div className="px-4 py-2">{user.lastname}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Username</div>
                                    <div className="px-4 py-2">{user.username}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Email.</div>
                                    <div className="px-4 py-2">
                                        <a className="text-blue-800"
                                           href="mailto:jane@example.com">{user.email}</a>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                                    <div className="px-4 py-2">{user.phone}</div>
                                </div>
                            </div>
                        </div>
                        <Link href="/dashboard/customer/profile/edit" className="btn btn-outline btn-primary" >
                            Update Profile
                        </Link>
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