const express = require('express')
const { init } = require('express/lib/application')
const app = express()
const port = 3000

const FakeDatabase = require("./utilities/FakeDatabase")
const { checkAuthority } = require("./utilities/security")

FakeDatabase.init();

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.get('/accounts', [checkAuthority], (req, res) => {
    res.send(FakeDatabase.accounts)
})

app.use((err, req, res, next) => {
    res.send(err)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})