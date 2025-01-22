import Image from "next/image";
import Logo from "../images/Logo (2).png";

const Footer = () => {
    const sections = [
        {
            title: "Medical Services",
            links: [
                { name: "Primary Care", href: "#" },
                { name: "Specialty Clinics", href: "#" },
                { name: "Emergency Care", href: "#" },
                { name: "Surgical Services", href: "#" },
                { name: "Diagnostic Imaging", href: "#" },
            ],
        },
        {
            title: "Patient Resources",
            links: [
                { name: "Patient Portal", href: "#" },
                { name: "Billing & Insurance", href: "#" },
                { name: "Health Education", href: "#" },
                { name: "FAQs", href: "#" },
            ],
        },
        {
            title: "About Us",
            links: [
                { name: "Our Mission", href: "#" },
                { name: "Meet Our Team", href: "#" },
                { name: "News & Events", href: "#" },
                { name: "Careers", href: "#" },
            ],
        },
        {
            title: "Contact Information",
            content: (
                <>
                    <p className="mt-2">123 Medical Way, Suite 100</p>
                    <p>City, State, ZIP Code</p>
                    <p className="mt-4">
                        Phone:{" "}
                        <a href="tel:+1234567890" className="link link-hover">
                            01678392594
                        </a>
                    </p>
                    <p>
                        Email:{" "}
                        <a href="mailto:info@medicalsite.com" className="link link-hover">
                            info@medicalsite.com
                        </a>
                    </p>
                </>
            ),
        },
    ];

    return (
        <footer className=" bg-[url('../images/footer_bg.jpg')]">
            <div className="footer bg-[url('../images/footer_bg.jpg')] text-base-content px-4 lg:px-64 py-28 font-dm-sans text-xl">
                <aside>
                    <Image src={Logo} alt="Logo" width={100} height={100} />
                    <p>Providing compassionate care and expert medical services for every stage of life.</p>

                </aside>
                {sections.map((section, index) => (
                    <nav key={index}>
                        <h6 className="footer-title">{section.title}</h6>
                        {section.links ? (
                            section.links.map((link, idx) => (
                                <a key={idx} href={link.href} className="link link-hover">
                                    {link.name}
                                </a>
                            ))
                        ) : (
                            section.content
                        )}
                    </nav>
                ))}

            </div>

            <p className="py-4 text-center">
                © {new Date().getFullYear()} Daktar Bari. All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;
