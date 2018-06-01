const express = require("express");
const app = express();

const PORT = 3000;

const USER = {
    username: "John",
    password: "Wick"
};

function basicAuth(req, res) {
    var auth = req.headers["authorization"];

    if (!auth) {
        res.statusCode = 401;
        res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
        res.end("Nope.");
    } else {
        var splitheader = auth.split(" ");
        var buffer = new Buffer(splitheader[1], "base64");
        var plain_auth = buffer.toString();

        var credentials = plain_auth.split(":");
        var username = credentials[0];
        var password = credentials[1];

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

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log("App is listening on port " + PORT + "!"));
