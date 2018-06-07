const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

const PORT = 3000;

const USER = {
    username: "John",
    password: "Wick"
};

function basicAuth(req, res) {
    const auth = req.headers["authorization"];

    if (!auth) {
        res.statusCode = 401;
        res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
        res.end("Nope.");
    } else {
        let splitheader = auth.split(" ");
        let buffer = new Buffer(splitheader[1], "base64");
        let plain_auth = buffer.toString();

        let credentials = plain_auth.split(":");
        let username = credentials[0];
        let password = credentials[1];

        if (username == USER.username && password == USER.password) {
            next();
        } else {
            res.statusCode = 401;
            res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
            res.end("Nope. Wrong credentials.");
        }
    }
}

app.use(basicAuth);

app.get("/", (req, res) => res.send("Hi."));

app.listen(PORT, () => console.log("App is listening on port " + PORT + "!"));
