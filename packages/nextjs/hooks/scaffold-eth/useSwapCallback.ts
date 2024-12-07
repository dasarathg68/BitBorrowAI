import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount, useChainId, useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import ERC20_ABI from "~~/utils/abis/ERC20.json";
import UNISWAP_V2_ROUTER_ABI from "~~/utils/abis/UniswapV2Router.json";
import { CBTC, ROUTER_ADDRESS, SEPOLIA_CHAIN_ID, WETH } from "~~/utils/uniswapconstants";

export function useSwapCallback(fromAmount: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  const chain = useChainId();
  const { switchChain } = useSwitchChain();
  const { writeContract: approveToken, data: approvalHash } = useWriteContract();

  const { writeContract: writeContract, data: swapHash } = useWriteContract();

  const {
    isLoading: isApproving,
    isSuccess: isApprovingSuccess,
    isError: isApprovingError,
  } = useWaitForTransactionReceipt({
    hash: approvalHash,
  });
  useEffect(() => {
    if (isApprovingSuccess) {
      setIsLoading(false);
      setError(null);
    }
  }, [isApprovingSuccess]);

  useEffect(() => {
    if (isApprovingError) {
      setIsLoading(false);
      setError("Approval failed");
    }
  }, [isApprovingError]);

  const {
    isLoading: isSwapping,
    isSuccess: isSuccessSwap,
    isError: isErrorSwap,
  } = useWaitForTransactionReceipt({
    hash: swapHash,
  });
  useEffect(() => {
    if (isSuccessSwap) {
      setIsLoading(false);
      setError(null);
    }
  }, [isSuccessSwap]);
  useEffect(() => {
    if (isErrorSwap) {
      setIsLoading(false);
      setError("Swap failed");
    }
  }, [isErrorSwap]);

  const executeSwapAfterApproval = () => {
    if (!address || !fromAmount) return;

    try {
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20);
      const path = [WETH.address, CBTC.address];

      const amountString = Number(fromAmount).toString();
      const amountIn = ethers.utils.parseEther(amountString);

      writeContract({
        address: ROUTER_ADDRESS as `0x${string}`,
        abi: UNISWAP_V2_ROUTER_ABI,
        functionName: "swapExactTokensForTokens",
        chainId: SEPOLIA_CHAIN_ID,

        args: [BigInt(amountIn.toString()), BigInt(0), path, address, deadline],
      });
    } catch (err) {
      console.error("Swap failed:", err);
      setError(err instanceof Error ? err.message : "Swap failed");
      setIsLoading(false);
    }
  };

  const executeSwap = async () => {
    if (!address || !fromAmount) return;

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

      approveToken({
        address: WETH.address as `0x${string}`,
        abi: ERC20_ABI,
        functionName: "approve",
        chainId: SEPOLIA_CHAIN_ID,
        args: [ROUTER_ADDRESS as `0x${string}`, BigInt(maxApproval)],
      });
    } catch (err) {
      console.error("Approval failed:", err);
      setError(err instanceof Error ? err.message : "Approval failed");
      setIsLoading(false);
    }
  };

  return {
    executeSwap,
    isLoading: isLoading || isApproving || isSwapping,
    error,
  };
}
