// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract EvidenceManagementSystem {
    struct Evidence {
        uint256 evidenceId;
    }

    struct Case {
        uint256 caseId;
        address caseRegistrar;
        string registrationDate;
        string caseName;
        string caseType;
        string caseDescription;
        string verdict;
        Evidence[] evidences;
    }

    uint256 private idCounter;
    // address of the contract deployer
    address public admin;
    // store a list of cases
    Case[] cases;

    constructor(address _address) {
        admin = _address;
        idCounter = 0;
    }

    modifier restricted() {
        require(msg.sender == admin);
        _;
    }

    // register a new case
    function registerCase(
        string memory _caseName,
        string memory _caseType,
        string memory _caseDescription
    ) public {
        require(msg.sender != admin);

        // Create a new storage pointer to the next slot in the requests array
        Case storage newCase = cases.push();
        newCase.registrationDate = "";
        newCase.caseId = ++idCounter;
        newCase.caseRegistrar = msg.sender;
        newCase.caseName = _caseName;
        newCase.caseType = _caseType;
        newCase.caseDescription = _caseDescription;
        newCase.verdict = "Open";
    }

    // get case details
    function getCases()
        public
        view
        returns (
            uint256[] memory _caseIds,
            string[] memory _registrationDates,
            address[] memory _caseRegistrars,
            string[] memory _caseNames,
            string[] memory _caseTypes,
            string[] memory _caseDescriptions,
            string[] memory _verdicts
        )
    {
        // Create arrays to hold the properties of the Case struct
        uint256[] memory caseIds = new uint256[](cases.length);
        string[] memory registrationDates = new string[](cases.length);
        address[] memory caseRegistrars = new address[](cases.length);
        string[] memory caseNames = new string[](cases.length);
        string[] memory caseTypes = new string[](cases.length);
        string[] memory caseDescriptions = new string[](cases.length);
        string[] memory verdicts = new string[](cases.length);

        for (uint256 i = 0; i < cases.length; i++) {
            caseIds[i] = cases[i].caseId;
            registrationDates[i] = cases[i].registrationDate;
            caseRegistrars[i] = cases[i].caseRegistrar;
            caseNames[i] = cases[i].caseName;
            caseTypes[i] = cases[i].caseType;
            caseDescriptions[i] = cases[i].caseDescription;
            verdicts[i] = cases[i].verdict;
        }

        return (
            caseIds,
            registrationDates,
            caseRegistrars,
            caseNames,
            caseTypes,
            caseDescriptions,
            verdicts
        );
    }
}
