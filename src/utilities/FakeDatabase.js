const initializedAccounts = require("../data/account")

class FakeDatabase {
    static accounts = []

    static init() {
        this.accounts = initializedAccounts;
    }

    static addAccount(newAccount) {
        const newID = (Math.random() + 1).toString(36).substring(7);

        const account = {
            ID: newID,
            prenom: newAccount.prenom,
            nom: newAccount.nom,
            mdp: newAccount.mdp,
            isAdmin: newAccount.isAdmin || false
        }
        this.accounts.push(account);

        return account
    }
}

module.exports = FakeDatabase