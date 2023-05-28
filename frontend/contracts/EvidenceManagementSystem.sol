// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract EvidenceManagementSystem {
    struct Evidence {
        uint256 evidenceId;
        uint256 timestamp;
        string evidenceType;
        string evidenceDescription;
    }

    struct Case {
        uint256 caseId;
        uint256 creationTimestamp;
        string caseName;
        string caseType;
        string caseDescription;
        Evidence[] evidences;
    }

    address public admin;
    mapping(address => Case[]) cases; // store a list of cases

    constructor() {
        admin = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == admin);
        _;
    }

    modifier notAdmin() {
        require(msg.sender != admin);
        _;
    }

    // register a new case
    function registerCase(
        string memory _caseName,
        string memory _caseType,
        string memory _caseDescription
    ) public notAdmin {
        // Create a new storage pointer to the next slot in the requests array
        Case storage newCase = cases[msg.sender].push();
        newCase.creationTimestamp = block.timestamp;
        newCase.caseId = cases[msg.sender].length;
        newCase.caseName = _caseName;
        newCase.caseType = _caseType;
        newCase.caseDescription = _caseDescription;
    }

    // add evidence to a case
    function addEvidenceToCase(
        uint256 _caseId,
        string memory _evidenceType,
        string memory _evidenceDescription
    ) public {
        for (uint256 i = 0; i < cases[msg.sender].length; i++) {
            if (cases[msg.sender][i].caseId == _caseId) {
                Evidence storage newEvidence = cases[msg.sender][i]
                    .evidences
                    .push();
                newEvidence.evidenceId = cases[msg.sender][i].evidences.length;
                newEvidence.timestamp = block.timestamp;
                newEvidence.evidenceType = _evidenceType;
                newEvidence.evidenceDescription = _evidenceDescription;
                break;
            }
        }
    }

    // get case details
    function getCases(address _address) public view returns (Case[] memory) {
        return cases[_address];
    }

    // get evidences for a particular case
    function getEvidenceForCase(
        uint256 _caseId
    ) public view returns (Evidence[] memory) {
        for (uint256 i = 0; i < cases[msg.sender].length; i++) {
            if (cases[msg.sender][i].caseId == _caseId) {
                return cases[msg.sender][i].evidences;
            }
        }
        return new Evidence[](0);
    }
}
