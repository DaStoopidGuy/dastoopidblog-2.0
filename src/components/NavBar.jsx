import Image from "next/image";
import Link from "next/link";
import EmailLink from "./EmailLink";
import image from "@/public/images/seb_logo1.png"

export default function Navbar() {
    return (
        <nav className="py-3 flex justify-between items-center">
            <Link href={"/"} className="text-xl flex items-center hover:underline">
                <Image src={image} alt="logo" className="w-auto h-12 pixel-img" />
                DaStoopidGuy
            </Link>
            <EmailLink />
        </nav>
    );
}