const express = require('express');
const router = express.Router();
const { checkAuthority } = require("../utilities/security")

// GET Accounts
router.get('/all', [checkAuthority], (req, res) => {
    res.send(FakeDatabase.accounts)
})

// CREATE Account
router.post('/', (req, res) => {
    // CHECK BODY 
    // CHECK FORMAT USER
    // RETURN 400 BAD REQUEST
    // RETURN CREATED USER
})

module.exports = router;