import {FaStar} from "react-icons/fa"
const StarRating = ({rating}:{rating:number}) => {

    const stars = (rating - Math.trunc(rating)) >= 0.5 ? Math.ceil(rating) : Math.floor(rating)

    return(
        <div className="rating rating-sm">
            {Array(5).fill("*").map((elem, index)=>{
                return (index+1) <= stars ?
                    <FaStar key={index} className="fill-orange-400" /> :
                    <FaStar key={index} className="fill-orange-200" />
            })}
        </div>
    )
}
export default StarRating