import { DappToken } from "./../typechain/DappToken.d";
import { SampleToken } from "./../typechain/SampleToken.d";
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { MyToken, CrowdSale, ERC20PresetMinterPauser } from "../typechain";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const [deployer] = await ethers.getSigners();

  // console.log("Deploying contracts with the account:", deployer.address);

  // console.log(
  //   "Account balance Ether:",
  //   (await deployer.getBalance()).toString()
  // );

  const Token = await ethers.getContractFactory("MyToken");
  const token: MyToken = await Token.deploy();

  // console.log("Token address:", token.address);
  // 0xfee270c5AE93A76e18B234D0e8B1863734A4fAC9

  const CrowdSale = await ethers.getContractFactory("CrowdSale");
  const crowdSale: CrowdSale = await CrowdSale.deploy(token.address);
  const SampleToken = await ethers.getContractFactory("SampleToken");
  const sampletoken: SampleToken = await SampleToken.deploy();
  // console.log("sampletoken ------ Contract address:", sampletoken.address);

  const Dappcent = await ethers.getContractFactory("DappToken");

  const dappcent: DappToken = await Dappcent.deploy();
  console.log(dappcent.address);
  console.log("---", dappcent.balanceOf(dappcent.address));

  dappcent.totalSupply().then(function (con) {
    console.log(con, "DappToken ------ Balance:");
  });

  // console.log("Crowdsale Contract address:", crowdSale.address);

  const grantRoleTx = await token.grantRole(
    await token.MINTER_ROLE(),
    crowdSale.address
  );

  // wait until the transaction is mined
  await grantRoleTx.wait();

  const buyTx = await crowdSale.buyToken({
    value: ethers.utils.parseEther("0.05"),
  });

  // wait until the transaction is mined
  await buyTx.wait();

  const bal = await token.balanceOf(deployer.address);

  // console.log("My MyToken Balance is:", bal);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
