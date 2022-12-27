
import DesignerCard from "./DesignerCard";

const DesignersSection = () => {

    return (
        <>
            <h1 className="text-center text-2xl py-10 font-extrabold uppercase">Top Rated Designers</h1>
            <div className="flex justify-center flex-wrap gap-10">
                {Array(6).fill("*").map((elem, i)=><DesignerCard key={i} /> )}
            </div>
        </>
    )
}
export default DesignersSection