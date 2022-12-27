import Link from "next/link";
import Image from "next/image";
import StarRating from "./StarRating";
import {IProduct} from "../types/types";
import {BACKEND_URL} from "../config/constants";
const ProductCard = ({product}:{product:IProduct|null}) => {
    const productName = "If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose?"
    return (
            <div className="card w-64 bg-base-100 drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl transition">
            <Link href="#">
                <figure>
                    <div className="badge absolute top-2 left-2 badge-primary">{product?.productType ?? "Customizable"}</div>
                    <Image src={`${BACKEND_URL}/${product?.productImages[0] ?? "https://placeimg.com/400/300/tech"}`}  width={300} height={350} alt="Product Image" />
                </figure>
            </Link>

            <div className="card-body">
                <h6 className="font-bold">
                    <Link href="#" className="hover:text-secondary">VistaPrints</Link>
                </h6>
                <Link href="#" className="text-sm">{`${productName.slice(0,75)}...`}</Link>
                <h2 className="card-title flex justify-between">
                    <span>$980</span> <StarRating rating={2.9}/>
                </h2>
                <div className="card-actions justify-center">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                </div>

            </div>
        </div>
    )
}
export default ProductCard