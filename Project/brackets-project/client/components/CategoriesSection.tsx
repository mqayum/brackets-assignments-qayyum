import CategoryCard from "./CategoryCard";

const CategoriesSection = ({type}:{type:string}) => {

    return (
        <>
            <h1 className="text-center text-2xl py-10 font-extrabold uppercase">{`Top ${type && type.toUpperCase() || ""} Categories`}</h1>
            <div className="flex justify-center flex-wrap gap-10">
                {Array(6).fill("*").map((elem, i)=><CategoryCard key={i} /> )}
            </div>
        </>
    )
}
export default CategoriesSection