import DesignCard from "./DesignCard";

const NewDesignsSection = () => {
    return (
        <>
            <h1 className="text-center text-2xl py-10 font-extrabold uppercase">Latest Product Arrivals</h1>
            <div className="flex justify-center flex-wrap gap-10">
                {Array(8).fill("*").map((elem, i)=><DesignCard key={i} /> )}
            </div>
        </>
    )
}
export default NewDesignsSection