const express = require('express');
const http = require('http');
const path=require('path')
require('dotenv').config();
const cors = require("cors");
const connectDB = require('./utils/database');
const {initializeWebSocket} = require('./utils/websocket'); 
const {startLiveScoreUpdater}= require('./utils/cron')

const authRoute = require('./routes/auth.route');
const eventRoute = require('./routes/event.route');
const userRoute=require('./routes/user.route');
const tradeRoute=require('./routes/trade.route');
const adminRoute=require('./routes/admin.route');

const app = express();
const server = http.createServer(app); // Attach Express to HTTP server

connectDB(); // Connect to MongoDB

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Routes
app.use('/auth', authRoute);
app.use('/event', eventRoute);
app.use('/user',userRoute);
app.use('/trade',tradeRoute)
app.use('/admin',adminRoute);


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

initializeWebSocket(server);
startLiveScoreUpdater();


const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
