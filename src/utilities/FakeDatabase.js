const initializedAccounts = require("../data/account")

class FakeDatabase {
    static accounts = {}

    static init() {
        this.accounts = initializedAccounts;
    }
}

module.exports = FakeDatabase