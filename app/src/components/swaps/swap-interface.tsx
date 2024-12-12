"use client";

import { useEffect, useState } from "react";
import { CurrencyAmount, Percent } from "@uniswap/sdk-core";
import { ChainId } from "@uniswap/sdk-core";
import { Pair, Route, Trade } from "@uniswap/v2-sdk";
import { parseEther, formatEther } from "viem";
import { motion } from "framer-motion";
import { ArrowDownUp } from "lucide-react";
import { readContract } from "viem/actions";
import { useAccount, usePublicClient } from "wagmi";
import { useWalletClient } from "wagmi";
import UNISWAP_V2_PAIR_ABI from "@/hooks/abis/UniswapV2Pair.json";
import { CBTC, SEPOLIA_CHAIN_ID, WETH } from "@/hooks/constants";
import { UNISWAP_V2_PAIR_ADDRESS } from "@/hooks/constants";
import { useSwapCallback } from "@/hooks/useSwapCallback";
import { erc20Abi } from "viem";

export function SwapInterface() {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const {
    executeSwap,
    isLoading: isSwapping,
    error: swapError,
  } = useSwapCallback(fromAmount);

  useEffect(() => {
    const calculateOutputAmount = async () => {
      if (!fromAmount || !walletClient) return;

      try {
        // Get reserves using publicClient
        const result = (await readContract(walletClient, {
          address: UNISWAP_V2_PAIR_ADDRESS,
          abi: UNISWAP_V2_PAIR_ABI,
          functionName: "getReserves",
        })) as [bigint, bigint, number];
        console.log(result);
        const [reserve0, reserve1] = result;

        // Create pair instance
        const pair = new Pair(
          CurrencyAmount.fromRawAmount(WETH, reserve0.toString()),
          CurrencyAmount.fromRawAmount(CBTC, reserve1.toString())
        );

        // Create trade route
        const route = new Route([pair], WETH, CBTC);

        // Calculate trade
        const amountIn = CurrencyAmount.fromRawAmount(
          WETH,
          parseEther(fromAmount.toString()).toString()
        );

        const trade = Trade.exactIn(route, amountIn);

        // Create slippage tolerance of 0.5%
        const slippageTolerance = new Percent("50", "10000"); // 50/10000 = 0.5%

        // Get the minimum amount out
        const minimumAmountOut = trade.minimumAmountOut(slippageTolerance);

        // Format the output amount using ethers.utils.formatEther since it's 18 decimals
        const formattedAmount = formatEther(
          BigInt(minimumAmountOut.quotient.toString())
        );

        // Round to 6 decimal places for display
        const roundedAmount = Number(formattedAmount).toFixed(6);

        // Update output amount
        setToAmount(roundedAmount);
      } catch (error) {
        console.error("Error calculating swap amount:", error);
        setToAmount("0");
      }
    };

    calculateOutputAmount();
  }, [fromAmount, walletClient]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card bg-base-100 shadow-xl w-full max-w-md mx-auto"
    >
      <div className="card-body">
        <h2 className="card-title">Swap Tokens</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="label">
              <span className="label-text">From</span>
            </label>
            <input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="input input-bordered w-full"
            />
            <span className="block mt-1 text-sm opacity-70">BTC</span>
          </div>

          <div className="flex justify-center">
            <motion.button
              className="btn btn-ghost btn-square"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowDownUp className="h-4 w-4" />
            </motion.button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">To</label>
            <input
              type="number"
              placeholder="0.0"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              className="input input-bordered w-full"
              disabled
            />
            <span className="block mt-1 text-sm opacity-70">cBTC</span>
          </div>

          <div className="bg-base-200 rounded-lg p-3 text-sm space-y-2">
            <div className="flex flex-wrap justify-between gap-2">
              <span>Rate</span>
              <span>1 BTC = 0.998 cBTC</span>
            </div>
            <div className="flex flex-wrap justify-between gap-2">
              <span>Fee</span>
              <span>0.1%</span>
            </div>
          </div>

          {isConnected ? (
            <motion.button
              className="btn btn-primary w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={executeSwap}
              disabled={isSwapping || !fromAmount}
            >
              <span className={isSwapping ? "opacity-0" : ""}>Swap</span>
              {isSwapping && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
            </motion.button>
          ) : (
            <motion.button
              className="btn btn-primary w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {}} // Wallet connection logic
            >
              Connect Wallet
            </motion.button>
          )}

          {swapError && (
            <div className="mt-2 text-red-500 text-sm text-center">
              {swapError}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
