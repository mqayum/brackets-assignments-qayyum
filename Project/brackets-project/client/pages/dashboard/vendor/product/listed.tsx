
import DashboardLayout from "../../../../components/layouts/DashboradLayout";
import {ReactElement} from "react";
import {useGetProductsQuery} from "../../../../api/productsApi";
import ProductCard from "../../../../components/ProductCard";
import {Toaster} from "react-hot-toast";
import {HiDotsVertical} from "react-icons/hi"
import {FiEdit, FiTrash2} from "react-icons/fi"
import DashProductCard from "../../../../components/dashboard/DashProductCard";

const ListedProducts = () => {
    const {data, isSuccess} = useGetProductsQuery();

    if (isSuccess){
        const products = data.products;
        return (
            <div className="card w-full bg-base-100">
                <Toaster />
                <div className="card-body w-full m-auto">
                    <h2 className="card-title ">Listed Product</h2>
                    <div className="flex justify-center flex-wrap mt-5 gap-10">
                        {
                            products.map((elem, i)=><DashProductCard product={elem} key={i} />)
                        }
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