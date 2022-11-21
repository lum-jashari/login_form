import express from "express";
import config from "config";
import bodyParser from "body-parser";
import auth from "./middleware/auth";
import user from "./routes/users";
import connectDB from "./config/database";
import userAuth from "./routes/userTokenAuth";

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("API is running");
});
app.get("/me", auth, (req, res) => {
    res.send("Me route");
});

app.get("/api/auth", auth);

app.use("/api/user", user);
app.use("/api/login", userAuth);

app.listen(config.get("PORT"), () => {
    console.log("server is listening on port:", config.get("PORT"));
});

// app.set('port', process.env.port || 5000);
