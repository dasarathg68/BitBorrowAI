# Cross-Chain DeFi Platform for Bitcoin-Backed Stablecoins and Lending/Borrowing

This platform integrates **Hyperlane** for secure cross-chain messaging and **Citrea** as the primary chain to enable decentralized stablecoins and cross-chain lending/borrowing functionalities. By utilizing cBTC (wrapped BTC) as collateral, it provides robust mechanisms for managing Bitcoin-backed stablecoins, atomic swaps, and peer-to-peer reputation scoring.

## 🚀 Features

1. **Bitcoin-Backed Stablecoins (BTCUSD):**
   - Deposit BTC verified by **Citrea's Bitcoin Light Client**.
   - Mint cBTC and use it as collateral in Citrea-native vaults to mint stablecoins.

2. **Cross-Chain Lending and Borrowing:**
   - Use **Hyperlane's secure interchain messaging** to interact with assets on Ethereum, Polygon, and other chains.

3. **Direct Atomic Swaps:**
   - Swap Bitcoin-backed stablecoins with other assets across chains using **Citrea’s Bitcoin Light Client**.

4. **Liquidation Mechanisms:**
   - Prevent under-collateralization by synchronizing collateral and price states across chains with Hyperlane.

5. **Reputation Scoring:**
   - Employ **Transitive Trust** and **EAS attestations** to build a peer-to-peer reputation system for borrowers and lenders.

6. **User-Friendly Interface:**
   - Real-time visualizations of reputation graphs and transactions using **Next.js** for an intuitive experience.

---

## 🛠️ How It Works

### 1. **High-Level Workflow:**
   1. **Deposit BTC** → **Mint cBTC** → **Deposit cBTC into Vault**.
   2. **Mint Stablecoins** using cBTC collateral (limited by Vault’s collateralization ratio).
   3. **Cross-Chain Lending/Borrowing** via Hyperlane.
   4. **Direct Atomic Swaps** for Bitcoin-backed stablecoins and other assets.
   5. **Liquidation** occurs when collateralization ratios are breached.
   6. Reputation is scored through user activities using **Transitive Trust**.

### 2. **Technologies Used:**
   - **Citrea:** Native chain for vaults and Bitcoin integration.
   - **Hyperlane:** Secure interchain messaging for cross-chain communication.
   - **EAS Attestations:** Decentralized attestation system for reputation.
   - **Next.js:** Frontend for real-time transaction and reputation visualizations.
   - **Bitcoin Light Client:** Verifies Bitcoin transactions and enables atomic swaps.

---

