import {
 
  arbitrumSepolia,
 
} from "viem/chains";
import type { components } from "./generated/premint-api-types";
import { parseEther } from "viem";
// import { getSubgraph } from "../constants";

type BackendChainName = components["schemas"]["ChainName"];

export type NetworkConfig = {
  chainId: number;
  zoraCollectPathChainName: string;
  zoraBackendChainName: BackendChainName;
  isTestnet: boolean;
  subgraphUrl: string;
};

export const REWARD_PER_TOKEN = parseEther("0.000777");

export const networkConfigByChain: Record<number, NetworkConfig> = {

  [arbitrumSepolia.id]: {
    chainId: arbitrumSepolia.id,
    isTestnet: true,
    zoraCollectPathChainName: "arb",
    zoraBackendChainName: "ARBITRUM-MAINNET",
    subgraphUrl: "https://api.studio.thegraph.com/query/71916/choraxzora/version/latest",
  },

};

export const getSubgraphUrl = (chainId: number): string => {
  const networkConfig = networkConfigByChain[chainId];

  if (!networkConfig) {
    throw new Error(`Network not configured for chain id ${chainId}`);
  }

  return networkConfig.subgraphUrl;
};
