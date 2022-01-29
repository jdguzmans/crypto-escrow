// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.15;

contract EscrowSystem {

    struct Escrow {
        address payable buyer;
        address payable seller;
        address agent;

        uint amount;
        EscrowStage stage;
    }

    enum EscrowStage {
        awaitingEscrowSent,
        awaitingPaymentSent, 
        awaitingPaymentReceived, 
        complete,
        finishedByAgentForSeller,
        finishedByAgentForBuyer
    }

    uint totalEscrows = 0;
    mapping(uint => Escrow) public escrows;

    event StageChange(uint escrowIndex, EscrowStage newStage);
    event CreatedEscrow(uint escrowIndex);

    function createEscrow (address payable buyer, address payable seller, address agent, uint amount) public returns (uint) {
        escrows[totalEscrows] = Escrow({ buyer: buyer, seller: seller, agent: agent, amount: amount, stage: EscrowStage.awaitingEscrowSent });
        totalEscrows = totalEscrows + 1;
        emit CreatedEscrow(totalEscrows - 1);
        return totalEscrows - 1;
    }

    function sendEscrow(uint index) public payable {
        Escrow storage escrow = escrows[index];

        require(msg.sender == escrow.seller, "Only seller");
        require(msg.value == escrow.amount, "Incorrect amount");
        require(escrow.stage == EscrowStage.awaitingEscrowSent, "Not valid stage");

        escrow.stage = EscrowStage.awaitingPaymentSent;
        emit StageChange(index, EscrowStage.awaitingPaymentSent);
    }

    function confirmPaymentSent(uint index) public {
        Escrow storage escrow = escrows[index];

        require(msg.sender == escrow.buyer, "Only buyer");
        require(escrow.stage == EscrowStage.awaitingPaymentSent, "Not valid stage");

        escrow.stage = EscrowStage.awaitingPaymentReceived;
        emit StageChange(index, EscrowStage.awaitingPaymentReceived);
    }

    function confirmPaymentReceived(uint index) public {
        Escrow storage escrow = escrows[index];

        require(msg.sender == escrow.seller, "Only seller");
        require(escrow.stage == EscrowStage.awaitingPaymentReceived, "Not valid stage");

        escrow.stage = EscrowStage.complete;
        escrow.buyer.transfer(escrow.amount);
        emit StageChange(index, EscrowStage.complete);
    }

    function finishEscrowByAgent(uint index, address sendEscrowTo) public {
        Escrow storage escrow = escrows[index];

        require(msg.sender == escrow.agent, "Only agent");
        require(escrow.stage == EscrowStage.awaitingPaymentSent || escrow.stage == EscrowStage.awaitingPaymentReceived, "Not valid stage");
        require(sendEscrowTo == escrow.seller || sendEscrowTo == escrow.buyer, "Escrow should be sent to either seller or buyer");

        if (sendEscrowTo == escrow.seller) {
            escrow.stage = EscrowStage.finishedByAgentForSeller;
            escrow.seller.transfer(escrow.amount);
            emit StageChange(index, EscrowStage.finishedByAgentForSeller);
            return;
        }

        escrow.stage = EscrowStage.finishedByAgentForBuyer;
        escrow.buyer.transfer(escrow.amount);
        emit StageChange(index, EscrowStage.finishedByAgentForBuyer);
    }
}
