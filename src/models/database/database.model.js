const mongoose = require('mongoose');

class Database {
constructor(){
    this.user     = process.env.DB_USER;
    this.password = process.env.DB_PASSWORD;
    this.database = process.env.DB_NAME;
    this.host     = process.env.DB_HOST;
    this.options  = process.env.DB_OPTIONS;
}
/*https://cloud.mongodb.com/*/

  connect(){
    return new Promise((resolve, reject)=>{
        mongoose
      .connect(`mongodb+srv://${this.user}:${this.password}@${this.host}/${this.database}?${this.options}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true      
      })
      .then(result => {
        resolve('MongoDB Conected!')
      })
      .catch(error => {
        console.log(`ERROR Database: ${error}`);
        reject(error);
      });
    });
  }

}


module.exports = Database;