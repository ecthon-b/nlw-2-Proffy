// Dados
const proffys = [
    {
        name: "Ecthon Borhis",
        avatar: "https://avatars1.githubusercontent.com/u/51732652?s=460&u=2f3c81ac1a04d66091ff5e4f51b69047c1960292&v=4",
        whatsapp:"9299999999",
        bio:"Formado em Sistemas de Informação, atualmente explorando o mundo do Desevolvimento Web",
        subject: "Front-End",
        cost: "70",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Matteo Luis",
        avatar: "https://avatars1.githubusercontent.com/u/51732652?s=460&u=2f3c81ac1a04d66091ff5e4f51b69047c1960292&v=4",
        whatsapp:"9299999999",
        bio:"Formado em Sistemas de Informação, atualmente explorando o mundo do Desevolvimento Web",
        subject: "Front-End",
        cost: "70",
        weekday: [2],
        time_from: [720],
        time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

// Funcionalidades
function getSubject(subjectNumber) {
    const position = +subjectNumber - 1 
    return subjects[position]
}

function pageLanding (req, res) {
    return res.render("index.html")
}

function pageStudy (req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses (req, res) {
    const data = req.query

    // se tiver dados (data)
    const isNotEmpty = Object.keys(data).length > 0
    if (isNotEmpty) {

        data.subject = getSubject(data.subject)
        // adicionar data a lista de proffys
        proffys.push(data)

        return res.redirect("/study")
    }

    // se não, mostrar a página
    return res.render("give-classes.html", {subjects, weekdays})
}

// Servidor
const express = require('express')
const server = express()

// Configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// Início e configuração do servidor
server
// Arquivos estáticos
.use(express.static("public"))
// Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
// Ouvindo a porta 5500 (start do servidor)
.listen(5500)