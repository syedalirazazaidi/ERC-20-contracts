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

    function transfer(address to, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        require(_balances[msg.sender] >= amount, "Not enought Token");
        _balances[msg.sender] -= amount;
        _balances[to] += amount;
        return true;
        // address owner = _msgSender();
        // _transfer(owner, to, amount);
        // return true;
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
