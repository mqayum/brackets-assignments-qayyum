import axios from "axios";
import {useRouter} from "next/router";
import {useState} from "react";

const Login = () => {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();

    const submitLoginForm = () => {
        axios.post('http://localhost:9999/user/login', {
            username: username,
            password: password
        })
            .then(function (response) {
                console.log(response)
                if (response.status === 200){
                    router.push("/")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="w-full max-w-xs m-auto mt-24 mb-28">
            <form className="bg-white border shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} type="text" placeholder="Username" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button" onClick={submitLoginForm}>
                        Sign In
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                       href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
        </div>
    )
}
export default Login;