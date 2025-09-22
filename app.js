// Import required modules
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB connection
// If using Docker Compose, 'mongo' is the service name
mongoose.connect("mongodb://mongo:27017/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Create schema and model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});
const User = mongoose.model("User", UserSchema);

// Routes
app.get("/", (req, res) => {
    res.send("Hello from Node.js with MongoDB 🚀");
});

// Create user
app.post("/users", async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send(user);
});

// Get all users
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.send(users);
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
