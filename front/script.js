const loginDOM = document.querySelector("#login");
const emailDOM = document.querySelector("#email");
const mdpDOM = document.querySelector("#mdp");
const formDOM = document.querySelector("#login");

async function connect(email, mdp) {
    const credentials = { email, mdp };
    const response = await axios.post("http://localhost:3000/account/authentification", credentials);
    return response;
}

async function register({ email, prenom, nom, mdp }) {
    const newAccount = { email, prenom, nom, mdp };
    const response = await axios.post("http://localhost:3000/account/", newAccount);
    return response;
}

function ifAdmin({ prenom, nom }) {
    const gingerBread = `<svg class="gingerbread" width="200" height="200" viewBox="-100 -100 200 200">
        <circle class="body" cx="0" cy="-50" r="30" />
    
        <circle class="eye" cx="-12" cy="-55" r="3" />
        <circle class="eye" cx="12" cy="-55" r="3" />
        <rect class="mouth" x="-10" y="-40" width="20" height="5" rx="2" />
    
        <line class="limb" x1="-40" y1="-10" x2="40" y2="-10" />
        <line class="limb" x1="-25" y1="50" x2="0" y2="-15" />
        <line class="limb" x1="25" y1="50" x2="0" y2="-15" />
    
        <circle class="button" cx="0" cy="-10" r="5" />
        <circle class="button" cx="0" cy="10" r="5" />
    </svg>`;

    const belt = `<svg class="belt" width="137" height="137" viewBox="-100 -100 200 200">
        <g stroke="black" stroke-width="2">
            <circle cx="0" cy="-45" r="7" fill="#4F6D7A" />
            <circle cx="0" cy="50" r="10" fill="#F79257" />
            <path
                d="
                M -50 40
                L -50 50
                L 50 50
                L 50 40
                Q 40 40 40 10
                C 40 -60 -40 -60 -40 10   
                Q -40 40 -50 40"
                fill="#FDEA96"
            />
        </g>
    </svg>`;

    formDOM.innerHTML = `<div style="font-size: 1.1rem" >
            Bonjour, <span style="font-weight: bold;">${prenom} ${nom}</span>
            ${gingerBread}
            ${belt}
        </div>`;
}

function ifNotAdmin({ prenom, nom }) {
    formDOM.innerHTML = `<div style="font-size: 1.1rem" >
        Bonjour, <span style="font-weight: bold;">${prenom} ${nom}</span>
    </div>`;
}

function ifInvalidCredentials() {
    formDOM.innerHTML = `<div style="font-size: 1.1rem" >Kézako</div>`;
}

loginDOM.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    try {
        const response = await connect(emailDOM.value, mdpDOM.value);
        const account = response.data;
        if (account.isAdmin) {
            ifAdmin(account)
        }
        else {
            ifNotAdmin(account)
        }
    } catch (error) {
        console.log(error);
        ifInvalidCredentials()
    }
})