import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BACKEND_URL} from "../config/constants";
import {getCookie, hasCookie} from "cookies-next";
import {TGetProducts, TMessage} from "../types/types";

export const productsApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BACKEND_URL,
        prepareHeaders: headers => {
            return new Headers({
                "Authorization": "Bearer " + getCookie("token")
            })
        }
    }),
    reducerPath: "productsApi",
    tagTypes: ["products"],

    refetchOnFocus: true,
    // refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,

    endpoints: (builder) => ({
        addProduct: builder.mutation<TMessage, FormData>({
            query: (formData: FormData) => ({
                url: `/sp/vendor/product`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["products"]
        }),
        getProducts: builder.query<TGetProducts, void>({
            query: () => `/sp/vendor/product/listed`,
            providesTags: ["products"]
        }),
    })
})
export const {
    useAddProductMutation,
    useGetProductsQuery,
} = productsApi