"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  ArrowLeftRight,
  Globe,
  LineChart,
  MessageCircle,
  WalletIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ui/theme-button";
import { useTheme } from "next-themes";

const navigation = [
  {
    label: "Lending",
    href: "/lending",
    icon: <WalletIcon className="h-4 w-4" />,
  },
  {
    label: "Swaps",
    href: "/swaps",
    icon: <ArrowLeftRight className="h-4 w-4" />,
  },
  {
    label: "Reputation",
    href: "/reputation",
    icon: <LineChart className="h-4 w-4" />,
  },
  { label: "Bridge", href: "/bridge", icon: <Globe className="h-4 w-4" /> },
  { label: "Chat", href: "/chat", icon: <MessageCircle className="h-4 w-4" /> },
];

export const Header = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 z-30 w-full border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              passHref
              className="flex items-center gap-2 mr-6 shrink-0"
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <Image
                  alt="SE2 logo"
                  className="cursor-pointer"
                  fill
                  src="/logo.svg"
                />
              </div>
              <div className="sm:flex flex-col">
                <span className="font-bold leading-tight text-sm sm:text-base">
                  BitBorrowAI
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navigation.map(({ label, href, icon }) => (
                <NavigationMenuItem key={href}>
                  <Button
                    variant={pathname === href ? "secondary" : "ghost"}
                    size="sm"
                    asChild
                  >
                    <Link href={href} className="flex items-center gap-2">
                      {icon}
                      <span>{label}</span>
                    </Link>
                  </Button>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-2">
            <ConnectButton
              label="Connect"
              chainStatus="icon"
              accountStatus="avatar"
              showBalance={false}
            />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
