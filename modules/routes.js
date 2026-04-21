const express = require("express");
const path = require("path");
const marketPlace = require("./marketPlace");
const order = require("./order");
const job = require("./job/index");
const notifications = require("./notifications/index");
const user = require("./user/index");
const vehicle = require("./vehicle");

const registerRoutes = (app) => {

    app.use("/marketPlace", marketPlace);
    app.use("/order", order);
    app.use("/job", job);
    app.use("/notifications", notifications);
    app.use("/user", user);
    app.use("/vehicle", vehicle);
};

module.exports = registerRoutes;
