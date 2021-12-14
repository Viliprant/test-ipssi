const initializedAccounts = require("../data/account")

class FakeDatabase {
    static accounts = []

    static init() {
        this.accounts = initializedAccounts;
    }

    static addAccount(newAccount) {
        this.accounts.push(newAccount);
    }
}

module.exports = FakeDatabase