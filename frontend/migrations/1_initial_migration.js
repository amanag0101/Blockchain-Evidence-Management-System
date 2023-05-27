const EvidenceManagementSystem = artifacts.require("EvidenceManagementSystem");

module.exports = function (deployer) {
    deployer.deploy(EvidenceManagementSystem);
};