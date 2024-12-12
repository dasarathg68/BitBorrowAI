"use client";

import { useEffect, useState } from "react";
import { CurrencyAmount, Percent } from "@uniswap/sdk-core";
import { ChainId } from "@uniswap/sdk-core";
import { Pair, Route, Trade } from "@uniswap/v2-sdk";
import { parseEther, formatEther } from "viem";
import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import { readContract } from "viem/actions";
import { useAccount, usePublicClient } from "wagmi";
import { useWalletClient } from "wagmi";
import UNISWAP_V2_PAIR_ABI from "@/hooks/abis/UniswapV2Pair.json";
import { CBTC, SEPOLIA_CHAIN_ID, WETH } from "@/hooks/constants";
import { UNISWAP_V2_PAIR_ADDRESS } from "@/hooks/constants";
import { useSwapCallback } from "@/hooks/useSwapCallback";
import { erc20Abi } from "viem";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
      className="w-full max-w-md mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle>Swap Tokens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="from-amount">From</Label>
            <Input
              id="from-amount"
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
            />
            <span className="block text-sm text-muted-foreground">BTC</span>
          </div>

          <div className="flex justify-center">
            <motion.button
              className="p-2 rounded-full hover:bg-accent"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUpDown className="h-4 w-4" />
            </motion.button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to-amount">To</Label>
            <Input
              id="to-amount"
              type="number"
              placeholder="0.0"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              disabled
            />
            <span className="block text-sm text-muted-foreground">cBTC</span>
          </div>

          <div className="bg-muted rounded-lg p-3 text-sm space-y-2">
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
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full"
                onClick={executeSwap}
                disabled={isSwapping || !fromAmount}
              >
                {isSwapping ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </div>
                ) : (
                  "Swap"
                )}
              </Button>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full" onClick={() => {}}>
                Connect Wallet
              </Button>
            </motion.div>
          )}

          {swapError && (
            <div className="mt-2 text-destructive text-sm text-center">
              {swapError}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
