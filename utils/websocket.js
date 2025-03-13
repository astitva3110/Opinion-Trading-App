const socketIo = require("socket.io");
const Event = require("../models/Event");

let io;

const initializeWebSocket = (server) => {
    if (!io) {  
        io = socketIo(server, { cors: { origin: "*" } });

        io.on("connection", (socket) => {
            console.log("WebSocket Client connected:", socket.id);

            
            socket.on("subscribeToAllLiveScores", async () => {
                console.log(`User subscribed to all live scores`);
                await sendLiveScores(socket);
            });

            
            socket.on("subscribeToEvent", (eventId) => {
                console.log(`User subscribed to event: ${eventId}`);
                socket.join(`event-${eventId}`);
            });

            socket.on("disconnect", () => {
                console.log("Client disconnected:", socket.id);
            });
        });

        watchLiveScoreUpdates();
        console.log("WebSocket server initialized!");
    }
};

const getIoInstance = () => {
    if (!io) {
        throw new Error("WebSocket not initialized! Call initializeWebSocket(server) first.");
    }
    return io;
};


const sendLiveScores = async (socket) => {
    try {
        const events = await Event.find({});
        console.log("Sending live scores to client");
        socket.emit("liveScores", events);
    } catch (error) {
        console.error("Error fetching live scores:", error);
    }
};


const watchLiveScoreUpdates = () => {
    console.log(" Live score updates listener started...");
    
    const changeStream = Event.watch();
    changeStream.on("change", async (change) => {
        console.log(" Database Change Detected:", change);

        if (change.operationType === "update" || change.operationType === "insert") {
            const updatedEvent = await Event.findOne({ _id: change.documentKey._id });
            if (updatedEvent) {
                io.emit("liveScores", updatedEvent); 
                io.to(`event-${updatedEvent._id}`).emit("liveScoreUpdate", updatedEvent);
            }
        }
    });
};

module.exports = { initializeWebSocket, getIoInstance };
