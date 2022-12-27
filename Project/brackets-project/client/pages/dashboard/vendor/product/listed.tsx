
import DashboardLayout from "../../../../components/layouts/DashboradLayout";
import {ReactElement} from "react";
import Head from "next/head";
import {useGetProductsQuery} from "../../../../api/productsApi";
import ProductCard from "../../../../components/ProductCard";
import {Toaster} from "react-hot-toast";

const ListedProducts = () => {
    const {data, isSuccess} = useGetProductsQuery();

    if (isSuccess){
        const products = data.products;
        console.log(products)
        return (
            <div className="card w-full bg-base-100 shadow-xl ">
                <Toaster />
                <div className="card-body w-full m-auto">
                    <h2 className="card-title">Listed Product</h2>
                    <div className="flex flex-wrap gap-10">
                        {products.map((elem, i)=><ProductCard key={i} product={elem} /> )}
                    </div>
                </div>
            </div>
        )
    }
}
ListedProducts.getLayout = (page:ReactElement) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}
ListedProducts.requiredRole = "VENDOR"

export default ListedProducts;