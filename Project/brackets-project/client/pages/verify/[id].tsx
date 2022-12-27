import {useRouter} from "next/router";
import {ReactElement, useState} from "react";
import {useDispatch} from "react-redux"
import CenteredFormLayout from "../../components/layouts/CenteredFormLayout";
import {useVerifyOtpMutation} from "../../api/userApi";
import toast,{Toaster} from "react-hot-toast";
import {setCookie} from "cookies-next";
import {setAuth} from "../../store/authSlice";


const Verify = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [verifyOtp, {error, data, status, isLoading}] = useVerifyOtpMutation()
    const id = router.query.id
    const [otp, setOtp] = useState("");

    const verifyOtpHandler = async () => {
        try {
            if (id){
                const res = await verifyOtp({otp, userId: id}).unwrap();
                console.log(res)
                if (!error){
                    toast.success("Logged In Successfully.");
                    const tokenString = res.token;
                    setCookie("token",tokenString, {
                        maxAge: 3600*24,
                        sameSite: true,
                    })
                    dispatch(setAuth(true))
                    // dispatch(setLoggedInUser(response.data.user))
                    await router.push("/")
                }
            }
        } catch (e) {
            toast.error("Verification Failed");
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
                            <span className="label-text">Please Enter UserId</span>
                        </label>
                        <input type="text" placeholder="Enter UserId Code Here" className="input input-bordered" name="otp" id="otp" value={otp} onChange={(e)=>setOtp(e.target.value)} />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary" onClick={verifyOtpHandler}>Verify</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
Verify.getLayout = (page: ReactElement) => {
    return(
        <CenteredFormLayout>
            {page}
        </CenteredFormLayout>
    )
}
export default Verify;