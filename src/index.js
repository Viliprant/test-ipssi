const express = require('express')
const { init } = require('express/lib/application')
const app = express()
const port = 3000

const FakeDatabase = require("./utilities/FakeDatabase")

const database = new FakeDatabase();
database.init();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/accounts', (req, res) => {
    res.send(database.accounts)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})