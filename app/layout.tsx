import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ISpectra Food - Đặt món trực tuyến",
  description: "Dịch vụ đặt món ăn cao cấp, nhanh chóng và tiện lợi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
