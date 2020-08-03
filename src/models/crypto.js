const crypto = require("crypto");
class Crypto{

    constructor(){
        this.algoritmo = "aes256";
        this.segredo   = "chaves";
        this.tipo      = "hex";
    }

    encrypt(senha){
        const cipher = crypto.createCipher(this.algoritmo, this.segredo);
        cipher.update(senha);
        return cipher.final(this.tipo);
    }
}
module.exports = Crypto

