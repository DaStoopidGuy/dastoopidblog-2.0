import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function Navbar() {
    return (
        <nav className="py-3 flex justify-between items-center">
            <Link href={"/"} className="text-xl flex items-center hover:underline">
                <Image src={logo} alt="logo" className="w-auto h-12" />
                DaStoopidGuy
            </Link>
        </nav>
    );
}