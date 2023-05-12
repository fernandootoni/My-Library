const mongoose = require('mongoose')

async function main() {
  await mongoose.connect('mongodb://127.0.0.1/mylibrary')
  mongoose.set('strictQuery', true)
  console.log('Conectou ao Mongoose')
}

main().catch(err => console.log("Erro ao conectar com o mongoose " + err))

module.exports = mongoose 