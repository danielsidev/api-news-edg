const News = require('../models/database/news.model');
const Authentication = require('../models/authentication');

class NewsController{
    constructor(){
        this.auth = new Authentication();
        this.news = {}
    }
    save(req, res){
      if(!!req.body.titulo && !!req.body.conteudo){
        this.news = new News({titulo: req.body.titulo,conteudo: req.body.conteudo});
        this.news.save()
                 .then(news => res.status(201).json(news))
                 .catch(error => res.status(422).json(error));
      }else{
        res.status(422).json("Sintaxe Error");
      }

    }
    listAll(req, res){
        News.find().sort({"data_publicacao":-1})
        .then(news => {
          (news && news.length>0)?res.status(200).json(news):res.status(404).json('Not Found');     
        })
        .catch(error => res.status(500).json(error));
    }
    listById(req, res){
      if(!!req.params.id){
        News.findById({ _id: req.params.id })
        .then(news => {
          (news)?res.status(200).json(news):res.status(404).json('Not Found');     
        })
        .catch(error => {
          (!error || error=={})?res.status(404).json('Not Found'):res.status(422).json(error);          
      });
      }else{
        res.status(422).json("Sintaxe Error");
      }
      
    }
    update(req, res){
      if(!!req.body.titulo || !!req.body.conteudo){
        let data = { titulo: req.body.titulo, conteudo: req.body.conteudo };
        News.findOneAndUpdate({ _id: req.params.id }, data, { new: true })
          .then(news => {
            (news)?res.status(200).json(news):res.status(404).json('Not Found');     
          })
          .catch(error => res.status(422).json(error));
      }else{
        res.status(422).json("Sintaxe Error");
      }
       
    }
    remove(req, res){
      if(!!req.params.id){
        News.findOneAndDelete({ _id: req.params.id })
        .then(news => res.status(200).json(news))
        .catch(error => res.status(422).json(error));
      }else{
        res.status(422).json("Sintaxe Error");
      }
     
    }
}

module.exports = NewsController;