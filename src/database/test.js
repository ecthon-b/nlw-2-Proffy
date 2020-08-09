const Database = require('./db')
const createProffy = require('./createProffy')


Database.then(async (db) => {
    // Inserir dados
    proffyValue = {
        name: "Ecthon Borhis",
        avatar: "https://avatars1.githubusercontent.com/u/51732652?s=460&u=2f3c81ac1a04d66091ff5e4f51b69047c1960292&v=4",
        whatsapp:"9299999999",
        bio:"Formado em Sistemas de Informação, atualmente explorando o mundo do Desevolvimento Web",
    }

    classValue = {
        subject: 1,
        cost: "70",
        // o proffy_id virá pelo banco de dados
    }

    classScheduleValue = [
        // class_id virá pelo banco de dados, após cadastrar-mos a class 
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValue})

    // Consultar dados inseridos

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    // consultar as classes de um determinado professor
    // e trazer junto os dados do professor
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectedClassesAndProffys)

    // o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    // o horário do time_from (8h) precisa ser antes ou igual ao horário solicitado
    // o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)
    
    //console.log(selectClassesSchedules)
})