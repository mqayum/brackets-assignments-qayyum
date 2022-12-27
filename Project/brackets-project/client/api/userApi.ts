import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BACKEND_URL} from "../config/constants";
import {
    IDesignerObj,
    IUserObj,
    IVendorObj,
    SignUpForm,
    TGetUser,
    TLoginCredential,
    TLoginResponse,
    TMessage, TUploadImage
} from "../types/types";
import {getCookie, hasCookie} from "cookies-next";

export const userApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_URL,
        prepareHeaders: headers => {
            return new Headers({
                "Authorization": "Bearer " + getCookie("token")
            })
        }
    }),
    reducerPath: "userApi",
    tagTypes: ["authUser"],

    refetchOnFocus: true,
    // refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,

    endpoints: (builder) => ({
        login: builder.mutation<TLoginResponse, TLoginCredential>({
           query: (credentials:{username:string, password:string}) => ({
               url: "/user/login",
               method: "POST",
               body: credentials,
           }),
            invalidatesTags: ["authUser"]
        }),
        logout: builder.mutation<void, void>({
            query: () => "/user/logout"
        }),
        getUser: builder.query<TGetUser, void>({
            query: () => "/user/me",
            providesTags: ["authUser"],
        }),
        verifyOtp: builder.mutation<TLoginResponse, {otp: string, userId:string|string[]}>({
            query: ({otp,userId}: { otp: string, userId: string|string[] }) => ({
                url: "/user/verifyOTP/"+userId,
                method: "POST",
                body: {otp},
            }),
            invalidatesTags: ["authUser"]
        }),
        signUp: builder.mutation<TMessage, SignUpForm>({
            query: (data:SignUpForm) => ({
                url: "/user/signup",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["authUser"]
        }),
        registerVendor: builder.mutation<TMessage, IVendorObj>({
            query: (data:IVendorObj) => ({
                url: "/sp/vendor/register",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["authUser"]
        }),
        registerDesigner: builder.mutation<TMessage, IDesignerObj>({
            query: (data:IDesignerObj) => ({
                url: "/sp/designer/register",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["authUser"]
        }),
        updateProfile: builder.mutation<TMessage, {data: IUserObj, userId:string|undefined}>({
            query: ({data,userId}: { data: IUserObj, userId: string|undefined }) => ({
                url: "/user/"+userId,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["authUser"]
        }),
        updateProfileImage: builder.mutation<TMessage, {formData: FormData, userId:string|undefined}>({
            query: ({formData,userId}: { formData: FormData, userId: string|undefined }) => ({
                url: `/user/${userId}/upload`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["authUser"]
        }),
        toggle2fa: builder.mutation<TMessage, void>({
            query: () => ({
                url: "/user/toggle-2fa",
                method: "POST",
            }),
            invalidatesTags: ["authUser"]
        }),
    })
})
export const {
    useGetUserQuery,
    useLoginMutation,
    useLogoutMutation,
    useVerifyOtpMutation,
    useSignUpMutation,
    useRegisterVendorMutation,
    useRegisterDesignerMutation,
    useUpdateProfileMutation,
    useUpdateProfileImageMutation,
    useToggle2faMutation,
} = userApi