const express = require('express');
const router = express.Router();
const { checkAuthority } = require("../utilities/security")
const FakeDatabase = require("../utilities/FakeDatabase")

// GET Accounts
router.get('/all', [checkAuthority], (req, res) => {
    res.send(FakeDatabase.accounts)
})

// CREATE Account
router.post('/', (req, res) => {
    const newAccount = req.body
    console.log(newAccount);
    if (checkUser(newAccount)) {
        const { mdp, ...insertedUser } = FakeDatabase.addAccount(newAccount)
        res.send({
            user: insertedUser
        })
    }
    else {
        res.status(400).send({
            message: "Parameters missing !"
        })
    }
})

function checkUser(account) {
    return account.prenom != undefined && account.nom != undefined && account.mdp != undefined
}

module.exports = router;