const initializedAccounts = require("../data/account")

/**
* FakeDatabase
*/
class FakeDatabase {
    static accounts = []

    /**
     * Initialise la base de données
     */
    static init() {
        this.accounts = initializedAccounts;
    }

    /**
     * 
     * @param {string} email - Représente un email à vérifier
     * @returns {Booleen} Email valide ou incorrect
     */
    static validateEmail(email) {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(email);
    };

    /**
    * Ajoute un compte utilisateur en base de donnée.
    * @param {Account} newAccount - un compte utilisateur a créer en base de donnée.
    * @returns {(Account|undefined)} Account ajouté
    */
    static addAccount(newAccount) {
        if (!this.validateEmail(newAccount.email) || this.getAccountByEmail(newAccount.email)) {
            return undefined;
        }
        const newID = (Math.random() + 1).toString(36).substring(7);

        const account = {
            ID: newID,
            email: newAccount.email,
            prenom: newAccount.prenom,
            nom: newAccount.nom,
            mdp: newAccount.mdp,
            isAdmin: newAccount.isAdmin || false
        }
        this.accounts.push(account);

        return account
    }

    /**
    * Ajoute un compte utilisateur en base de donnée.
    * @param {string} accountID - ID d'un compte
    * @returns {(Account|undefined)} Account recherché
    */
    static getAccount(accountID) {

        const selectedAccount = this.accounts.find(account => account.ID === accountID);

        if (!JSON.stringify(selectedAccount)) {
            return undefined
        }

        return selectedAccount
    }

    /**
    * Ajoute un compte utilisateur en base de donnée.
    * @param {string} accountEmail - ID d'un compte
    * @returns {(Account|undefined)} Account recherché
    */
    static getAccountByEmail(accountEmail) {

        const selectedAccount = this.accounts.find(account => account.email === accountEmail);

        if (!JSON.stringify(selectedAccount)) {
            return undefined
        }

        return selectedAccount
    }

    /**
    * Ajoute un compte utilisateur en base de donnée.
    * @param {string} accountEmail - Email d'un compte
    * @returns {(Account|undefined)} Account recherché
    */
    static authenticate(accountEmail, accountMdp) {

        const selectedAccount = this.accounts.find(account =>
            account.email === accountEmail &&
            account.mdp === accountMdp
        );

        if (!JSON.stringify(selectedAccount)) {
            return undefined
        }

        return selectedAccount
    }

    // TODO : Ajouter la sécurité sur les propriétés modifiables
    /**
    * Modifie un compte utilisateur en base de donnée.
    * @param {Account} account - Account à modifier
    * @returns {Account} Account modifié 
    */
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