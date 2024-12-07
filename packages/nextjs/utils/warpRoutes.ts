import { TokenStandard, WarpCoreConfig } from "@hyperlane-xyz/sdk";

export const warpRouteConfigs: WarpCoreConfig = {
  tokens: [
    {
      chainName: "sepolia",
      standard: TokenStandard.EvmHypSynthetic,
      decimals: 18,
      symbol: "cBTC",
      name: "Citrea BTC",
      addressOrDenom: "0x52C369f5123dEF09825Ad006505B3C51AaAb3315",
      logoURI: "/logos/usdc.png",
      connections: [{ token: "ethereum|citreatestnet|0xF5Fd68AD561a2C46b988f7031905912B9b8873fB" }],
    },
    {
      chainName: "citreatestnet",
      standard: TokenStandard.EvmHypNative,
      decimals: 18,
      symbol: "cBTC",
      name: "Citrea BTC",
      addressOrDenom: "0xF5Fd68AD561a2C46b988f7031905912B9b8873fB",
      logoURI: "/logos/usdc.png",
      connections: [{ token: "ethereum|sepolia|0x52C369f5123dEF09825Ad006505B3C51AaAb3315" }],
    },
  ],
  options: {},
};
