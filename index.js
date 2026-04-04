const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const recipeRoutes = require("./routes/recipeRoutes");
const cors = require("cors");


dotenv.config();


connectDB();

const app = express();


app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Recipes API Running");
});

// Routes
app.use("/api/recipes", recipeRoutes);

// Error handler (optional but good)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || "Server Error"
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});