import { get, post, put } from "axios";

describe("Check Account Route", () => {
    describe("Check Route Get All (/all)", () => {
        // Vérification de l'accès à la route All si [isAdmin] vaut true.
        // @return : Accès autorisé.
        test('Check valid authority', (done) => {
            get("http://localhost:3000/account/all", {
                headers: {
                    isAdmin: true
                }
            }).then(response => {
                expect(response.status).toEqual(200);
                done()
            })
        });

        // Vérification de l'accès à la route All si [isAdmin] vaut false
        // @return : Accès refusé.
        test('Check invalid authority', (done) => {
            get("http://localhost:3000/account/all", {
                headers: {
                    isadmin: false
                }
            }).catch((e) => {
                expect(e.response.status).toEqual(403);
                done()
            })
        });

        // Vérification de l'accès à la route All si [isAdmin] n'ont renseigné.
        // @return : Accès refusé.
        test('Check blank authority', (done) => {
            get("http://localhost:3000/account/all", {
                headers: {
                    // No admin property
                }
            }).catch((e) => {
                expect(e.response.status).toEqual(403);
                done()
            })
        });
    })

    describe("Check Route Add Account (/account)", () => {
        // Ajout d'un nouveau compte.
        // @return : Account ajouté et test d'un code http 200.
        test('Check add account', (done) => {
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

        // Ajout d'un compte sans paramètres.
        // @return : message d'erreur et code http 400 
        test('Check add wrong account', (done) => {
            post("http://localhost:3000/account", {})
                .catch((e) => {
                    expect(e.response.status).toEqual(400);
                    done()
                })
        });
    })

    describe("Check Route Get Account (/account/:accountID)", () => {
        // Récupération d'un compte.
        // @return : Account attendu et code http 200.
        test('Check get account', (done) => {
            const selectedID = "1234FA";

            const expectedAccount = {
                ID: "1234FA",
                email: "sarah.pinto@ipssi.net",
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

        // Récupération d'un compte avec ID incorrect.
        // @return : message d'erreur et code http 400 
        test('Check get wrong ID', (done) => {
            const selectedID = "1234FAA";

            get(`http://localhost:3000/account/${selectedID}`)
                .catch(e => {
                    expect(e.response.status).toEqual(400);
                    done()
                })
        });
    })

    describe("Check Route Put Account (/account/:accountID)", () => {
        // Modifcation d'un compte.
        // @return : Account attendu et code http 200.
        test('Check put account', (done) => {
            const selectedID = {
                ID: "1234FA"
            }

            const expectedAccount = {
                ID: "1234FA",
                email: "sarah.pinto@ipssi.net",
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

        // Modifcation d'un compte avec ID incorrect.
        // @return : message d'erreur et code http 400.
        test('Check put wrong ID', (done) => {
            const selectedID = {
                ID: "1234FAAA"
            }

            put(`http://localhost:3000/account`)
                .catch(e => {
                    expect(e.response.status).toEqual(400);
                    done()
                })
        });
    })
})