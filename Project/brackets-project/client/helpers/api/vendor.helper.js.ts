import axios from "axios";
import {BACKEND_URL} from "../../config/constants";

export const getVendorProfile = async(cookie:string) => {
    try {
        return await axios.get(`${BACKEND_URL}/vendor/profile`, {
            headers: {
                'Authorization': 'Bearer ' + cookie
            }
        })
    }
    catch (e) {
        throw e;
    }
}