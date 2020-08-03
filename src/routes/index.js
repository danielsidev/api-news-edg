const express = require('express');
const routes = express();
let News       = require("./news.router");
let Access      = require("./access.router");    

routes.use('/news',News);
routes.use('/access',Access);

module.exports = routes;