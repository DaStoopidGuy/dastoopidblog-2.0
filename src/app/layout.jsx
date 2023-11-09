import "@/styles/global.css"
import Navbar from "../components/NavBar";
import { Pixelify_Sans } from 'next/font/google'
import GithubLink from "../components/GithubLink";
import { IoMail } from "react-icons/io5";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400"],
})

export const metadata = {
  title: 'DaStoopidGuy\'s Blog',
  description: 'The personal website of DaStoopidGuy',
  // icons: '/images/seb_logo2.png'
}

export default function RootLayout({ children }) {

  const header = (
    <Navbar />
  );

  const footer = (
    <footer className="flex flex-col  font-thin text-sm">
      <div className="flex items-center justify-center">
        More stuffs on Github:&nbsp;
        <GithubLink />
      </div>
      <div className="flex items-center justify-center">
        &emsp; <IoMail /> &nbsp; dastoopidguy@protonmail.com
      </div>
    </footer>
  );

  return (
    < html lang="en" >
      <body className={pixelify.className + " text-primary bg-background"}>
        <div className="container mx-auto max-w-3xl px-2 min-h-screen break-words overflow-hidden pb-5">
          {header}
          {children}
          {footer}
        </div>
      </body>
    </html >
  )
}
