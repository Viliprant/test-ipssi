import FakeDatabase from "../utilities/FakeDatabase";

//Réinitialise la database avant CHAQUE test unitaire.
beforeEach(() => {
    FakeDatabase.accounts = [];
});

// Vérifie la bonne initialisation de la base de donnée.
// @return : Account[]

test('Check initialisation DB', () => {
    FakeDatabase.init()

    const expectedAccount = [
        {
            ID: "1234FA",
            email: "sarah.pinto@ipssi.net",
            prenom: "Sarah",
            nom: "PINTO",
            mdp: "bégé",
            isAdmin: true
        },
        {
            ID: "234FA",
            email: "bastien.ederhy@ipssi.net",
            prenom: "Bastien",
            nom: "EDERHY",
            mdp: "hehe",
            isAdmin: true
        },
        {
            ID: "232A",
            email: "sebastien.grivel@ipssi.net",
            prenom: "Sébastien",
            nom: "GRIVEL",
            mdp: "haha"
        },
        {
            ID: "23333FA",
            email: "brandon.soret@ipssi.net",
            prenom: "Brandon",
            nom: "SORET",
            mdp: "hihi",
            isAdmin: true
        }
    ]

    expect(FakeDatabase.accounts).toEqual(expectedAccount);
});

// Vérification de l'ajout d'un compte - Paramètres corrects
// @return : Account
test("Check add account in database", () => {
    const newAccount = {
        email: "brandon.soret@ipssi.net",
        prenom: "Brandon",
        nom: "SORET",
        mdp: "hihi",
        isAdmin: true
    }

    const { ID } = FakeDatabase.addAccount(newAccount)

    expect(FakeDatabase.accounts).toEqual([{ ...newAccount, ID }]);
})

// Vérification de l'ajout d'un compte - [isAdmin] non renseigné (false par défaut).
// @return : Account (isAdmin : false)
test("Check add account in database (without being admin)", () => {
    const newAccount = {
        email: "brandon.soret@ipssi.net",
        prenom: "Brandon",
        nom: "SORET",
        mdp: "hihi"
    }

    const expectedNewAccount = {
        email: "brandon.soret@ipssi.net",
        prenom: "Brandon",
        nom: "SORET",
        mdp: "hihi",
        isAdmin: false
    }

    const { ID } = FakeDatabase.addAccount(newAccount)

    expect(FakeDatabase.accounts).toEqual([{ ...expectedNewAccount, ID }]);
})

// Vérification de la récupération d'un compte.
// @return : Account
test("Check get account", () => {
    FakeDatabase.init();
    const accountExpected = {
        ID: "234FA",
        email: "bastien.ederhy@ipssi.net",
        prenom: "Bastien",
        nom: "EDERHY",
        mdp: "hehe",
        isAdmin: true
    };

    const account = FakeDatabase.getAccount("234FA");

    expect(account).toEqual(accountExpected);
})

// Récupération d'un compte avec un ID inconnu
// @return : Undefined
test("Check get bad account", () => {
    FakeDatabase.init();
    const account = FakeDatabase.getAccount("234F");
    expect(account).toBeUndefined();
})

// Vérification de la modification avec un ID inconnu.
// @return : Undefined
test("Check set account", () => {
    FakeDatabase.init();
    const accountExpected = {
        ID: "234FA",
        email: "sayf.ederhy@ipssi.net",
        prenom: "Sayf",
        nom: "EDERHY",
        mdp: "hehe",
        isAdmin: true
    };

    const account = FakeDatabase.setAccount(accountExpected);

    expect(account).toEqual(accountExpected);
})

// Modification d'un compte - ID inconnu.
// @return : Undefined
test("Check set bad account", () => {
    FakeDatabase.init();
    const accountExpected = {
        ID: "234FA45",
        email: "sayf.ederhy@ipssi.net",
        prenom: "Sayf",
        nom: "EDERHY",
        mdp: "hehe",
        isAdmin: true
    };

    const account = FakeDatabase.setAccount(accountExpected);

    expect(account).toBeUndefined();
})

// Vérification de la modification d'un compte en renseignant que l'ID
// @return : Account (non modifié)
test("Check set only ID account", () => {
    FakeDatabase.init();
    const accountExpected = {
        ID: "234FA",
        email: "bastien.ederhy@ipssi.net",
        prenom: "Bastien",
        nom: "EDERHY",
        mdp: "hehe",
        isAdmin: true
    };

    const account = FakeDatabase.setAccount({ ID: "234FA" });

    expect(account).toEqual(accountExpected);
})

// Vérification de la modification sans renseigner de paramètres.
// @return : Undefined
test("Check set without ID account", () => {
    FakeDatabase.init();

    const account = FakeDatabase.setAccount();

    expect(account).toBeUndefined();
})