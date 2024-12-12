import { useEffect, useState } from "react";
import ERC20_ABI from "./abis/ERC20.json";
import UNISWAP_V2_ROUTER_ABI from "./abis/UniswapV2Router.json";
import { CBTC, ROUTER_ADDRESS, SEPOLIA_CHAIN_ID, WETH } from "./constants";
import { ethers } from "ethers";
import { parseEther } from "viem";
import { waitForTransactionReceipt, writeContract } from "viem/actions";
import { useAccount, useChainId, useSwitchChain, useWalletClient } from "wagmi";

export function useSwapCallback(fromAmount: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  const chain = useChainId();
  const { switchChain } = useSwitchChain();

  const { data: walletClient } = useWalletClient();

  const executeSwapAfterApproval = async () => {
    if (!address || !fromAmount || !walletClient) {
      console.error("Missing address, fromAmount, or wallet client");
      return;
    }

    try {
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20);
      const path = [WETH.address, CBTC.address];
      const amountString = Number(fromAmount).toString();
      const amountIn = ethers.utils.parseEther(amountString);
      console.log(BigInt(amountIn.toString()), BigInt(0), path, address, deadline);
      const tx2 = await writeContract(walletClient, {
        address: ROUTER_ADDRESS as `0x${string}`,
        abi: UNISWAP_V2_ROUTER_ABI,
        functionName: "swapExactTokensForTokens",
        args: [BigInt(amountIn.toString()), BigInt(0), path, address, deadline],
      });
      await waitForTransactionReceipt(walletClient, {
        hash: tx2,
      });
    } catch (err) {
      console.error("Swap failed:", err);
      setError(err instanceof Error ? err.message : "Swap failed");
      setIsLoading(false);
    }
  };

  const executeSwap = async () => {
    console.log("executeSwap");
    if (!address || !fromAmount || !walletClient) return;

    try {
      setIsLoading(true);
      setError(null);

      // Check if we're on the correct network
      if (chain !== SEPOLIA_CHAIN_ID) {
        if (switchChain) {
          switchChain({ chainId: SEPOLIA_CHAIN_ID });
        } else {
          throw new Error("Please switch to Sepolia network manually");
        }
        return; // Return here as the network switch will trigger a re-render
      }

      const amountString = Number(fromAmount).toString();
      const amountIn = ethers.utils.parseEther(amountString);

      // Approve max uint256 value
      const maxApproval = ethers.constants.MaxUint256.toString();
      const tx = await writeContract(walletClient, {
        address: WETH.address as `0x${string}`,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [ROUTER_ADDRESS as `0x${string}`, parseEther(amountIn.toString())],
      });
      await waitForTransactionReceipt(walletClient, {
        hash: tx,
      });
      await executeSwapAfterApproval();

      setIsLoading(false);
    } catch (err) {
      console.error("Approval failed:", err);
      setError(err instanceof Error ? err.message : "Approval failed");
      setIsLoading(false);
    }
  };

  return {
    executeSwap,
    isLoading: isLoading,
    error,
  };
}
