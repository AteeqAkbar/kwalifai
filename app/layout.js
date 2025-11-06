"use client";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

// export const metadata = {
//   title: "LeapTalent - Find Your Dream Job",
//   description: "Connecting talented professionals with top companies",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ClerkProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
