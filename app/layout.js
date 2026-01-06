import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

export const metadata = {
  title: "ALEE'S GYM | High-End Fitness Center",
  description: "Join ALEE'S GYM for top-tier fitness training, modern equipment, and a professional environment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.variable}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
