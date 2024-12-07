const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const cors = require("cors"); // Import CORS
app.use(cors()); // Allow cross-origin requests

app.use(express.json());
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorsRoute");
const path = require("path");

// API Routes
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);

// Serve static assets in production (React build)
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  // Handle all other routes (wildcard) and serve index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

// Default route (Hello World message)
app.get("/", (req, res) => res.send("Hello World!"));

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));
