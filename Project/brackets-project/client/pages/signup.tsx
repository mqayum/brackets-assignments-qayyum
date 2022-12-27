import axios from "axios";
import {useRouter} from "next/router";
import {ReactElement, useState} from "react";
import {BACKEND_URL} from "../config/constants";
import CenteredFormLayout from "../components/layouts/CenteredFormLayout";
import {useSignUpMutation} from "../api/userApi";
import toast, {Toaster} from "react-hot-toast";
import {setCookie} from "cookies-next";
import {setAuth} from "../store/authSlice";

const Signup = () => {
    const [signup, {data, error, status}] = useSignUpMutation();
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        username: "",
        phone: "",
        email: "",
        password: "",
    });
    const router = useRouter();

    const handleChange = (event: { target: { name: string; value: string; }; }) => {
        const name = event.target.name;
        const value = event.target.value;
        setState({ ...state, [name]: value });
    };
    const submitSignupForm = async () => {
        try {
            const res = await signup(state).unwrap();
            if (!error){
                toast.success("Registration Successful.");
                router.push("/login")
            }
        }
        catch (e) {
            // @ts-ignore
            toast.error("Error: "+e.data.message);
            console.log(e)
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <Toaster />
            <div className="card flex-shrink-0 w-full max-w-sm lg:max-w-lg shadow-2xl bg-base-100">
                <div className="card-body">
                    <div className="lg:flex lg:justify-between">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input type="text" placeholder="first name" className="input input-bordered" name="firstName" id="firstName" value={state.firstName} onChange={handleChange} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input type="text" placeholder="last name" className="input input-bordered" name="lastName" id="lastName" value={state.lastName} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="lg:flex lg:justify-between">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input type="text" placeholder="user name" className="input input-bordered" name="username" id="username" value={state.username} onChange={handleChange} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input type="text" placeholder="phone" className="input input-bordered" name="phone" id="phone" value={state.phone} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" placeholder="email address" className="input input-bordered" name="email" id="email" value={state.email} onChange={handleChange} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" name="password" id="password" value={state.password} onChange={handleChange} />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary" onClick={submitSignupForm}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
Signup.getLayout = (page: ReactElement) => {
    return(
        <CenteredFormLayout>
            {page}
        </CenteredFormLayout>
    )
}
export default Signup;