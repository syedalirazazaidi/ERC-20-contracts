"use strict";
// import { DappToken__factory } from "./../typechain/factories/DappToken__factory";
// import { PakToken } from "./../typechain/PakToken.d";
// import { PakToken__factory } from "./../typechain/factories/PakToken__factory";
// import { PToken } from "./../typechain/PToken.d";
// import { PToken__factory } from "./../typechain/factories/PToken__factory";
// import { ethers, waffle } from "hardhat";
// import { expect } from "chai";
// import { Address } from "cluster";
// import { MyToken, MyToken__factory, DappToken } from "../typechain";
// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import { BigNumber } from "@ethersproject/bignumber";
// import { Signer } from "ethers";
// describe("DappToken", () => {
//   let daaptoken: DappToken;
//   let owner: SignerWithAddress;
//   let addr1: SignerWithAddress;
//   let addr2: SignerWithAddress;
//   let addrs: SignerWithAddress[];
//   beforeEach(async () => {
//     [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
//     daaptoken: DappToken__factory = await ethers.getContractFactory(
//       "DappToken"
//     );
//   });
//   describe("Deployment", function () {
//     it("Initial owner Balance should be equal to", async function () {
//       const ownerBalance = await daaptoken.balanceOf(owner.address);
//       console.log("ownerBalance:", ownerBalance);
//       expect(await ownerBalance).to.equal(1000);
//       //   expect(await daaptoken.totalSupply()).to.equal(ownerBalance);
//     });
//   });
// });
// // describe("PToken"),
// //   function () {
// // it("Deployement should assign the total supply", async function () {
// //   const [owner]: SignerWithAddress[] = await ethers.getSigners();
// //   console.log("Signer objects:",owner);
// //   const PToken = await ethers.getContractFactory(
// //     "Token"
// //   );
// //   const ptoken = await PToken.deploy();
// //   await ptoken.deployed();
// // }
// // };
// // describe("PakToken", function () {
// //   beforeEach(async function () {
// //     const Token: PakToken__factory = await ethers.getContractFactory(
// //       "PakToken"
// //     );
// //     const [owner, addr1, addr2, ...addrs]: SignerWithAddress[] =
// //       await ethers.getSigners();
// //     var paktoken = await Token.deploy();
// //     // expect(await paktoken.);
// //   });
// //   describe("Deployment", function () {
// //     it("should set the right owner", async function () {
// //       expect(await paktoken.balanceOf(owner.address));
// //     });
// //   });
// // });
// // describe("PakToken", function () {
// //   it("Deployement should assign the total supply", async function () {
// //     const [owner]: SignerWithAddress[] = await ethers.getSigners();
// //     const Paktoken: PakToken__factory = await ethers.getContractFactory(
// //       "PakToken"
// //     );
// //     const paktoken: PakToken = await Paktoken.deploy();
// //     const ownerBalance = await paktoken.balanceOf(owner.address);
// //     // await paktoken.deployed();
// //     expect(await paktoken.totalSupply()).to.equal(ownerBalance); //ownerBal=100000000000000
// //     // expect(await paktoken.balanceOf(await owner.getAddress())).to.equal(1000);
// //   });
// //   it("Should Transfer token between accounts", async function () {
// //     const [owner, addr1, addr2]: SignerWithAddress[] =
// //       await ethers.getSigners();
// //     const Paktoken: PakToken__factory = await ethers.getContractFactory(
// //       "PakToken"
// //     );
// //     const paktoken: PakToken = await Paktoken.deploy();
// //     // transfer 10 token from owner to addr1
// //     await paktoken.transfer(addr1.address, 10);
// //     expect(await paktoken.balanceOf(addr1.address)).to.equal(10);
// //     await paktoken.connect(addr1).transfer(addr2.address, 5);
// //     expect(await paktoken.balanceOf(addr2.address)).to.equal(5);
// //   });
// // });
// // it("Should return the total coins = owners coins", async function () {
// //   const [owner, addr1]: SignerWithAddress[] = await ethers.getSigners();
// //   const FirstCoin: MyToken__factory = await ethers.getContractFactory(
// //     "MyToken"
// //   );
// //   const firstCoin: MyToken = await FirstCoin.deploy();
// //   await firstCoin.deployed();
// //   await firstCoin.mint(owner.address, 1000);
// //   expect(await firstCoin.totalSupply()).to.equal(1000);
// //   expect(await firstCoin.balanceOf(await owner.getAddress())).to.equal(1000);
// // });
// //   it("Should transfer coins correctly", async function () {
// //     const [owner, addr1] = await ethers.getSigners();
// //     const FirstCoin = await ethers.getContractFactory("MyToken");
// //     const firstCoin = await FirstCoin.deploy();
// //     await firstCoin.deployed();
// //     await firstCoin.mint(owner.address, 1000);
// //     await firstCoin.transfer(await addr1.getAddress(), 10);
// //     expect(await firstCoin.balanceOf(await owner.getAddress())).to.equal(990);
// //     expect(await firstCoin.balanceOf(await addr1.getAddress())).to.equal(10);
// //   });
// //  });
