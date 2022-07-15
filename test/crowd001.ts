import { CrowdFaunding__factory } from "./../typechain/factories/CrowdFaunding__factory";
import { ethers, waffle } from "hardhat";
import { expect, assert } from "chai";
describe("set target and mimimum contributor", function () {
  it("minimum contributore ,target and manager", async function () {
    const [owner, addr1, addr2, ...addrs]: any = await ethers.getSigners();
    const CrowFunding: any = await ethers.getContractFactory("CrowFunding");
    const crowfunding = await CrowFunding.deploy(1000, 3600);
    await crowfunding.deployed();
    const supply = await crowfunding.target();
    expect(supply).to.equal(1000, "set initial target");
    // const crowTarget = await crowfunding.target();

    // expect(await crowTarget.target()).to.equal(1000);
  });
});
