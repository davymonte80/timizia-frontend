"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { usePathname } from "next/navigation";
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            {!pathname.startsWith("/auth") &&
              !pathname.startsWith("/onboarding") && <Footer />}
          </div>
        </Providers>
      </body>
    </html>
  );
}
