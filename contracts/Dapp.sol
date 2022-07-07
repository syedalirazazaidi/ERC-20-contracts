//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DappToken is ERC20 {
    uint256 public initialSupply = 1000000 * 10**8;

    // mapping(address => uint256) internal _balances;

    constructor() ERC20("DCentApp", "DAPP") {
        _totalSupply = initialSupply;
        _balances[msg.sender] = initialSupply;
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    function balanceOf(address account)
        public
        view
        virtual
        override
        returns (uint256)
    {
        return _balances[account];
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }
}
