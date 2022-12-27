import Link from "next/link"
import Image from "next/image"
const CategoryCard = () => {
    return (
        <div className="card sm:w-32 lg:w-44 bg-ghost">
            <Link href="#">
                <figure className="px-5 hover:-translate-y-1.5 hover:drop-shadow-2xl  transition">
                    <Image src="https://placeimg.com/300/300/arch" width={300} height={300} alt="Shoes" className="rounded-xl" />
                </figure>
            </Link>
            <div className="flex justify-center items-center text-center mt-3">
                <Link href="#"><h2 className="card-title">Shoes!</h2></Link>
            </div>
        </div>
    )
}
export default CategoryCard