import axios from "axios";
import {useRouter} from "next/router";
import {useState} from "react";

const Signup = () => {

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();

    const submitSignupForm = () => {
        axios.post('http://localhost:9999/user/signup', {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password
        })
            .then(function (response) {
                console.log(response)
                if (response.status === 200){
                    router.push("/login")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <form className="w-full max-w-lg border shadow-md rounded px-8 pt-6 pb-8 mb-12 m-auto mt-12">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="grid-first-name">
                        First Name
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} type="text" placeholder="First Name" />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="grid-last-name">
                        Last Name
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} type="text" placeholder="Last Name" />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="grid-username">
                        Username
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-username" value={username} onChange={(e)=>{setUsername(e.target.value)}} type="text" placeholder="Username" />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="grid-email">
                        Email
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-email" value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email" />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="grid-password">
                        Password
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-password" value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="******************" />
                </div>
            </div>
            <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button" onClick={submitSignupForm}>
                Sign Up
            </button>
        </form>
    )
}
export default Signup;