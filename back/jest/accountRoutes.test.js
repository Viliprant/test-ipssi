import { get, post, put } from "axios";

test('Account Route - Check valid authority', (done) => {
    get("http://localhost:3000/account/all", {
        headers: {
            isadmin: true
        }
    }).then(response => {
        expect(response.status).toEqual(200);
        done()
    })
});

test('Account Route - Check blank authority', (done) => {
    get("http://localhost:3000/account/all", {
        headers: {
            // No admin property
        }
    }).catch((e) => {
        expect(e.response.status).toEqual(403);
        done()
    })
});

test('Account Route - Check invalid authority', (done) => {
    get("http://localhost:3000/account/all", {
        headers: {
            isadmin: false
        }
    }).catch((e) => {
        expect(e.response.status).toEqual(403);
        done()
    })
});

test('Account Route - Check add account', (done) => {
    const newAccount = {
        "prenom": "Sayf",
        "nom": "BEJAOUI",
        "mdp": "prof",
        "isAdmin": true
    }

    const response = post("http://localhost:3000/account", newAccount)
        .then((response) => {
            expect(response.status).toEqual(200);
            done()
        })
});

test('Account Route - Check add wrong account', (done) => {
    post("http://localhost:3000/account", {})
        .catch((e) => {
            expect(e.response.status).toEqual(400);
            done()
        })
});

test('Account Route - Check get', (done) => {
    const selectedID = "1234FA";

    const expectedAccount = {
        ID: "1234FA",
        prenom: "Sarah",
        nom: "PINTO",
        isAdmin: true
    }

    get(`http://localhost:3000/account/${selectedID}`)
        .then(response => {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(expectedAccount);
            done()
        })
});

test('Account Route - Check get wrong ID', (done) => {
    const selectedID = "1234FAA";

    get(`http://localhost:3000/account/${selectedID}`)
        .catch(e => {
            expect(e.response.status).toEqual(400);
            done()
        })
});

test('Account Route - Check put', (done) => {
    const selectedID = {
        ID: "1234FA"
    }

    const expectedAccount = {
        ID: "1234FA",
        prenom: "Sarah",
        nom: "PINTO",
        isAdmin: true
    }

    put(`http://localhost:3000/account/`, selectedID)
        .then(response => {
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(expectedAccount);
            done()
        })
});

test('Account Route - Check put wrong ID', (done) => {
    const selectedID = {
        ID: "1234FAAA"
    }

    put(`http://localhost:3000/account`)
        .catch(e => {
            expect(e.response.status).toEqual(400);
            done()
        })
});