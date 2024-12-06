import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, Globe, LineChart, MessageCircle, WalletIcon } from "lucide-react";

const navigation = [
  { name: "Lending", href: "/lending", icon: WalletIcon },
  { name: "Swaps", href: "/swaps", icon: ArrowLeftRight },
  { name: "Reputation", href: "/reputation", icon: LineChart },
  { name: "Bridge", href: "/bridge", icon: Globe },
  { name: "Chat", href: "/chat", icon: MessageCircle },
];

export const Footer = () => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Footer */}
      <div className=" hidden sm:flex justify-between items-center px-8 py-4">
        {/* Left side - Logo and Copyright */}
        <div className="flex items-center gap-4">
          <LineChart className="w-6 h-6" />
          <p className="text-sm">BitBorrowAI © 2024 - Made with ❤️ by Dasarath G</p>
        </div>

        {/* Right side - Social Links */}
        <div className="flex gap-6">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Globe className="w-5 h-5" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <ArrowLeftRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="btm-nav btm-nav-sm sm:hidden">
        {navigation.map(item => (
          <Link
            key={item.name}
            href={item.href}
            className={`${pathname === item.href ? "active text-primary" : "text-base-content"}`}
          >
            <item.icon className="w-5 h-5" />
            <span className="btm-nav-label">{item.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
};
