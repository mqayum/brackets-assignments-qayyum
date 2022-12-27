import ProductCard from "./ProductCard";

const NewProductArrivals = () => {

    return (
        <>
            <h1 className="text-center text-2xl py-10 font-extrabold uppercase">Latest Product Arrivals</h1>
            <div className="flex justify-center flex-wrap gap-10">
                {Array(8).fill("*").map((elem, i)=><ProductCard product={null} key={i} /> )}
            </div>
        </>
    )
}
export default NewProductArrivals