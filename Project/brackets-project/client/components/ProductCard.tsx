import Link from "next/link";
import Image from "next/image";
import StarRating from "./StarRating";
import {IProduct} from "../types/types";
import {BACKEND_URL} from "../config/constants";
const ProductCard = ({product}:{product:IProduct|null}) => {
    const productName = "If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose?"
    return (
            <div className="card w-64 bg-base-100 drop-shadow-xl hover:drop-shadow-2xl transition">
            <Link href="#">
                <figure className="h-52">
                    <div className="badge absolute top-2 left-2 badge-primary">{product?.productType ?? "Customizable"}</div>
                    <Image src={`${product?.productImages[0] ? BACKEND_URL+"/"+product?.productImages[0] : "https://placeimg.com/400/400/tech"}`}  width={250} height={250} alt="Product Image" />
                </figure>
            </Link>

            <div className="card-body">
                <h6 className="font-bold">
                    <Link href="#" className="hover:text-secondary">{product?.vendor?.spName ? product?.vendor?.spName : "VistaPrints"}</Link>
                </h6>
                <Link href="#" className="text-sm">{product?.productTitle ? product?.productTitle : productName.slice(0,75)+"..."}</Link>
                <h2 className="card-title flex justify-between">
                    <span>${product?.productPrice ? product?.productPrice : "980" }</span>
                    <StarRating rating={ product?.productRating ? product?.productRating : 2.9}/>
                </h2>
                <div className="card-actions justify-center">
                    <div className="badge badge-outline">{product?.productCategory ? product?.productCategory : "Fashion" }</div>
                </div>

            </div>
        </div>
    )
}
export default ProductCard