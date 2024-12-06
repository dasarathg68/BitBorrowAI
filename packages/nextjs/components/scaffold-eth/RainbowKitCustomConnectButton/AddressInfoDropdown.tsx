"use client";

import { useRef, useState } from "react";
import { NetworkOptions } from "./NetworkOptions";
import CopyToClipboard from "react-copy-to-clipboard";
import { getAddress } from "viem";
import { Address } from "viem";
import { useDisconnect } from "wagmi";
import {
  ArrowLeftOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { BlockieAvatar, isENS } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const allowedNetworks = getTargetNetworks();

type AddressInfoDropdownProps = {
  address: Address;
  blockExplorerAddressLink: string | undefined;
  displayName: string;
  ensAvatar?: string;
};

export const AddressInfoDropdown = ({
  address,
  ensAvatar,
  displayName,
  blockExplorerAddressLink,
}: AddressInfoDropdownProps) => {
  const { disconnect } = useDisconnect();
  const checkSumAddress = getAddress(address);

  const [addressCopied, setAddressCopied] = useState(false);
  const [selectingNetwork, setSelectingNetwork] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => {
    setSelectingNetwork(false);
    setIsOpen(false);
  };

  useOutsideClick(dropdownRef, closeDropdown);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className="btn btn-secondary btn-sm pl-0 pr-2 shadow-md dropdown-toggle gap-0 !h-auto flex items-center"
        >
          <BlockieAvatar address={checkSumAddress} size={30} ensImage={ensAvatar} />
          <span className="ml-2 mr-1 hidden sm:inline">
            {isENS(displayName) ? displayName : checkSumAddress?.slice(0, 6) + "..." + checkSumAddress?.slice(-4)}
          </span>
          <ChevronDownIcon className="h-6 w-4 ml-2" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-base-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="none">
            <NetworkOptions hidden={!selectingNetwork} />
            {!selectingNetwork && (
              <>
                <CopyToClipboard
                  text={checkSumAddress}
                  onCopy={() => {
                    setAddressCopied(true);
                    setTimeout(() => setAddressCopied(false), 800);
                  }}
                >
                  <button className="text-base-content block w-full px-4 py-2 text-left text-sm hover:bg-base-300">
                    {addressCopied ? (
                      <div className="flex items-center">
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        Address Copied
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
                        Copy Address
                      </div>
                    )}
                  </button>
                </CopyToClipboard>
                <button
                  onClick={() => (document.getElementById("qrcode-modal") as HTMLDialogElement)?.showModal()}
                  className="text-base-content block w-full px-4 py-2 text-left text-sm hover:bg-base-300"
                >
                  <div className="flex items-center">
                    <QrCodeIcon className="h-5 w-5 mr-2" />
                    View QR Code
                  </div>
                </button>

                <a
                  href={blockExplorerAddressLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base-content block w-full px-4 py-2 text-left text-sm hover:bg-base-300"
                >
                  <div className="flex items-center">
                    <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                    View on Block Explorer
                  </div>
                </a>

                {allowedNetworks.length > 1 && (
                  <button
                    onClick={() => setSelectingNetwork(true)}
                    className="text-base-content block w-full px-4 py-2 text-left text-sm hover:bg-base-300"
                  >
                    <div className="flex items-center">
                      <ArrowsRightLeftIcon className="h-5 w-5 mr-2" />
                      Switch Network
                    </div>
                  </button>
                )}

                <button
                  onClick={() => disconnect()}
                  className="text-error block w-full px-4 py-2 text-left text-sm hover:bg-base-300"
                >
                  <div className="flex items-center">
                    <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                    Disconnect
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
