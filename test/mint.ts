import { ethers, waffle } from "hardhat";
import { expect, assert } from "chai";
describe("Token Mint", function () {
  it("Should be possible for the contract owner to mint new tokens", async function () {
    const [owner, addr1, addr2, ...addrs]: any = await ethers.getSigners();
    const ErcToken: any = await ethers.getContractFactory("ErcToken");

    const erctoken = await ErcToken.deploy(50000, "NiceToken", "NTKN", 18);
    await erctoken.deployed();
    let totalSupply = await erctoken.totalSupply();
    let lucasBalance = await erctoken.balanceOf(await addr1.getAddress());

    assert.equal(
      totalSupply.toNumber(),
      50000,
      "Contract has not the correct initial supply"
    );
    assert.equal(
      lucasBalance.toNumber(),
      0,
      "Lucas balance is not initally empty"
    );
    await erctoken.mint(await addr1.getAddress(), 10000);

    totalSupply = await erctoken.totalSupply();
    lucasBalance = await erctoken.balanceOf(await addr1.getAddress());

    assert.equal(
      totalSupply.toNumber(),
      60000,
      "Supply was not correctly increased"
    );

    assert.equal(
      lucasBalance.toNumber(),
      10000,
      "Lucas balance was not correctly updated"
    );
  });
  it("Should not be possible for a regular account to mint new tokens", async function () {
    const [owner, addr1, addr2, ...addrs]: any = await ethers.getSigners();
    const ErcToken: any = await ethers.getContractFactory("ErcToken");

    const erctoken = await ErcToken.deploy(50000, "NiceToken", "NTKN", 18);
    await erctoken.deployed();
    await expect(
      erctoken.connect(addr1).mint(await addr1.getAddress(), 15000)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
