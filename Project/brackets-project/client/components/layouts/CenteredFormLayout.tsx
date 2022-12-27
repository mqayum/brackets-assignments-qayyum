import {LayoutProp} from "../../types/types";
import {FaChevronLeft} from "react-icons/fa"
import Link from "next/link";
const CenteredFormLayout = ({children} : LayoutProp) => {
    return(
        <>
            <div className="navbar bg-base-100 lg:absolute">
                <Link href="/" className="btn btn-ghost normal-case text-xl"><FaChevronLeft/> Home</Link>
            </div>
            {children}
        </>
    )
}
export default CenteredFormLayout