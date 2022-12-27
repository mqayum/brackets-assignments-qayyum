import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BACKEND_URL} from "../config/constants";
import {getCookie, hasCookie} from "cookies-next";
import {IDesignerObj, IUserObj, IVendorObj, TGetDesigner, TGetVendor, TMessage} from "../types/types";

export const spApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_URL,
        prepareHeaders: headers => {
            return new Headers({
                "Authorization": "Bearer " + getCookie("token")
            })
        }
    }),
    reducerPath: "spApi",
    tagTypes: ["vendor","designer"],

    refetchOnFocus: true,
    // refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,

    endpoints: (builder) => ({
        getVendor: builder.query<TGetVendor, void>({
            query: () => "/sp/vendor/profile",
            providesTags: ["vendor"],
        }),
        updateVendor: builder.mutation<TMessage, { data:IVendorObj, spId:string|undefined }>({
            query: ({data, spId}: { data:IVendorObj, spId:string|undefined }) => ({
                url: `/sp/vendor/update/${spId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["vendor"]
        }),
        updateLogo: builder.mutation<TMessage, {formData: FormData, spId:string|undefined}>({
            query: ({formData,spId}: { formData: FormData, spId: string|undefined }) => ({
                url: `/sp/vendor/update/${spId}/logo`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["vendor"]
        }),
        getDesigner: builder.query<TGetDesigner, void>({
            query: () => "/sp/designer/profile",
            providesTags: ["designer"],
        }),
        updateDesigner: builder.mutation<TMessage, { data:IDesignerObj, spId:string|undefined }>({
            query: ({data, spId}: { data:IDesignerObj, spId:string|undefined }) => ({
                url: `/sp/designer/update/${spId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["designer"]
        }),
        updateDesLogo: builder.mutation<TMessage, {formData: FormData, spId:string|undefined}>({
            query: ({formData,spId}: { formData: FormData, spId: string|undefined }) => ({
                url: `/sp/designer/update/${spId}/logo`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["designer"]
        }),
    })
})
export const {
    useGetVendorQuery,
    useUpdateVendorMutation,
    useUpdateLogoMutation,
    useGetDesignerQuery,
    useUpdateDesignerMutation,
    useUpdateDesLogoMutation,
} = spApi