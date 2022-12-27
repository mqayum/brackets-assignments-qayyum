import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";
import {AppProps} from "next/app";

// type for NextJS page component with layout
export type NextPageWithLayout = NextPage & {
    // children: ReactElement
    getLayout?: (page: ReactElement) => ReactNode;
    requiredRole?:string
}
// type for app props with layout-based components
export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
// type for props passed to Layout component
export type LayoutProp = {
    children: ReactElement
}

export interface IUserObj {

    firstname: string,
    lastname: string,
    email: string,
    username: string,
    phone: string;
    id?: string,
    roles?: [string],
    twoFactorAuth?: boolean,
    profileImage?: string
};
export type TUploadImage = File|null|undefined

export interface SignUpForm {
    firstName: string,
    lastName: string,
    username: string,
    phone: string,
    email: string,
    password: string,
}
// typescript interface for Auth state in redux store
export interface TAuthState {
    isAuthenticated: boolean
}
export type TMessage = {
    message: string
}
export type TLoginResponse = TMessage & {
    token: string,
    user?: IUserObj,
    userId?: string //in case of 2FA enabled
}
export type TLoginCredential = {
    username: string,
    password:string
}
export type TGetUser = TMessage & {
    user: IUserObj;
}


export interface IDesignerObj {
    spName:string,
    jobTitle:string,
    skills:string[],
    bio:string,
    brandLogo?: string,
    id?: string,
}
export interface IVendorObj {
    spName: string,
    businessPhone: string,
    businessAddress: string,
    brandLogo?: string,
    id?: string,
}
export type TGetVendor = TMessage & {
    sp: IVendorObj;
}
export type TGetDesigner = TMessage & {
    sp: IDesignerObj;
}
export interface IProduct{
    productTitle: string,
    productCategory: string,
    productType: string,
    productPrice: string,
    productDesc: string,
    productImages: string[],
}
export type TGetProducts = TMessage & {
    products: IProduct[];
}