import { connect } from "./utilities/callerAPI.js"

describe("Check Front Functions", () => {
    describe("Check Authentification", () => {
        // Correct Account.
        // @return : ID, email et isAdmin.
        test("Valid Credentials", async () => {
            const email = "bastien.ederhy@ipssi.net";
            const mdp = "hehe";
            try {
                const response = await connect(email, mdp);
                expect(response.status).toBe(200);
            }
            catch (e) {
                console.log(e);
            }
        });

        // Incorrect Account.
        // @return : message d'erreur.
        test("Invalid Credentials", async () => {
            const email = "bastien.ederhy@ipssi.net";
            const mdp = "wrongPassword";
            try {
                await connect(email, mdp);
            }
            catch (e) {
                expect(e.response.status).toBe(400);
            }
        });
    });
});
