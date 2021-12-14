const axios = require("axios")

test('Check valid authority', async () => {
    const response = await axios.get("http://localhost:3000/accounts", {
        headers: {
            isadmin: true
        }
    })

    expect(response.status).toEqual(200);
});

test('Check blank authority', async () => {
    const response = await axios.get("http://localhost:3000/accounts", {
        headers: {
            // No admin property
        }
    }).catch((err) => {
        console.log(err);
        expect(err.response.status).toEqual(403);
    })
});

test('Check invalid authority', async () => {
    const response = await axios.get("http://localhost:3000/accounts", {
        headers: {
            isadmin: false
        }
    }).catch((err) => {
        console.log(err);
        expect(err.response.status).toEqual(403);
    })
});