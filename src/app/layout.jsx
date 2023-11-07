import "@/styles/global.css"
import Navbar from "../components/NavBar";
import { FaGithub } from "react-icons/fa";
import { Pixelify_Sans } from 'next/font/google'
import GithubLink from "../components/GithubLink";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400"],
})

export const metadata = {
  title: 'DaStoopidGuy\'s Blog',
  description: 'The personal website of DaStoopidGuy',
}

export default function RootLayout({ children }) {

  const header = (
    <Navbar />
  );

  const footer = (
    <footer className="flex items-center justify-center font-thin text-sm">
      More stuffs on Github:&nbsp;
      <GithubLink />
    </footer>
  );

  return (
    < html lang="en" >
      <body className={pixelify.className + " text-primary bg-background"}>
        <div className="container mx-auto max-w-3xl px-2 min-h-screen break-words overflow-hidden">
          {header}
          {children}
          {footer}
        </div>
      </body>
    </html >
  )
}
