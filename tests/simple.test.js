const { expect } = require("chai");

describe("Voting System", function () {
    let Voting, voting, owner, voter1, voter2;

    beforeEach(async function () {
        [owner, voter1, voter2] = await ethers.getSigners();
        Voting = await ethers.getContractFactory("VotingSystem");
        voting = await Voting.deploy(["Alice", "Bob"]);
        await voting.deployed();
    });

    it("should initialize candidates correctly", async function () {
        const alice = await voting.candidates(0);
        const bob = await voting.candidates(1);

        expect(alice.voteCount.toNumber()).to.equal(0);
        expect(bob.voteCount.toNumber()).to.equal(0);
    });

    it("should allow a voter to cast a vote", async function () {
        await voting.connect(voter1).vote(0);

        const alice = await voting.candidates(0);
        expect(alice.voteCount.toNumber()).to.equal(1);
    });

    // it("should not allow double voting by the same voter", async function () {
    //     await voting.connect(voter1).vote(0);
    //     await expect(voting.connect(voter1).vote(0)).to.be.revertedWith("You have already voted");
    // });

    it("should correctly tally votes for multiple candidates", async function () {
        await voting.connect(voter1).vote(0);
        await voting.connect(voter2).vote(1);

        const alice = await voting.candidates(0);
        const bob = await voting.candidates(1);
        
        expect(alice.voteCount.toNumber()).to.equal(1);
        expect(bob.voteCount.toNumber()).to.equal(1);
    });

    it("should return the correct winner", async function () {
        await voting.connect(voter1).vote(0);
        await voting.connect(voter2).vote(0);

        const winnerIndex = await voting.getWinner();
        const winner = await voting.candidates(winnerIndex);

        expect(winner.voteCount.toNumber()).to.equal(2);
    });
});
