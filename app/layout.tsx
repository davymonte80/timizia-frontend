"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Timizia",
//   description: "Education platform",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoggedIn = false; // Replace with actual auth logic
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <Providers>
          <div className="fixed z-50 top-4 right-4">
            <ModeToggle />
          </div>
          <div className="flex flex-col min-h-screen">
            {isLoggedIn && <Navbar />}
            <main className="flex-1">{children}</main>
            {!pathname.startsWith("/auth") &&
              !pathname.startsWith("/onboarding") && <Footer />}
          </div>
        </Providers>
      </body>
    </html>
  );
}
