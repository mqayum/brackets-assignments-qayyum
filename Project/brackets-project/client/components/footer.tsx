import Link from "next/link";

const Footer = () => {
    return (
        <div className="w-full flex justify-center flex-col items-center h-[80px] border-2">
            <ul className="w-full flex justify-around items-center mb-3">
                <li><Link href="#">Link1</Link></li>
                <li><Link href="#">Link1</Link></li>
                <li><Link href="#">Link1</Link></li>
                <li><Link href="#">Link1</Link></li>
            </ul>
            <div className="text-center">
                &copy;Copyrights Reserved (2022)
            </div>
        </div>
    )
}
export default Footer;