import axios from "axios";
import {BACKEND_URL} from "../../config/constants";
import {getCookie} from "cookies-next";
import {IDesignerObj, IVendorObj} from "../../types/types";

type UserCredentials = { username: string, password: string }

export const getLoggedInUser = async(cookie:string|null|undefined) => {
    try {
        if (cookie){
            return await axios.get(`${BACKEND_URL}/user/me`, {
                headers: {
                    'Authorization': 'Bearer ' + cookie
                }
            })
        }
        return null;

    }
    catch (e) {
        throw e;
    }
}
export const logoutRequest = async() => {
    try {
        return axios.get(`${BACKEND_URL}/user/logout`,{
            headers: {
                'Authorization': 'Bearer ' + getCookie("token")
            }
        })
    }
    catch (e) {
        throw e;
    }
}
export const loginRequest = async (state:UserCredentials) => {
    try {
        return axios.post(`${BACKEND_URL}/user/login`, state,{
            headers: {
                'Authorization': 'Bearer ' + getCookie("token")
            }
        })
    }
    catch (e) {
        throw e;
    }
}
export const registerDesigner = async (state: IDesignerObj ) => {
    try{
        return await axios.post(`${BACKEND_URL}/sp/designer/register`, state, {
            headers: {
                'Authorization': 'Bearer ' + getCookie("token")
            }
        })
    }
    catch (e) {
        throw e;
    }
}
export const registerVendor = async (state: IVendorObj ) => {
    try{
        return await axios.post(`${BACKEND_URL}/sp/vendor/register`, state, {
            headers: {
                'Authorization': 'Bearer ' + getCookie("token")
            }
        })
    }
    catch (e) {
        throw e;
    }
}