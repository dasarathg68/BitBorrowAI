import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const { ethers } = hre;

  console.log(`Deployer Address: ${deployer}`);

  // Deploy BTCStablecoin
  await deploy("Stablecoin", {
    from: deployer,
    args: [], // No constructor arguments for BTCStablecoin
    log: true,
    autoMine: true,
  });
  const btcStablecoin = await ethers.getContract<Contract>("Stablecoin", deployer);
  console.log("BTCStablecoin deployed at:", await btcStablecoin.getAddress());

  // Deploy CrossChainSync
  await deploy("CrossChainSync", {
    from: deployer,
    args: [
      "0xfFAEF09B3cd11D9b20d1a19bECca54EEC2884766", // Replace with actual Hyperlane inbox address
      "0xB08d78F439e55D02C398519eef61606A5926245F", // Replace with actual Hyperlane outbox address
    ],
    log: true,
    autoMine: true,
  });
  const crossChainSync = await ethers.getContract<Contract>("CrossChainSync", deployer);
  console.log("CrossChainSync deployed at:", await crossChainSync.getAddress());

  // Deploy Swap
  await deploy("AtomicSwap", {
    from: deployer,
    args: [], // Assuming Swap requires BTCStablecoin address in its constructor
    log: true,
    autoMine: true,
  });
  const swap = await ethers.getContract<Contract>("AtomicSwap", deployer);
  console.log("Swap deployed at:", swap.address);

  // Deploy LendBorrow
  await deploy("Lending", {
    from: deployer,
    args: [await btcStablecoin.getAddress()], // Assuming LendBorrow requires BTCStablecoin address
    log: true,
    autoMine: true,
  });
  const lendBorrow = await ethers.getContract<Contract>("Lending", deployer);
  console.log("Lending deployed at:", await lendBorrow.getAddress());

  // Deploy Vault
  await deploy("Vault", {
    from: deployer,
    args: ["0x3100000000000000000000000000000000000001"], //light client address
    // Assuming Vault requires BTCStablecoin and CrossChainSync addresses in its constructor
    log: true,
    autoMine: true,
  });
  const vault = await ethers.getContract<Contract>("Vault", deployer);
  console.log("Vault deployed at:", await vault.getAddress());

  // Post-deployment configurations
  console.log("Configuring contracts...");
  // Set Vault address in BTCStablecoin
  const txSetVault = await btcStablecoin.setVault(await vault.getAddress());
  await txSetVault.wait();
  console.log("BTCStablecoin's Vault set to:", await vault.getAddress());

  console.log("All contracts deployed and configured successfully!");
};

export default deployContracts;
deployContracts.tags = ["Stablecoin", "CrossChainSync", "Swap", "Lending", "Vault"];
