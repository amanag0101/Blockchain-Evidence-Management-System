// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract EvidenceManagementSystem {
    struct Evidence {
        uint256 evidenceId;
        uint256 caseId;
        uint256 uploadTimestamp;
        string evidenceType;
        string department;
        address uploader;
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
    uint256 private caseIdCounter;
    uint256 private evidenceIdCounter;
    mapping(address => Case[]) cases; // store a list of cases

    constructor() {
        admin = msg.sender;
        caseIdCounter = 0;
        evidenceIdCounter = 0;
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
        // require(msg.sender != admin);

        // Create a new storage pointer to the next slot in the requests array
        Case storage newCase = cases[msg.sender].push();
        newCase.creationTimestamp = block.timestamp;
        newCase.caseId = ++caseIdCounter;
        newCase.caseName = _caseName;
        newCase.caseType = _caseType;
        newCase.caseDescription = _caseDescription;
    }

    // add evidence to a case
    // function uploadEvidence(
    //     uint256 caseId,
    //     string memory _evidenceType,
    //     string memory _departm   ent,
    //     address _uploader,
    //     string memory _evidenceDescription
    // ) public {

    // }

    // get case details
    function getCases(address _address) public view returns (Case[] memory) {
        return cases[_address];
    }
}
