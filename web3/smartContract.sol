// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccidentData {
    // Structure to represent an accident record
    struct AccidentRecord {
        bytes32 hash;
        uint256 timestamp;
        string location;
        string registrationNumber; // Optional, depending on privacy regulations
    }

    // Mapping to store accident records with unique identifiers
    mapping(uint256 => AccidentRecord) public records;

    // Counter for assigning unique IDs to accident records
    uint256 public nextAccidentId;

    // Event to signal a new accident record being added
    event AccidentAdded(
        uint256 accidentId,
        uint256 timestamp,
        string location,
        string registrationNumber
    );

    // Function to receive data from the video processing system
    function receiveData(bytes calldata data, bytes32 hash) public {
        // Deserialize the received critical data
        AccidentRecord memory record = abi.decode(data, (AccidentRecord));

        // Store the record with a unique ID and increment the counter
        records[nextAccidentId] = record;
        nextAccidentId++;

        // Emit an event to notify listeners about the new record
        emit AccidentAdded(
            nextAccidentId - 1,
            record.timestamp,
            record.location,
            record.registrationNumber
        );

        // Store the hash of the video/snapshot on the blockchain
        storeHash(hash);
    }

    // Function to store the hash of the video/snapshot securely
    function storeHash(bytes32 hash) private {
        // Use a keccak256 hash of the caller's address and the hash to prevent malleability attacks
        bytes32 storageHash = keccak256(abi.encodePacked(msg.sender, hash));
        // Store the storage hash on the blockchain
        records[nextAccidentId].hash = storageHash; // Associate the hash with the latest record
    }

    // Function to retrieve accident record details (consider access control for security)
    function getRecord(
        uint256 accidentId
    ) public view returns (AccidentRecord memory) {
        require(accidentId < nextAccidentId, "Invalid accident ID");
        return records[accidentId];
    }
}
