import {IUserObj} from "../types/types";

export const isAdmin = (user:IUserObj) => {
    return user.roles?.includes("ADMIN");
}
export const isVendor = (user:IUserObj) => {
    return user.roles?.includes("VENDOR");
}
export const isDesigner = (user:IUserObj) => {
    return user.roles?.includes("DESIGNER");
}
