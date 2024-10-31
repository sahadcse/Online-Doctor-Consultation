import Image from "next/image";
import Logo from "../images/DaktarBari Transparent BG.png";

const Footer = () => {
    return <footer className="footer bg-[url('../images/footer_bg.jpg')] text-base-content px-4 lg:px-64 py-28 font-dm-sans text-xl">
        <aside>
            <Image src={Logo} alt="Logo" width={100} height={100} />
            <p>
                DAKTARBARI.
                <br />
                Where Care Meets Convenience
            </p>
        </aside>
        <nav>
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
        </nav>
    </footer>
}
export default Footer;