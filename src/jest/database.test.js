const FakeDatabase = require("../utilities/FakeDatabase")

beforeEach(() => {
    FakeDatabase.accounts = [];
});

test('Check initialisation DB', () => {
    FakeDatabase.init()

    const expectedAccount = [
        {
            ID: "1234FA",
            prenom: "Sarah",
            nom: "PINTO",
            mdp: "bégé",
            isAdmin: true
        },
        {
            ID: "234FA",
            prenom: "Bastien",
            nom: "EDERHY",
            mdp: "hehe",
            isAdmin: true
        },
        {
            ID: "232A",
            prenom: "Sébastien",
            nom: "GRIVEL",
            mdp: "haha"
        },
        {
            ID: "23333FA",
            prenom: "Brandon",
            nom: "SORET",
            mdp: "hihi",
            isAdmin: true
        },
    ]

    expect(FakeDatabase.accounts).toEqual(expectedAccount);
});

test("Check add account in database", () => {
    const newAccount = {
        ID: "23333FA",
        prenom: "Brandon",
        nom: "SORET",
        mdp: "hihi",
        isAdmin: true
    }

    FakeDatabase.addAccount(newAccount)

    expect(FakeDatabase.accounts).toEqual([newAccount]);
})