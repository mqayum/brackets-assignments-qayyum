import {useRouter} from "next/router";
import {ReactElement, useState} from "react";
import {useDispatch} from "react-redux"
import CenteredFormLayout from "../components/layouts/CenteredFormLayout";
import {useGetUserQuery, useLoginMutation} from "../api/userApi";
import toast,{Toaster} from "react-hot-toast";
import {setCookie} from "cookies-next";
import {setAuth} from "../store/authSlice";


const Login = () => {
    const [login, {error, data, status, isLoading}] = useLoginMutation()

    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const router = useRouter();
    const dispatch = useDispatch();

    const handleChange = (event: { target: { name: string; value: string; }; }) => {
        const name = event.target.name;
        const value = event.target.value;
        setState({ ...state, [name]: value });
    };
    const submitLoginForm = async () => {
        try {
            const res = await login(state).unwrap();
            if (!error){
                console.log(res)
                if (res.userId){
                    toast("OTP Verification Required");
                    await router.push("/verify/"+res.userId)
                }
                else{
                    toast.success("Logged In Successfully.");
                    const tokenString = res.token;
                    setCookie("token",tokenString, {
                        maxAge: 3600*24,
                        sameSite: true,
                    })
                    dispatch(setAuth(true))
                    // dispatch(setLoggedInUser(response.data.user))
                    router.push("/")
                }
            }
        }
        catch (e) {
            toast.error("Something is Wrong");
            console.log(e)
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <Toaster />
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Username</span>
                    </label>
                    <input type="text" placeholder="username" className="input input-bordered" name="username" id="username" value={state.username} onChange={handleChange} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" className="input input-bordered" name="password" id="password" value={state.password} onChange={handleChange} />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary" onClick={submitLoginForm}>Login</button>
                </div>
            </div>
        </div>
    </div>
    )
}
Login.getLayout = (page: ReactElement) => {
    return(
        <CenteredFormLayout>
            {page}
        </CenteredFormLayout>
    )
}
export default Login;