const express = require('express');
const router = express.Router();
const { checkAuthority } = require("../utilities/security")
const FakeDatabase = require("../utilities/FakeDatabase")

// GET Accounts
router.get('/all', [checkAuthority], (req, res) => {
    const accounts = FakeDatabase.accounts
    res.json(accounts)
})

// GET Account
router.get('/:accountID', (req, res) => {
    const userID = req.params.accountID
    const account = FakeDatabase.getAccount(userID)
    if (!account) {
        return res.status(400).json({ message: "Unknown account" })
    }
    const { mdp, ...safeAccount } = account
    res.json(safeAccount)
})

// CREATE Account
router.post('/', (req, res) => {
    const newAccount = req.body
    if (checkAccount(newAccount)) {
        const insertedAccount = FakeDatabase.addAccount(newAccount)
        if (insertedAccount) {
            const { mdp, ...safeInsertedAccount } = insertedAccount
            res.json({
                account: safeInsertedAccount
            })
        } else {
            res.status(400).json({
                message: "Can't add this account, does it alreay exists ?"
            })
        }
    }
    else {
        res.status(400).json({
            message: "Parameters missing !"
        })
    }
})

// Authentification
router.post('/authentification', (req, res) => {
    const { email, mdp } = req.body
    const account = FakeDatabase.authenticate(email, mdp)
    if (account) {
        const { ID, isAdmin, nom, prenom } = account;
        res.json({
            ID,
            email,
            nom,
            prenom,
            isAdmin
        })
    }
    else {
        res.status(400).json({
            message: "This account doesn't exist !"
        })
    }
})

// PUT Account
router.put('/', (req, res) => {
    const account = req.body
    const changedAccount = FakeDatabase.setAccount(account);
    if (!changedAccount) {
        return res.status(400).json({ message: "Unknow modify" })
    }
    const { mdp, ...safeChangedAccount } = changedAccount

    res.status(200).json(safeChangedAccount)
})

// DELETE All Account
router.delete('/', (req, res) => {
    FakeDatabase.clearAllAccount();

    res.status(200).json({
        message: "Database cleared !"
    })
})


// INIT ACCOUNT
router.post('/init', (req, res) => {
    FakeDatabase.init();

    res.status(200).json({
        accounts: FakeDatabase.accounts
    })
})


function checkAccount(account) {
    return account.prenom != undefined &&
        account.nom != undefined &&
        account.mdp != undefined &&
        account.email != undefined
}

module.exports = router;