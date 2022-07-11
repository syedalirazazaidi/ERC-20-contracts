"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const chai_1 = require("chai");
describe("Token Burn", function () {
    it("Should be possible for the contract owner to burn tokens", async function () {
        const [owner, addr1, addr2, ...addrs] = await hardhat_1.ethers.getSigners();
        const ErcToken = await hardhat_1.ethers.getContractFactory("ErcToken");
        const erctoken = await ErcToken.deploy(5000000, "NiceToken", "NTKN", 18);
        await erctoken.deployed();
        let totalSupply = await erctoken.totalSupply();
        let ownerBalance = await erctoken.balanceOf(await owner.getAddress());
        chai_1.assert.equal(totalSupply.toNumber(), 5000000, "Contract has not the correct initial supply");
        chai_1.assert.equal(ownerBalance.toNumber(), 5000000, "Owner balance has not the correct initial supply");
        await erctoken.burn(await owner.getAddress(), 10000);
        totalSupply = await erctoken.totalSupply();
        ownerBalance = await erctoken.balanceOf(await owner.getAddress());
        chai_1.assert.equal(totalSupply.toNumber(), 4990000, "Supply was not correctly decreased");
        chai_1.assert.equal(ownerBalance.toNumber(), 4990000, "Owner balance was not correctly updated");
    });
    it("Should not be possible for a regular account to burn tokens", async function () {
        const [owner, addr1, addr2, ...addrs] = await hardhat_1.ethers.getSigners();
        const ErcToken = await hardhat_1.ethers.getContractFactory("ErcToken");
        const erctoken = await ErcToken.deploy(5000000, "NiceToken", "NTKN", 18);
        await erctoken.deployed();
        await chai_1.expect(erctoken.connect(addr1).burn(await owner.getAddress(), 15000)).to.be.revertedWith("Ownable: caller is not the owner");
    });
});
