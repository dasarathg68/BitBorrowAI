import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, Globe, LineChart, MessageCircle, WalletIcon } from "lucide-react";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";
import { Faucet } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";

const navigation = [
  { name: "Lending", href: "/lending", icon: WalletIcon },
  { name: "Swaps", href: "/swaps", icon: ArrowLeftRight },
  { name: "Reputation", href: "/reputation", icon: LineChart },
  { name: "Bridge", href: "/bridge", icon: Globe },
  { name: "Chat", href: "/chat", icon: MessageCircle },
];

/**
 * Site footer
 */
export const Footer = () => {
  const pathname = usePathname();
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <>
      <div className="hidden md:block min-h-0 py-5 px-1">
        <div>
          <div className="fixed flex justify-between items-center w-full z-20 p-4 bottom-0 left-0 pointer-events-none">
            <div className="flex flex-col md:flex-row gap-2 pointer-events-auto">
              {nativeCurrencyPrice > 0 && (
                <div>
                  <div className="btn btn-primary btn-sm font-normal gap-1 cursor-auto">
                    <CurrencyDollarIcon className="h-4 w-4" />
                    <span>{nativeCurrencyPrice.toFixed(2)}</span>
                  </div>
                </div>
              )}
              {isLocalNetwork && (
                <>
                  <Faucet />
                  <Link href="/blockexplorer" passHref className="btn btn-primary btn-sm font-normal gap-1">
                    <MagnifyingGlassIcon className="h-4 w-4" />
                    <span>Block Explorer</span>
                  </Link>
                </>
              )}
            </div>
            <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} />
          </div>
        </div>
        <div className="w-full">
          <ul className="menu menu-horizontal w-full">
            <div className="flex justify-center items-center gap-2 text-sm w-full">
              <div className="text-center">
                <a href="https://github.com/scaffold-eth/se-2" target="_blank" rel="noreferrer" className="link">
                  Fork me
                </a>
              </div>
              <span>·</span>
              <div className="flex justify-center items-center gap-2">
                <p className="m-0 text-center">
                  Built with <HeartIcon className="inline-block h-4 w-4" /> at
                </p>
                <a
                  className="flex justify-center items-center gap-1"
                  href="https://buidlguidl.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BuidlGuidlLogo className="w-3 h-5 pb-1" />
                  <span className="link">BuidlGuidl</span>
                </a>
              </div>
              <span>·</span>
              <div className="text-center">
                <a
                  href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA"
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  Support
                </a>
              </div>
            </div>
          </ul>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <nav className="border-t border-base-300/40 bg-base-100">
          <div className="flex h-16 items-center justify-around px-4">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center space-y-1
                  ${pathname === item.href ? "text-primary" : "text-base-content/60 hover:text-primary"}`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};
