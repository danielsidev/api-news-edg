"use strict";
let express		   = require('express');
let bodyParser   = require('body-parser');
let helmet       = require('helmet'); 
let compression  = require('compression');
let cors 				 = require('cors');
let Database     = require('../models/database/database.model');
let routes       = require('../routes/index'); 

class App {

  constructor(){
    this.app = express();
    this.port = 9000;
    this.enviroment = process.env.NODE_ENV;
    this.database = new Database();
    this.configMiddlewares();
    this.initializeRoutes();    
  }
  configMiddlewares() {
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());    
    console.log(`Config Middlewares...`);
  }
  initializeRoutes() {
    this.app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).send('internal server error');
    });
    this.app.use('/api', routes);
    console.log(`Initialize Routes...`);
  }
  async databaseConn(){
      try {
         console.log(`Connecting in the database...wait..`);
         let db = await this.database.connect();    
         console.log(db);
      } catch (error) {
        console.error(`ERROR Database ${error}`);
        throw new Error(`ERROR Database ${error}`);
      }
  }
  async run() {
    try {
      await this.databaseConn();
      let port = this.port;
      let enviroment = this.enviroment;
      this.app.listen(this.port,function(){
        console.log(`Run: http://localhost:${port}`);
        console.log(`Enviroment: ${enviroment}`);  
       });
    } catch (error) {
      console.error(error);
    }
      
  }
}

module.exports = App;
