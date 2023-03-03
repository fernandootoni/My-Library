const mongoose = require('mongoose')

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mylibrary')
  console.log('Conectou ao Mongoose')
}

main().catch(err => console.log("Erro ao conectar com o mongoose " + err))

module.exports = mongoose