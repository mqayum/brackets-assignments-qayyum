import ProductCard from "./ProductCard";
import {useGetProductsQuery} from "../api/productsApi";

const NewProductArrivals = () => {
    const {data, isSuccess} = useGetProductsQuery();

    if (isSuccess) {
        const products = data.products;
        return (
            <>
                <h1 className="text-center text-2xl py-10 font-extrabold uppercase">Latest Product Arrivals</h1>
                <div className="flex justify-center flex-wrap gap-10">
                    {products.map((elem, i) => <ProductCard product={elem} key={i}/>)}
                </div>
            </>
        )
    }
}
export default NewProductArrivals