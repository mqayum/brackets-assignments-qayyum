import  "../styles/navbar.module.css"
import {FaBars, FaChevronRight} from "react-icons/fa"
import {FaPencilRuler, FaShoppingCart, FaSearch} from "react-icons/fa"
import Link from "next/link";
const Navbar = () => {

    return (
        <>
            <div className="navbar bg-base-100 mb-2 lg:hidden">
                <div className="form-control bg-base-100 w-full rounded-box">
                    <input type="text" placeholder="Search Products or Designs" className="input input-bordered rounded-full w-full" />
                </div>
            </div>
            <div className="navbar bg-base-100 border-b pb-5 mb-3">
                <div className="navbar-start">
                    <div className="dropdown dropdown-hover">
                        <ul className="menu menu-horizontal bg-base-100 lg:w-52">
                            <li tabIndex={0} className="w-full"><a className="bg-base-200 w-full font-bold"><FaBars /> Categories</a></li>
                        </ul>
                        <ul tabIndex={0} className="menu drop-shadow-lg menu-compact dropdown-content shadow bg-base-100 w-52">
                            <li tabIndex={0}>
                                <Link href="#" className="justify-between">Product Categories <FaChevronRight/> </Link>
                                <ul className="menu menu-compact dropdown-content shadow bg-base-200 rounded-box w-52">
                                    <li><Link href="#">Submenu 1</Link></li>
                                    <li><Link href="#">Submenu 2</Link></li>
                                </ul>
                            </li>
                            <li tabIndex={0}>
                                <Link href="#" className="justify-between">Design Categories <FaChevronRight/> </Link>
                                <ul className="menu menu-compact dropdown-content shadow bg-base-200 rounded-box w-52">
                                    <li><Link href="#">Submenu 1</Link></li>
                                    <li><Link href="#">Submenu 2</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center w-[32rem] hidden lg:flex">
                    {/*<div className="form-control flex w-full">*/}
                    {/*    <input type="text" placeholder="Search Products or Designs" className="input input-bordered rounded-full" />*/}
                    {/*</div>*/}
                    <div className="relative w-full">
                        <input type="text" placeholder="Search Products or Designs" className="input input-bordered rounded-full w-full pr-16" />
                        <button className="btn btn-ghost absolute top-0 right-0 rounded-full "><FaSearch/></button>
                    </div>
                </div>
                <div className="navbar-end">
                    <Link href="#" className="btn btn-outline lg:btn-ghost hover:btn-primary gap-3 text-sm lg:w-32">
                        <FaPencilRuler/> <span className="hidden lg:flex">Creator</span>
                    </Link>
                    <Link href="#" className="btn btn-outline lg:btn-ghost hover:btn-primary gap-3 text-sm lg:w-32 ml-3">
                        <FaShoppingCart/> <span className="hidden lg:flex">Cart</span>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default Navbar;