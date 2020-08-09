// Servidor
const express = require('express')
const server = express()

const  { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages')

// Configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// Início e configuração do servidor
server
// Receber os dados do rec.body
.use(express.urlencoded({ extended: true }))
// Arquivos estáticos
.use(express.static("public"))
// Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
// Ouvindo a porta 5500 (start do servidor)
.listen(5500)