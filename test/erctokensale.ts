import { ErcTokenSale__factory } from "./../typechain/factories/ErcTokenSale__factory";
import { ethers, waffle } from "hardhat";
import { expect, assert } from "chai";
describe("Token Contract", function () {
  it("Should be the right  tokens owner", async function () {
    const [owner, addr1, addr2, ...addrs]: any = await ethers.getSigners();
    const ErcTokenSale = await ethers.getContractFactory("ErcTokenSale");

    const erctokensale = await ErcTokenSale.deploy();
    const saletoken = await erctokensale.deployed();
    expect(await saletoken.admin()).to.equal(owner.address);
  });
});
