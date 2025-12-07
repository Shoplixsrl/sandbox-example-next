import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlexFlow - Your Personal Fitness Journey",
  description: "Transform your body and mind with personalized training, smart nutrition, and continuous support from expert coaches.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
