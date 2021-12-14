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

    static getAccount(accountID) {

        const selectedAccount = this.accounts.find(account => account.ID === accountID);

        if (!JSON.stringify(selectedAccount)) {
            return undefined
        }

        return selectedAccount
    }

    // TODO : Ajouter la sécurité sur les propriétés modifiables
    static setAccount(account = {}) {
        const { ID, ...accountProperties } = account;
        let changedAccount = undefined;
        this.accounts = this.accounts.map(account => {
            if (account.ID === ID) {
                changedAccount = { ...account, ...accountProperties };
                return changedAccount;
            }
            return account;
        });
        return changedAccount;
    }
}

module.exports = FakeDatabase