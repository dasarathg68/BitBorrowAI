import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/themeprovider";
import { cookieToInitialState } from "wagmi";
import { Providers } from "@/providers";
import "@rainbow-me/rainbowkit/styles.css";
import { FloatingChatButton } from "@/components/chat/floating-chat-button";

import { getConfig } from "@/lib/wagmi";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BitBorrowAI",
  description:
    "Secure, decentralized financial services powered by cBTC infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get("cookie")
  );
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers initialState={initialState}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <FloatingChatButton />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
