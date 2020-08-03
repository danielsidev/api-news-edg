const mongoose = require('mongoose');
const { Schema } = mongoose;

const noticiasSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  conteudo: {
    type: String,
    require: true
  },
  data_publicacao: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('noticias', noticiasSchema);