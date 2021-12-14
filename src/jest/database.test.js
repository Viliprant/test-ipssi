const FakeDatabase = require("../utilities/FakeDatabase")

test('Check initialisation DB', () => {
    FakeDatabase.init()

    const expectedAccount = {
        "1234FA": {
            prenom: "Sarah",
            nom: "PINTO",
            mdp: "bégé",
            isAdmin: true
        },
        "234FA": {
            prenom: "Louison",
            nom: "DONNE",
            mdp: "hehe",
            isAdmin: true
        },
        "232A": {
            prenom: "Sébastien",
            nom: "GRIVEL",
            mdp: "haha"
        },
        "23333FA": {
            prenom: "Brandon",
            nom: "SORET",
            mdp: "hihi",
            isAdmin: true
        },
    }

    expect(FakeDatabase.accounts).toEqual(expectedAccount);
});