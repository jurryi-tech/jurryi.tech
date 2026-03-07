import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JURRYI TECH — AI-Powered Patent Prosecution Infrastructure",
  description: "The world's first privacy-enabled AI infrastructure purpose-built for patent attorney teams. Trained on prosecution history. Engineered to eliminate rejections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
