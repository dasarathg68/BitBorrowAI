"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, Globe, LineChart, MessageCircle, WalletIcon } from "lucide-react";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const navigation = [
  { label: "Lending", href: "/lending", icon: <WalletIcon className="h-4 w-4" /> },
  { label: "Swaps", href: "/swaps", icon: <ArrowLeftRight className="h-4 w-4" /> },
  { label: "Reputation", href: "/reputation", icon: <LineChart className="h-4 w-4" /> },
  { label: "Bridge", href: "/bridge", icon: <Globe className="h-4 w-4" /> },
  { label: "Chat", href: "/chat", icon: <MessageCircle className="h-4 w-4" /> },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-30 w-full bg-base-100 shadow-md shadow-secondary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 lg:py-5">
          <div className="flex items-center">
            <Link href="/" passHref className="flex items-center gap-2 mr-6 shrink-0">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
              </div>
              <div className="sm:flex flex-col">
                <span className="font-bold leading-tight text-sm sm:text-base">BitBorrowAI</span>
              </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-4">
            {navigation.map(({ label, href, icon }) => (
              <Link
                key={href}
                href={href}
                className={`${
                  pathname === href ? "bg-secondary shadow-md" : ""
                } flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary hover:shadow-md transition-all`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <RainbowKitCustomConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
};
