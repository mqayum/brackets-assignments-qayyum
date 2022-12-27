import Link from "next/link";

const Footer = () => {
    return (
        <>
        <footer className="footer p-10 mt-10 bg-base-200 text-base-content">
            <div>
                <span className="footer-title">Services</span>
                <Link href="#" className="link link-hover">Products</Link>
                <Link href="#" className="link link-hover">Design</Link>
                <Link href="#" className="link link-hover">Design Maker</Link>
                <Link href="#" className="link link-hover">Designers</Link>
            </div>
            <div>
                <span className="footer-title">Company</span>
                <Link href="#" className="link link-hover">About us</Link>
                <Link href="#" className="link link-hover">Contact</Link>
                <Link href="#" className="link link-hover">Projects</Link>
                <Link href="#" className="link link-hover">News</Link>
            </div>
            <div>
                <span className="footer-title">Legal</span>
                <Link href="#" className="link link-hover">Terms of use</Link>
                <Link href="#" className="link link-hover">Privacy policy</Link>
                <Link href="#" className="link link-hover">Cookie policy</Link>
            </div>
            <div>
                <span className="footer-title">Newsletter</span>
                <div className="form-control w-80">
                    <label className="label">
                        <span className="label-text">Enter your email address</span>
                    </label>
                    <div className="relative ">
                        <input type="text" placeholder="username@site.com" className="input input-bordered rounded-full w-full pr-16" />
                        <button className="btn btn-primary absolute top-0 right-0 rounded-full rounded-l-none">Subscribe</button>
                    </div>
                </div>
            </div>
        </footer>
        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
            <div>
                <p>Copyright © 2022 - All right reserved by DIM</p>
            </div>
        </footer>
    </>
    )
}
export default Footer;