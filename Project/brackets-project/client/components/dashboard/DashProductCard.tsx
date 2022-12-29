import {HiDotsVertical} from "react-icons/hi";
import {FiEdit, FiTrash2} from "react-icons/fi";
import ProductCard from "../ProductCard";
import {IProduct} from "../../types/types";
import Link from "next/link";
import Image from "next/image";
import {BACKEND_URL} from "../../config/constants";
import StarRating from "../StarRating";
import {useDeleteProductMutation} from "../../api/productsApi";
import toast from "react-hot-toast";

const DashProductCard = ({product}:{product:IProduct}) => {
    const [deleteProduct, {error}] = useDeleteProductMutation();

    const deleteHandler = async () => {
        try {
            const res = await deleteProduct(product.productId)
            if (!error)
                toast.success("Product Deleted Successfully.");
        }
        catch (e) {
            // @ts-ignore
            toast.error("Error: "+e.data.message);
            console.log(e)
        }
    }
    return (
            <div className="card w-64 bg-base-100 drop-shadow-xl">
                <Link href="#">
                    <figure className="h-52">
                        <div className="badge absolute top-2 left-2 badge-primary">{product?.productType ?? "Customizable"}</div>
                        <Image src={`${product?.productImages[0] ? BACKEND_URL+"/"+product?.productImages[0] : "https://placeimg.com/400/400/tech"}`}  width={250} height={250} alt="Product Image" />
                    </figure>
                </Link>
                <div className="dropdown dropdown-end absolute absolute right-2 top-2">
                    <label tabIndex={0} className="badge badge-primary">
                        <HiDotsVertical />
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
                        <li><Link href={`/dashboard/vendor/product/edit/${product.productId}`}><FiEdit/> Edit</Link></li>
                        <li><button onClick={deleteHandler}><FiTrash2/> Delete</button></li>
                    </ul>
                </div>

                <div className="card-body">
                    <h6 className="font-bold">
                        <Link href="#" className="hover:text-secondary">{ product?.vendor?.spName }</Link>
                    </h6>
                    <Link href="#" className="text-sm">{product?.productTitle.slice(0,75)+"..."}</Link>
                    <h2 className="card-title flex justify-between">
                        <span>${product?.productPrice}</span>
                        <StarRating rating={ product?.productRating ? product?.productRating : 2.9}/>
                    </h2>
                    <div className="card-actions justify-center">
                        <div className="badge badge-outline">{product?.productCategory }</div>
                    </div>

                </div>
            </div>
    )
}
export default DashProductCard