import { Upload } from 'antd';


import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { IProduct } from "../interfaces/product"
const productApi = createApi({
    reducerPath: "products",
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL


}),
    endpoints :(builder) =>({
        getProducts: builder.query<IProduct[], void>({
            query: () => "/products",
            providesTags: ["Product"]
        }) ,
        getProductById: builder.query<IProduct, number | string>({
            query: (id) => `/products/${id}`,
            providesTags: ['Product']
        }),
        removeProduct: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Product']
        }),
        addProduct : builder.mutation<IProduct , IProduct>({
            query : (product) =>({
                url : `/products` , 
                method: "POST" , 
                body: product
            })
        }) ,
        uploadFile : builder.mutation<FormData , FormData>({
            query : (formData) =>({
                url : `https://api-eu.cloudinary.com/v1_1/dcapa78kv/image/upload` , 
                method: "POST" , 
                body: formData
            })
        }) ,
        updateProduct : builder.mutation<IProduct , IProduct>({
            query : (product) =>({
                url : `/products/${product.id}` , 
                method: "PATCH" , 
                body: product
            }) ,
            invalidatesTags: ['Product']

        }) 
        

    })


});

export const {useGetProductsQuery , useRemoveProductMutation , useGetProductByIdQuery , useAddProductMutation , useUploadFileMutation , useUpdateProductMutation} = productApi;
export const productReducer = productApi.reducer;

export default productApi