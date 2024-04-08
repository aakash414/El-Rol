// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccidentData {
    // Structure to represent an accident record
    struct Accident {
        string date;
        string time;
        string location;
        string registrationNumber; // Optional, depending on privacy regulations
        string hashLink;
    }
    mapping(uint256 => Accident) public accidents;
    uint256 public numberOfAccidents = 0;

    function addAccident(
        string memory _loc,
        string memory _date,
        string memory _time,
        string memory _registrationNumber,
        string memory _hashLink
    ) public {
        numberOfAccidents++;
        accidents[numberOfAccidents] = Accident(
            _loc,
            _date,
            _time,
            _registrationNumber,
            _hashLink
        );
    }

    function getAccident(
        uint256 _id
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            accidents[_id].location,
            accidents[_id].date,
            accidents[_id].time,
            accidents[_id].registrationNumber,
            accidents[_id].hashLink
        );
    }

    function getNumberOfAccidents() public view returns (uint256) {
        return numberOfAccidents;
    }
}
