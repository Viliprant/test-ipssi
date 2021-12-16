import { connect, register } from "./utilities/callerAPI.js"

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
    describe("Check Registration", () => {
        // Compte correct.
        // @return : ID, email et isAdmin.
        test("Valid Credentials", async () => {
            const newAccount = {
                email: "sayf.bejaoui@ipssi.net",
                prenom: "Sayf",
                nom: "Bejaoui",
                mdp: "huhu"
            };
            try {
                const response = await register(newAccount);
                expect(response.status).toBe(200);
            }
            catch (e) {
                console.log(e);
            }
        });

        // Compte déjà existant.
        // @return : message d'erreur.
        test("Account Already Existing", async () => {
            const newAccount = {
                email: "sarah.pinto@ipssi.net",
                prenom: "Sarah",
                nom: "PINTO",
                mdp: "bégé",
                isAdmin: true
            };
            try {
                const response = await register(newAccount);
            }
            catch (e) {
                expect(e.response.status).toBe(400);
            }
        });
    });
});
