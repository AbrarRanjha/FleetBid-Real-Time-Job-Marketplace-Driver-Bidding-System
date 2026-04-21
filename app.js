const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const { connection } = require("./config/connection");
const registerRoutes = require("./modules/routes.js");


async function createApp() {
    const app = express();
    await connection();
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '50mb',
        parameterLimit: 1000000
    }));
    app.use(bodyParser.json());
    app.use(cors({ origin: "*" }));
    app.use("/public", express.static(path.join(__dirname, "/public")));
    app.get("/", (req, res) => {
        res.send("Welcome to Mousool APP!");
    });
    registerRoutes(app);

    return app;
}

module.exports = { createApp };
