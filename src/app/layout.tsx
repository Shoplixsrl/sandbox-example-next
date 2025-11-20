import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FreelancePortal - Find Freelancers & Jobs",
  description: "Connect with talented freelancers or find your next project. Professional freelance marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
