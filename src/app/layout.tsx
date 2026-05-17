import type { Metadata, Viewport } from "next";

import { APP_NAME } from "@/shared/constants/app";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "A private live music journal for concerts, setlists, and show memories.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
