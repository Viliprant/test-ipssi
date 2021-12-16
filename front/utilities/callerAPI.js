import { get, post, put } from "axios";

function testString() {
    return 'test'
}

async function connect(email, mdp) {
    const response = await get("http://localhost:3000/account", {
        headers: {
            isAdmin: true
        }
    })

    return 'test'
}


export {
    testString
}