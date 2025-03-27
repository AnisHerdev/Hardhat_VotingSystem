const { ethers } = require("hardhat");

async function main() {
    const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const ABI = [
        "function vote(uint256 candidateId) public",
        "function getWinner() public view returns (uint256)"
    ];
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner();
    const votingContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    const candidateId = 1; 
    const tx = await votingContract.vote(candidateId);
    console.log("Transaction sent:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction mined:", receipt);

    const winnerIndex = await votingContract.getWinner();
    console.log("The winner of the election is: ", winnerIndex.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});