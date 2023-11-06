import "@/styles/global.css"
import Navbar from "../components/NavBar";
import { Pixelify_Sans } from 'next/font/google'

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400"],
})

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {

  const header = (
    <Navbar />
  );

  const footer = (
    <footer>
      Temp footer... 🦶
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
