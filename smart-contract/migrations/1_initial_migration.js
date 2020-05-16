const Migrations = artifacts.require("Migrations");
const PixelToken = artifacts.require("PixelToken");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.link(Migrations,PixelToken);
  deployer.deploy(PixelToken);
};
