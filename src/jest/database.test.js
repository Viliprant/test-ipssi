const FakeDatabase = require("../utilities/FakeDatabase")

test('Check initialisation DB', () => {
    const database = new FakeDatabase();
    database.init();

    const expectedAccount = {
        "1234FA": {
            prenom: "Sarah",
            nom: "PINTO",
            mdp: "bégé"
        },
        "234FA": {
            prenom: "Louison",
            nom: "DONNE",
            mdp: "hehe"
        },
        "232A": {
            prenom: "Sébastien",
            nom: "GRIVEL",
            mdp: "haha"
        },
        "23333FA": {
            prenom: "Brandon",
            nom: "SORET",
            mdp: "hihi"
        },
    }

    expect(database.accounts).toEqual(expectedAccount);
});