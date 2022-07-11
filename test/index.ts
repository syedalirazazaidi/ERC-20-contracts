import { name } from "./../node_modules/jest-util/node_modules/ci-info/index.d";
import { ErcToken__factory } from "./../typechain/factories/ErcToken__factory";
import { ErcToken } from "./../typechain/ErcToken.d";
import { address } from "./../node_modules/hardhat/src/internal/core/config/config-validation";
import { DappToken__factory } from "./../typechain/factories/DappToken__factory";
import { PakToken } from "./../typechain/PakToken.d";
import { PakToken__factory } from "./../typechain/factories/PakToken__factory";
import { PToken } from "./../typechain/PToken.d";
import { PToken__factory } from "./../typechain/factories/PToken__factory";
import { ethers, waffle } from "hardhat";
import { expect, assert } from "chai";
import { Address } from "cluster";
import { MyToken, MyToken__factory, DappToken } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "@ethersproject/bignumber";
import { Signer } from "ethers";

describe("DappToken", function () {
  it("total supply of owner", async function () {
    const [owner, addr1, addr2, ...addrs]: any = await ethers.getSigners();

    const dappTOken: DappToken__factory = await ethers.getContractFactory(
      "DappToken"
    );
    const dacentToken = await dappTOken.deploy();
    const ownerBalance = await dacentToken.balanceOf(owner.address);

    expect(await dacentToken.totalSupply()).to.equal(ownerBalance);
  });
  it("Should transertoken between accounts", async function () {
    const [owner, addr1, addr2, ...addrs]: any = await ethers.getSigners();

    const dappTOken: DappToken__factory = await ethers.getContractFactory(
      "DappToken"
    );
    const dacentToken = await dappTOken.deploy();

    // transfer 10 tokens from owner to address;
    await dacentToken.transfer(addr1.address, 10);
    expect(await dacentToken.balanceOf(addr1.address)).to.equal(10);
    // transfer 5  tokens from addr1 to addr2
    await dacentToken.connect(addr1).transfer(addr2.address, 5);
    expect(await dacentToken.balanceOf(addr2.address)).to.equal(5);
  });
  it("Transation token from addr1 to addr2", async function () {
    const [owner, addr1, addr2, ...addrs]: any = await ethers.getSigners();

    const dappTOken: DappToken__factory = await ethers.getContractFactory(
      "DappToken"
    );
    const dacentToken = await dappTOken.deploy();

    // transfer 10 tokens from owner to address;
    await dacentToken.transfer(addr1.address, 10);
    const addr1balance = await dacentToken.balanceOf(addr1.address);
    expect(addr1balance).to.equal(10);
    await dacentToken.connect(addr1).transfer(addr2.address, 5);
    const addr2balance = await dacentToken.balanceOf(addr2.address);
    expect(addr2balance).to.equal(5);
  });
  it("should fail if sender does not have enough balance", async function () {
    const [owner, addr1, addr2, ...addrs]: any = await ethers.getSigners();

    const dappTOken: DappToken__factory = await ethers.getContractFactory(
      "DappToken"
    );
    const dacentToken = await dappTOken.deploy();
    const initialOwnerBalance = await dacentToken.balanceOf(owner.address);
    await expect(dacentToken.connect(addr1).transfer(owner.address, 1)).to.be
      .reverted;
    expect(await dacentToken.balanceOf(owner.address)).to.equal(
      initialOwnerBalance
    );
  });

  it("should update balances after transation", async function () {
    const [owner, addr1, addr2, ...addrs]: any = await ethers.getSigners();

    const dappTOken: DappToken__factory = await ethers.getContractFactory(
      "DappToken"
    );
    const dacentToken = await dappTOken.deploy();
    const initalOwnerBalnace = await dacentToken.balanceOf(owner.address);

    await dacentToken.transfer(addr1.address, 5);
    await dacentToken.transfer(addr2.address, 10);
    const finalBalace = await dacentToken.balanceOf(owner.address);

    expect(finalBalace).to.equal(initalOwnerBalnace.toNumber() - 15);
    const addr1Balnce = await dacentToken.balanceOf(addr1.address);
    expect(addr1Balnce).to.equal(5);
    const addr2Balnce = await dacentToken.balanceOf(addr2.address);
    expect(addr2Balnce).to.equal(10);
  });
  it("should emit Transfer events", async function () {
    const [owner, addr1, addr2, ...addrs]: any = await ethers.getSigners();

    const dappTOken: DappToken__factory = await ethers.getContractFactory(
      "DappToken"
    );
    const dacentToken = await dappTOken.deploy();

    // Transfer 50 tokens from owner to addr1
    await expect(dacentToken.transfer(addr1.address, 50))
      .to.emit(dacentToken, "Transfer")
      .withArgs(owner.address, addr1.address, 50);

    // Transfer 50 tokens from addr1 to addr2
    // We use .connect(signer) to send a transaction from another account
    await expect(dacentToken.connect(addr1).transfer(addr2.address, 50))
      .to.emit(dacentToken, "Transfer")
      .withArgs(addr1.address, addr2.address, 50);
  });
  it("Should have the correct setup", async function () {
    const [owner, addr1, addr2, ...addrs]: any = await ethers.getSigners();
    const ErcToken: any = await ethers.getContractFactory("ErcToken");

    const erctoken = await ErcToken.deploy(5000000, "NiceToken", "NTKN", 18);
    const supply = await erctoken.totalSupply();
    const tokenName = await erctoken.name();
    const tokenSymbol = await erctoken.symbol();
    const tokenDecimals = await erctoken.decimals();

    expect(supply).to.equal(
      5000000,
      "Initial supply was not the same as in migration"
    );
    expect(tokenSymbol).to.equal("NTKN", "Contract has not the correct symbol");
    expect(tokenName).to.equal(
      "NiceToken",
      "Initial supply was not the same as in migration"
    );
    expect(tokenDecimals).to.equal(18, "Contract decimals is not correct");
  });
  it("Should be possible for an account to approve another to manage some of its tokens", async function () {
    const [owner, addr1, addr2, ...addrs]: any = await ethers.getSigners();
    const ErcToken: any = await ethers.getContractFactory("ErcToken");

    const erctoken = await ErcToken.deploy(50000, "NiceToken", "NTKN", 18);
    let ali = owner;
    let lucas = addr1;
    let joao = addr2;
    await erctoken.transfer(await lucas.getAddress(), 10000);
    const lucasBalnace = await erctoken.balanceOf(lucas.address);
    expect(lucasBalnace).to.equal(10000);
    const ownerBalance = await erctoken.balanceOf(ali.address);
    expect(ownerBalance).to.equal(40000);
    await erctoken.connect(lucas).approve(await joao.getAddress(), 5000);
    const joaoBalnace = await erctoken.balanceOf(joao.address);
    expect(joaoBalnace).to.equal(0);

    const joaoAllowance = await erctoken.allowance(
      await lucas.getAddress(),
      await joao.getAddress()
    );

    assert.equal(
      joaoAllowance.toNumber(),
      5000,
      "Joao has not the correct allowance"
    );
  });
  it("Should be possible for the contract owner to mint new tokens", async function () {
    const [owner, addr1, addr2, ...addrs]: any = await ethers.getSigners();
    const ErcToken: any = await ethers.getContractFactory("ErcToken");

    const erctoken = await ErcToken.deploy(50000, "NiceToken", "NTKN", 18);
    await erctoken.deployed();
    let ali = owner;
    let rizwan = addr1;

    let totalSupply = await erctoken.totalSupply();
    let rizwanBalance = await erctoken.balanceOf(await rizwan.getAddress());
    assert.equal(
      totalSupply.toNumber(),
      50000,
      "Contract has not the correct initial supply"
    );

    assert.equal(
      rizwanBalance.toNumber(),
      0,
      "Lucas balance is not initally empty"
    );
  });
});
