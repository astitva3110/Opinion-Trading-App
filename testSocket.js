const io = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
    console.log("✅ Connected to WebSocket Server!");
    socket.emit("subscribeToAllLiveScores");
});

socket.on("liveScores", (data) => {
    console.log("🔥 Live Scores Received:", data);
});

socket.on("message", (data) => {
    console.log("📢 Server Message:", data);
});

socket.on("disconnect", () => {
    console.log("❌ Disconnected from server");
});
