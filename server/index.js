require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const router = require("./Router/index");
const cookiesParser = require("cookie-parser");

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  credentials: true, 
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(cookiesParser());
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({ message: "running" });
});

app.use("/api", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running at", PORT);
  });
});
