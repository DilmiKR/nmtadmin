import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "Product",
    "Product",
    "Customers",
    "Categories",
    "Suppliers",
    "Sales",
    "Orders",
    "stock",
    "Payment",
    "Customer Care",
  ],
  endpoints: (build) => ({
    getProduct: build.query({
      query: (id) => `general/Product/${id}`,
      providesTags: ["Product"],
    }),
    getProducts: build.query({
      query: () => "details/products",
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductsQuery,
} = api;
