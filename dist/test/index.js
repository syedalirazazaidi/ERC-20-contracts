"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const chai_1 = require("chai");
describe("DappToken", function () {
    it("total supply of owner", async function () {
        const [owner, addr1, addr2, ...addrs] = await hardhat_1.ethers.getSigners();
        const dappTOken = await hardhat_1.ethers.getContractFactory("DappToken");
        const dacentToken = await dappTOken.deploy();
        const ownerBalance = await dacentToken.balanceOf(owner.address);
        chai_1.expect(await dacentToken.totalSupply()).to.equal(ownerBalance);
    });
    it("Should transertoken between accounts", async function () {
        const [owner, addr1, addr2, ...addrs] = await hardhat_1.ethers.getSigners();
        const dappTOken = await hardhat_1.ethers.getContractFactory("DappToken");
        const dacentToken = await dappTOken.deploy();
        // transfer 10 tokens from owner to address;
        await dacentToken.transfer(addr1.address, 10);
        chai_1.expect(await dacentToken.balanceOf(addr1.address)).to.equal(10);
        // transfer 5  tokens from addr1 to addr2
        await dacentToken.connect(addr1).transfer(addr2.address, 5);
        chai_1.expect(await dacentToken.balanceOf(addr2.address)).to.equal(5);
    });
    it("Transation token from addr1 to addr2", async function () {
        const [owner, addr1, addr2, ...addrs] = await hardhat_1.ethers.getSigners();
        const dappTOken = await hardhat_1.ethers.getContractFactory("DappToken");
        const dacentToken = await dappTOken.deploy();
        // transfer 10 tokens from owner to address;
        await dacentToken.transfer(addr1.address, 10);
        const addr1balance = await dacentToken.balanceOf(addr1.address);
        chai_1.expect(addr1balance).to.equal(10);
        await dacentToken.connect(addr1).transfer(addr2.address, 5);
        const addr2balance = await dacentToken.balanceOf(addr2.address);
        chai_1.expect(addr2balance).to.equal(5);
    });
    it("should fail if sender does not have enough balance", async function () {
        const [owner, addr1, addr2, ...addrs] = await hardhat_1.ethers.getSigners();
        const dappTOken = await hardhat_1.ethers.getContractFactory("DappToken");
        const dacentToken = await dappTOken.deploy();
        const initialOwnerBalance = await dacentToken.balanceOf(owner.address);
        await chai_1.expect(dacentToken.connect(addr1).transfer(owner.address, 1)).to.be
            .reverted;
        chai_1.expect(await dacentToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
    it("should update balances after transation", async function () {
        const [owner, addr1, addr2, ...addrs] = await hardhat_1.ethers.getSigners();
        const dappTOken = await hardhat_1.ethers.getContractFactory("DappToken");
        const dacentToken = await dappTOken.deploy();
        const initalOwnerBalnace = await dacentToken.balanceOf(owner.address);
        await dacentToken.transfer(addr1.address, 5);
        await dacentToken.transfer(addr2.address, 10);
        const finalBalace = await dacentToken.balanceOf(owner.address);
        chai_1.expect(finalBalace).to.equal(initalOwnerBalnace.toNumber() - 15);
        const addr1Balnce = await dacentToken.balanceOf(addr1.address);
        chai_1.expect(addr1Balnce).to.equal(5);
        const addr2Balnce = await dacentToken.balanceOf(addr2.address);
        chai_1.expect(addr2Balnce).to.equal(10);
    });
    it("should emit Transfer events", async function () {
        const [owner, addr1, addr2, ...addrs] = await hardhat_1.ethers.getSigners();
        const dappTOken = await hardhat_1.ethers.getContractFactory("DappToken");
        const dacentToken = await dappTOken.deploy();
        // Transfer 50 tokens from owner to addr1
        await chai_1.expect(dacentToken.transfer(addr1.address, 50))
            .to.emit(dacentToken, "Transfer")
            .withArgs(owner.address, addr1.address, 50);
        // Transfer 50 tokens from addr1 to addr2
        // We use .connect(signer) to send a transaction from another account
        await chai_1.expect(dacentToken.connect(addr1).transfer(addr2.address, 50))
            .to.emit(dacentToken, "Transfer")
            .withArgs(addr1.address, addr2.address, 50);
    });
    //   it("transfer token from adr1 to addr2 ", async function () {
    //     const [owner, addr1, addr2, ...addrs]: any = await ethers.getSigners();
    //     const dappTOken: DappToken__factory = await ethers.getContractFactory(
    //       "DappToken"
    //     );
    //     const dacentToken = await dappTOken.deploy();
    //     const add1Balance = await dacentToken.balanceOf(addr1.address);
    //     await dacentToken.transfer(addr2.address, 5);
    //     // await dacentToken.transfer(addr2.address, 10);
    //     //  const finalBalace = await dacentToken.balanceOf(owner.address);
    //     expect(finalBalace).to.equal(initalOwnerBalnace.toNumber() - 15);
    //     const addr1Balnce = await dacentToken.balanceOf(addr1.address);
    //     expect(addr1Balnce).to.equal(5);
    //     const addr2Balnce = await dacentToken.balanceOf(addr2.address);
    //     expect(addr2Balnce).to.equal(10);
    //   });
});
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
//     const decent = await daaptoken.deploy();
//   });
//   describe("Deployment", function () {
//     it("Initial owner Balance should be equal to", async function () {
//       const ownerBalance = await daaptoken.balanceOf(owner.address);
//       console.log("ownerBalance:", ownerBalance);
//       expect(await ownerBalance).to.equal(100000000000000);
//       //   expect(await daaptoken.totalSupply()).to.equal(ownerBalance);
//     });
//   });
// });
// describe("PToken"),
//   function () {
// it("Deployement should assign the total supply", async function () {
//   const [owner]: SignerWithAddress[] = await ethers.getSigners();
//   console.log("Signer objects:",owner);
//   const PToken = await ethers.getContractFactory(
//     "Token"
//   );
//   const ptoken = await PToken.deploy();
//   await ptoken.deployed();
// }
// };
// describe("PakToken", function () {
//   beforeEach(async function () {
//     const Token: PakToken__factory = await ethers.getContractFactory(
//       "PakToken"
//     );
//     const [owner, addr1, addr2, ...addrs]: SignerWithAddress[] =
//       await ethers.getSigners();
//     var paktoken = await Token.deploy();
//     // expect(await paktoken.);
//   });
//   describe("Deployment", function () {
//     it("should set the right owner", async function () {
//       expect(await paktoken.balanceOf(owner.address));
//     });
//   });
// });
// describe("PakToken", function () {
//   it("Deployement should assign the total supply", async function () {
//     const [owner]: SignerWithAddress[] = await ethers.getSigners();
//     const Paktoken: PakToken__factory = await ethers.getContractFactory(
//       "PakToken"
//     );
//     const paktoken: PakToken = await Paktoken.deploy();
//     const ownerBalance = await paktoken.balanceOf(owner.address);
//     // await paktoken.deployed();
//     expect(await paktoken.totalSupply()).to.equal(ownerBalance); //ownerBal=100000000000000
//     // expect(await paktoken.balanceOf(await owner.getAddress())).to.equal(1000);
//   });
//   it("Should Transfer token between accounts", async function () {
//     const [owner, addr1, addr2]: SignerWithAddress[] =
//       await ethers.getSigners();
//     const Paktoken: PakToken__factory = await ethers.getContractFactory(
//       "PakToken"
//     );
//     const paktoken: PakToken = await Paktoken.deploy();
//     // transfer 10 token from owner to addr1
//     await paktoken.transfer(addr1.address, 10);
//     expect(await paktoken.balanceOf(addr1.address)).to.equal(10);
//     await paktoken.connect(addr1).transfer(addr2.address, 5);
//     expect(await paktoken.balanceOf(addr2.address)).to.equal(5);
//   });
// });
// it("Should return the total coins = owners coins", async function () {
//   const [owner, addr1]: SignerWithAddress[] = await ethers.getSigners();
//   const FirstCoin: MyToken__factory = await ethers.getContractFactory(
//     "MyToken"
//   );
//   const firstCoin: MyToken = await FirstCoin.deploy();
//   await firstCoin.deployed();
//   await firstCoin.mint(owner.address, 1000);
//   expect(await firstCoin.totalSupply()).to.equal(1000);
//   expect(await firstCoin.balanceOf(await owner.getAddress())).to.equal(1000);
// });
//   it("Should transfer coins correctly", async function () {
//     const [owner, addr1] = await ethers.getSigners();
//     const FirstCoin = await ethers.getContractFactory("MyToken");
//     const firstCoin = await FirstCoin.deploy();
//     await firstCoin.deployed();
//     await firstCoin.mint(owner.address, 1000);
//     await firstCoin.transfer(await addr1.getAddress(), 10);
//     expect(await firstCoin.balanceOf(await owner.getAddress())).to.equal(990);
//     expect(await firstCoin.balanceOf(await addr1.getAddress())).to.equal(10);
//   });
//  });
