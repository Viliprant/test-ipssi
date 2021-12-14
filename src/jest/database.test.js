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

    const { ID } = FakeDatabase.addAccount(newAccount)

    expect(FakeDatabase.accounts).toEqual([{ ...newAccount, ID }]);
})

test("Check add account in database (without being admin)", () => {
    const newAccount = {
        prenom: "Brandon",
        nom: "SORET",
        mdp: "hihi"
    }

    const expectedNewAccount = {
        prenom: "Brandon",
        nom: "SORET",
        mdp: "hihi",
        isAdmin: false
    }

    const { ID } = FakeDatabase.addAccount(newAccount)

    expect(FakeDatabase.accounts).toEqual([{ ...expectedNewAccount, ID }]);
})

test("Check get account", () => {
    FakeDatabase.init();
    const accountExpected = {
        ID: "234FA",
        prenom: "Bastien",
        nom: "EDERHY",
        mdp: "hehe",
        isAdmin: true
    };

    const account  =  FakeDatabase.getAccount("234FA");

    expect(account).toEqual(accountExpected);
})

test("Check get bad account", () => {
    FakeDatabase.init();
    const account  =  FakeDatabase.getAccount("234F");
    expect(account).toBeUndefined();
})

test("Check set account", () => {
    FakeDatabase.init();
    const accountExpected = {
        ID: "234FA",
        prenom: "Sayf",
        nom: "EDERHY",
        mdp: "hehe",
        isAdmin: true
    };

    const account  =  FakeDatabase.setAccount(accountExpected);

    expect(account).toEqual(accountExpected);
})

test("Check set bad account", () => {
    FakeDatabase.init();
    const accountExpected = {
        ID: "234FA45",
        prenom: "Sayf",
        nom: "EDERHY",
        mdp: "hehe",
        isAdmin: true
    };

    const account  =  FakeDatabase.setAccount(accountExpected);

    expect(account).toBeUndefined();
})

test("Check set only ID account", () => {
    FakeDatabase.init();
    const accountExpected = {
        ID: "234FA",
        prenom: "Bastien",
        nom: "EDERHY",
        mdp: "hehe",
        isAdmin: true
    };

    const account  =  FakeDatabase.setAccount({ID: "234FA"});

    expect(account).toEqual(accountExpected);
})

test("Check set without ID account", () => {
    FakeDatabase.init();

    const account  =  FakeDatabase.setAccount();

    expect(account).toBeUndefined();
})