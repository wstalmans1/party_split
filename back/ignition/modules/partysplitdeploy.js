const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("ethers");

module.exports = buildModule("PartyModule", (m) => {
  const cost = ethers.utils.parseUnits("10000000000000000", "wei");
  const party = m.contract("Party", [cost]);
  return { party };
});