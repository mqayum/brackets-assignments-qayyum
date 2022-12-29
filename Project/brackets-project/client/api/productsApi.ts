import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BACKEND_URL} from "../config/constants";
import {getCookie, hasCookie} from "cookies-next";
import {ID, TGetProduct, TGetProducts, TMessage} from "../types/types";

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
    tagTypes: ["products", "product"],

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
        getProduct: builder.query<TGetProduct, ID>({
            query: (productId:ID) => `/sp/vendor/product/${productId}`,
            providesTags: ["product"]
        }),
        editProduct: builder.mutation<TMessage, {productId: ID, formData: FormData}>({
            query: ({productId,formData}:{productId: ID, formData: FormData}) => ({
                url: `/sp/vendor/product/${productId}/edit`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["product"]
        }),
        deleteProduct: builder.mutation<TMessage, ID>({
            query: (productId:ID) => ({
                url: `/sp/vendor/product/${productId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["products"]
        }),
    })
})
export const {
    useAddProductMutation,
    useGetProductsQuery,
    useGetProductQuery,
    useEditProductMutation,
    useDeleteProductMutation
} = productsApi