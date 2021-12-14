const express = require('express')
const { init } = require('express/lib/application')
const app = express()
const port = 3000

const FakeDatabase = require("./utilities/FakeDatabase")
const AccountRoute = require("./routers/account");
const bodyParser = require('body-parser');

FakeDatabase.init();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/account", AccountRoute);

app.use((err, req, res, next) => {
    res.send(err)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})