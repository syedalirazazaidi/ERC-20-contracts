//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ErcToken.sol";

contract ErcTokenSale is ERC20 {
    ErcToken public tokenContract;
    uint256 public initialSupply = 1000000 * 10**8;
    address public admin;

    constructor(ErcToken _tokenContract) ERC20("Gold", "GLD") {
        admin = msg.sender;
        tokenContract = _tokenContract;
        // _mint(msg.sender, initialSupply);
    }

    // function _mint(address account, uint256 amount) internal {
    // require(account != address(0), "Token: cannot mint to zero address");
    // _totalSupply = _totalSupply + amount;
    // _balances[account] = _balances[account] + amount;
    // emit Transfer(address(0), account, amount);
    // }
}
