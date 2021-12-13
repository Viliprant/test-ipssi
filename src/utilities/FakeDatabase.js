const initializedAccounts = require("../data/account")

class FakeDatabase {
    constructor() {
        this.accounts = {}
    }
    init() {
        this.accounts = initializedAccounts;
    }
}

module.exports = FakeDatabase