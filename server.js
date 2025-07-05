const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api-docs", require("./swagger/swagger"));

const PORT = process.env.PORT || 5000;

// Connect DB and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("MongoDB connection failed:", err));

