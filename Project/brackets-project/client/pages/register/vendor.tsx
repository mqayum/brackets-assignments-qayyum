import {ReactElement, useState} from "react";
import CenteredFormLayout from "../../components/layouts/CenteredFormLayout";
import {useRouter} from "next/router";
import toast, {Toaster} from "react-hot-toast";
import {isVendor} from "../../helpers/authorization.helper";
import {useGetUserQuery, useRegisterVendorMutation} from "../../api/userApi";

const RegisterVendor = () => {
    const {data:userData} = useGetUserQuery();
    const [registerVendor, {error}] = useRegisterVendorMutation();
    const router = useRouter();

    if (userData && isVendor(userData.user))
        router.push("/dashboard/vendor");

    const [state, setState] = useState({
        spName: "",
        businessPhone: "",
        businessAddress: "",
    });
    const handleChange = (event: { target: { name: string; value: string; }; }) => {
        const name = event.target.name;
        const value = event.target.value;
        setState({ ...state, [name]: value });
    };
    const handleSubmit = async () => {
        try {
            const res = await registerVendor(state).unwrap();
            if (userData && !error){
                toast.success('Vendor Registered Successfully!');
                router.push("/")
            }
        }
        catch (e) {
            // @ts-ignore
            toast.error("Error: "+e.data.message);
            console.log(e)
        }
    }
    return(
        <div className="hero min-h-screen bg-base-200">
            <Toaster/>
            <div className="hero-content flex-col lg:flex-row-reverse lg:gap-12">
                <div className="text-center lg:text-left lg:w-1/3">
                    <h1 className="text-5xl font-bold">Register Yourself<br />As Vendor, Now!</h1>
                    <p className="py-6">If your are also into the printing business, then fill the registration form, and Start providing your services as a printing vendor on this platform.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Brand Name</span>
                            </label>
                            <input type="text" placeholder="Company/Brand Name" className="input input-bordered" name="spName" value={state.spName} onChange={handleChange} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Contact No</span>
                            </label>
                            <input type="text" placeholder="Business Contact No" className="input input-bordered" name="businessPhone" value={state.businessPhone} onChange={handleChange} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <textarea className="textarea textarea-bordered" placeholder="Complete Business Address" name="businessAddress" value={state.businessAddress} onChange={handleChange}></textarea>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary" onClick={handleSubmit}>Register Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

RegisterVendor.getLayout = (page: ReactElement) => {
    return (
        <CenteredFormLayout>
            {page}
        </CenteredFormLayout>
    )
}
export default RegisterVendor