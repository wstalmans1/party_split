const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("ethers");

module.exports = buildModule("PartySplitModule", (m) => {
  //const cost = ethers.utils.parseUnits("10000000000000000");
  const partySplit2 = m.contract("PartySplit5", ["10000000000000000"]);
  return { partySplit2 };
});