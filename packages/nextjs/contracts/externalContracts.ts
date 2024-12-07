import UNISWAP_V2_PAIR_ABI from "~~/hooks/abis/UniswapV2Pair.json";
import { UNISWAP_V2_PAIR_ADDRESS } from "~~/hooks/constants";
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

/**
 * @example
 * const externalContracts = {
 *   1: {
 *     DAI: {
 *       address: "0x...",
 *       abi: [...],
 *     },
 *   },
 * } as const;
 */
const externalContracts = {
  1: {
    UniswapV2Pair: {
      address: UNISWAP_V2_PAIR_ADDRESS,
      abi: UNISWAP_V2_PAIR_ABI,
    },
  },
} as const as GenericContractsDeclaration;

export default externalContracts;
