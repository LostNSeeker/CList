const express = require("express");
const cors = require("cors");
require("dotenv").config();

const contestsRouter = require("./routes/contestsRouter");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.use("/api/contests", contestsRouter);

app.use("/api/user", require("./routes/userRouter"));

app.get("/", (req, res) => {
	res.send("Welcome to DevLaunch CList API");
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
