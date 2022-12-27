import Link from "next/link"
import Image from "next/image"
import StarRating from "./StarRating";

const DesignerCard = () => {
    return (
        <div className="card sm:w-32 lg:w-44 bg-ghost">
            <Link href="#">
                <figure className="px-5 hover:-translate-y-1.5 hover:drop-shadow-2xl transition">
                    <Image src="https://placeimg.com/300/300/people" width={300} height={300} alt="Shoes" className="rounded-full"/>
                </figure>
            </Link>
            <div className="flex justify-center items-center text-center flex-col mt-3">
                <Link href="#"><h2 className="card-title">SuperGrapix</h2></Link>
                <StarRating rating={3.6}/>
            </div>
        </div>
    )
}
export default DesignerCard