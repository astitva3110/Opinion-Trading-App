const axios = require("axios");
const cron = require("node-cron");
const Event = require("../models/Event");
const Market = require("../models/Market");
const Trade = require("../models/Trade");
const { getIoInstance } = require("../utils/websocket");
const processPayouts = require('./payout');

const startLiveScoreUpdater = () => {
    cron.schedule("*/30 * * * * *", async () => { 
        console.log("Fetching live scores from API");
        try {
            const response = await axios.get(process.env.API_URL);
            if (response.data.success && response.data.data.match) {
                const matches = response.data.data.match;
                for (const match of matches) {
                    let event = await Event.findOne({ fixtureId: match.fixture_id });

                    if (!event) {
                        event = new Event({
                            fixtureId: match.fixture_id,
                            title: `${match.home.name} vs ${match.away.name}`,
                            teamA: match.home.name,
                            teamB: match.away.name,
                            liveScore: match.scores.score || "0 - 0",
                            preScore: match.scores.ft_score || "N/A",
                            status: match.status,
                            time: match.time,
                        });
                    } else {
                        if (event.status === "IN PLAY" && match.status === "FINISHED") {
                            await processPayouts(event._id, match.scores.ft_score);
                        }

                        event.liveScore = match.scores.score || "0 - 0";
                        event.status = match.status;
                        event.time = match.time;
                    }

                    await event.save();
                    let market = await Market.findOne({ event: event._id });
                    if (!market) {
                        market = new Market({
                            event: event._id,
                            odd: match.odds?.live || { "1": 1.98, "X": 1.98, "2": 1.98 } 
                        });
                        await market.save();
                        console.log(`Market created for ${event.title}`);
                    }

                }

                let updatedEvents = await Event.find({});
                updatedEvents = updatedEvents.sort((a, b) => {
                    if (a.status === "IN PLAY" && b.status !== "IN PLAY") return -1;
                    if (a.status !== "IN PLAY" && b.status === "IN PLAY") return 1;
                    return 0; 
                });
                const io = getIoInstance();
                io.emit("liveScores", updatedEvents);

                console.log(" Live scores updated and sorted!");
            } else {
                console.log(" API response invalid, no live scores fetched.");
            }
        } catch (error) {
            console.error(" Error fetching live scores:", error);
        }
    });
};

module.exports = { startLiveScoreUpdater };
