import { get, post, put } from "axios";

async function connect(email, mdp) {
    const credentials = { email, mdp };
    const response = await post("http://localhost:3000/account/authentification", credentials);
    return response;
}

export {
    connect
}