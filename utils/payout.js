const Trade = require("../models/Trade");
const Users = require("../models/Users"); // ✅ Import Users model

const processPayouts = async (eventId, finalScore) => {
    try {
        console.log(`Processing payouts for event: ${eventId}, Final Score: ${finalScore}`);

  
        const trades = await Trade.find({ event: eventId, status: "pending" });

        for (const trade of trades) {
            console.log(`Processing Trade ID: ${trade._id}, User: ${trade.userId}, Bet Type: ${trade.betType}`);

            const result = determineResult(trade, finalScore);
            const user = await Users.findById(trade.userId);

            if (!user) {
                console.error(`User not found for Trade ID: ${trade._id}`);
                continue;
            }

            
            if (result === "won") {
                trade.status = "won";
                user.balance += trade.payout; 
            } else {
                trade.status = "lost";
                trade.payout = 0; 
            }

            await trade.save();
            await user.save();

            console.log(`Payout processed for Trade ID: ${trade._id}, Status: ${trade.status}, Payout: ${trade.payout}`);
        }
    } catch (error) {
        console.error("Error processing payouts:", error);
    }
};

const determineResult = (trade, finalScore) => {
    const [teamAScore, teamBScore] = finalScore.split("-").map(num => parseInt(num.trim(), 10));

    if (trade.betType === "teamA" || trade.betType === "1") {
        return teamAScore > teamBScore ? "won" : "lost";
    } else if (trade.betType === "teamB" || trade.betType === "2") {
        return teamBScore > teamAScore ? "won" : "lost";
    } else if (trade.betType === "draw" || trade.betType === "X") {
        return teamAScore === teamBScore ? "won" : "lost";
    }
    return "lost";
};

module.exports = processPayouts;
