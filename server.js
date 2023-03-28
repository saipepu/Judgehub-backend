const express = require('express')
const app = express();
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
require('dotenv').config();
const { MongoClient } = require("mongodb");
const server = http.createServer(app);

// middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// database connection
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect( MONGO_URL, { useNewUrlParser: true })
.then(() => console.log('DATABASE CONNECTED'))
.catch((err) => console.log(err, 'An error occured'));

const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true })

// testing routes
app.get('/api/helloworld', (req, res) => {
  console.log('helloworld')
  return res.status(200).json({ success: true, message: 'helloworld'})
})

// routes
const AllTeamsRoutes = require('./routes/allTeams')
const JudgeRoutes = require('./routes/judge')

app.use('/api/allTeams', AllTeamsRoutes);
app.use('/api/judges', JudgeRoutes)

// const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET","POST"],
    credentials: true
  }
})
const start = async () => {
  await client.connect();
  // const db = client.db("ddijudgingsystem");
  // const collection = db.collection("Judge");
  const db = client.db("JudgeHub");
  const collection = db.collection("allteams");
  io.on('connection', (socket) => {
    console.log('one client connected')
    
    collection.watch().on("change", (change) => {
        console.log("Change:", 'Databased Change!!!!!!!!!!!!!!!!!!');
        socket.emit("change", change);
    })
    socket.on('disconnect', () => {
      console.log('A client')
      collection.watch().close();
    })
  })
}
start();

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log("Server is running on PORT " , PORT))
module.exports = app