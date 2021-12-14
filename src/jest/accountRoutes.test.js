const axios = require("axios")

test('Account Route - Check valid authority', async () => {
    const response = await axios.get("http://localhost:3000/account/all", {
        headers: {
            isadmin: true
        }
    })

    expect(response.status).toEqual(200);
});

test('Account Route - Check blank authority', async () => {
    let err = null;
    await axios.get("http://localhost:3000/account/all", {
        headers: {
            // No admin property
        }
    }).catch((e) => {
        err = e;
    })

    expect(err.response.status).toEqual(403);
});

test('Account Route - Check invalid authority', async () => {
    await axios.get("http://localhost:3000/account/all", {
        headers: {
            isadmin: false
        }
    }).catch((e) => {
        err = e;
    })

    expect(err.response.status).toEqual(403);
});

test('Account Route - Check add account', async () => {
    const newAccount = {
        "prenom": "Sayf",
        "nom": "BEJAOUI",
        "mdp": "prof",
        "isAdmin": true
    }

    const response = await axios.post("http://localhost:3000/account", newAccount)

    expect(response.status).toEqual(200);
});

test('Account Route - Check add wrong account', async () => {
    let err = null

    const response = await axios.post("http://localhost:3000/account", {})
        .catch((e) => {
            err = e;
        })

    expect(err.response.status).toEqual(400);
});

test('Account Route - Check get', async () => {
    const selectedID = "1234FA";

    const expectedAccount = {
        ID: "1234FA",
        prenom: "Sarah",
        nom: "PINTO",
        isAdmin: true
    }

    const response = await axios.get(`http://localhost:3000/account/${selectedID}`)

    console.log(response.data);

    expect(response.status).toEqual(200);
    expect(response.data).toEqual(expectedAccount);
});

test('Account Route - Check get wrong ID', async () => {
    const selectedID = "1234FAA";

    let err = null;

    const response = await axios.get(`http://localhost:3000/account/${selectedID}`)
        .catch(e => err = e)

    console.log(response.data);

    expect(err.response.status).toEqual(400);
});

test('Account Route - Check put', async () => {
    const selectedID = {
        ID: "1234FA"
    }

    const expectedAccount = {
        ID: "1234FA",
        prenom: "Sarah",
        nom: "PINTO",
        isAdmin: true
    }

    const response = await axios.put(`http://localhost:3000/account/`, selectedID)

    console.log(response.data);

    expect(response.status).toEqual(200);
    expect(response.data).toEqual(expectedAccount);
});

test('Account Route - Check put wrong ID', async () => {
    const selectedID = {
        ID: "1234FAAA"
    }

    let err = null;

    const response = await axios.put(`http://localhost:3000/account`)
        .catch(e => err = e)

    console.log(response.data);

    expect(err.response.status).toEqual(400);
});