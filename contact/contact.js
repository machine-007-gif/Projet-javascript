function initFormValidation() {
    const nom = document.getElementById('nom');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const btn = document.getElementById('btn-envoyer');

    const errorNom = document.getElementById('error-nom');
    const errorEmail = document.getElementById('error-email');
    const errorMessage = document.getElementById('error-message');

    function validerNom(val) {
        const mots = val.trim().split(/\s+/);
        return mots.length >= 2 && mots[0].length > 0 && mots[1].length > 0;
    }

    function validerEmail(val) {
        return val.includes('@') && val.includes('.');
    }

    function validerMessage(val) {
        return val.trim().length >= 20 && val.trim().length <= 1000;
    }

    function verifierTout() {
        const nomOk = validerNom(nom.value);
        const emailOk = validerEmail(email.value);
        const msgOk = validerMessage(message.value);

        // Messages d'erreur
        errorNom.textContent = nom.value && !nomOk
            ? "Entrez un prénom et un nom séparés par un espace." : "";

        errorEmail.textContent = email.value && !emailOk
            ? "L'email doit contenir un @ et un point." : "";

        errorMessage.textContent = message.value && !msgOk
            ? `Message : 20 caractères minimum, 1000 maximum (actuellement ${message.value.trim().length}).` : "";

        btn.disabled = !(nomOk && emailOk && msgOk);
    }

    nom.addEventListener('input', verifierTout);
    email.addEventListener('input', verifierTout);
    message.addEventListener('input', verifierTout);

    btn.addEventListener('click', () => lancerJeu());
}

// --- JEU : Calcul mental contre la montre ---
function lancerJeu() {
    const overlay = document.getElementById('game-overlay');
    const instruction = document.getElementById('game-instruction');
    const gameArea = document.getElementById('game-area');
    const result = document.getElementById('game-result');

    overlay.style.display = 'flex';
    result.textContent = '';

    // Génère une question de calcul simple
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const bonneReponse = a + b;

    // Génère 3 mauvaises réponses
    let choix = [bonneReponse];
    while (choix.length < 4) {
        let faux = bonneReponse + Math.floor(Math.random() * 6) - 3;
        if (faux !== bonneReponse && faux > 0 && !choix.includes(faux)) {
            choix.push(faux);
        }
    }
    // Mélange les choix
    choix.sort(() => Math.random() - 0.5);

    instruction.textContent = `Réponds correctement pour envoyer ton message : combien font ${a} + ${b} ?`;
    gameArea.innerHTML = '';

    choix.forEach(val => {
        const btn = document.createElement('button');
        btn.textContent = val;
        btn.addEventListener('click', () => {
            if (val === bonneReponse) {
                // Victoire
                result.style.color = 'green';
                result.textContent = '✅ Bonne réponse ! Message envoyé !';
                setTimeout(() => {
                    overlay.style.display = 'none';
                    document.getElementById('nom').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('message').value = '';
                    document.getElementById('btn-envoyer').disabled = true;
                    alert("✅ Votre message a bien été envoyé !");
                }, 1500);
            } else {
                // Défaite
                result.style.color = 'red';
                result.textContent = '❌ Mauvaise réponse ! Le formulaire a été réinitialisé.';
                setTimeout(() => {
                    overlay.style.display = 'none';
                    document.getElementById('nom').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('message').value = '';
                    document.getElementById('btn-envoyer').disabled = true;
                }, 1500);
            }
        });
        gameArea.appendChild(btn);
    });
}

function main() {
    initFormValidation();
}

main();