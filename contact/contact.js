// Fichier contact.js : Gère le formulaire de contact avec validation en temps réel
// Inclut aussi un mini-jeu pierre-papier-ciseaux pour valider l'envoi du message

function initFormValidation() {
    const nom = document.getElementById('nom');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const btn = document.getElementById('btn-envoyer');

    const errorNom = document.getElementById('error-nom');
    const errorEmail = document.getElementById('error-email');
    const errorMessage = document.getElementById('error-message');

    // ===== VALIDATION =====
    // Vérifie que le nom a au moins 2 mots séparés par un espace
    function validerNom(val) {
        // Doit avoir 2 mots séparés par un espace
        const mots = val.trim().split(/\s+/);
        return mots.length >= 2 && mots[0].length > 0 && mots[1].length > 0;
    }

    // Vérifie que l'email contient un @ et un point
    function validerEmail(val) {
        return val.includes('@') && val.includes('.');
    }

    // Vérifie que le message fait entre 20 et 1000 caractères
    function validerMessage(val) {
        const length = val.trim().length;
        return length >= 20 && length <= 1000;
    }

    // ===== VÉRIFICATION EN TEMPS RÉEL =====
    // Contrôle le formulaire et affiche les erreurs pendant que l'utilisateur tape
    function verifierTout() {
        const nomOk = validerNom(nom.value);
        const emailOk = validerEmail(email.value);
        const msgOk = validerMessage(message.value);

        // Affiche les erreurs
        if (nom.value && !nomOk) {
            errorNom.textContent = "⚠ Entrez un prénom et un nom séparés par un espace";
        } else {
            errorNom.textContent = "";
        }

        if (email.value && !emailOk) {
            errorEmail.textContent = "⚠ L'email doit contenir un @ et un point";
        } else {
            errorEmail.textContent = "";
        }

        if (message.value && !msgOk) {
            const length = message.value.trim().length;
            if (length < 20) {
                errorMessage.textContent = `⚠ Minimum 20 caractères (actuellement ${length})`;
            } else if (length > 1000) {
                errorMessage.textContent = `⚠ Maximum 1000 caractères (actuellement ${length})`;
            }
        } else {
            errorMessage.textContent = "";
        }

        // Active/désactive le bouton
        btn.disabled = !(nomOk && emailOk && msgOk);
    }

    // ===== ÉCOUTEURS D'ÉVÉNEMENTS =====
    nom.addEventListener('input', verifierTout);
    email.addEventListener('input', verifierTout);
    message.addEventListener('input', verifierTout);

    btn.addEventListener('click', () => lancerJeu());
}

// ===== JEU PIERRE-PAPIER-CISEAUX =====
// Lance le mini-jeu pour valider l'envoi du formulaire
function lancerJeu() {
    const overlay = document.getElementById('game-overlay');
    const instruction = document.getElementById('game-instruction');
    const gameArea = document.getElementById('game-area');
    const result = document.getElementById('game-result');

    // Afficher l'overlay
    overlay.classList.add('open');
    result.textContent = '';

    // Les choix du jeu
    const choix = ['🪨', '📄', '✂️'];
    const nomChoix = ['Pierre', 'Papier', 'Ciseaux'];

    instruction.textContent = 'Choisis : Pierre, Papier ou Ciseaux !';
    gameArea.innerHTML = '';

    // Crée les 3 boutons de choix
    choix.forEach((emoji, index) => {
        const btn = document.createElement('button');
        btn.textContent = emoji;
        btn.title = nomChoix[index];
        btn.style.fontSize = '32px';
        
        btn.addEventListener('click', () => {
            jouerCentre(index, choix, nomChoix, instruction, gameArea, result, overlay);
        });
        
        gameArea.appendChild(btn);
    });
}

function jouerCentre(choixJoueur, choix, nomChoix, instruction, gameArea, result, overlay) {
    // L'ordinateur choisit aléatoirement
    const choixOrdi = Math.floor(Math.random() * 3);

    // Désactiver les boutons pendant le délai
    const boutons = gameArea.querySelectorAll('button');
    boutons.forEach(btn => btn.disabled = true);

    // Attendre 1 seconde avant de montrer le résultat
    setTimeout(() => {
        instruction.textContent = `Toi : ${nomChoix[choixJoueur]} ${choix[choixJoueur]} vs Ordi : ${nomChoix[choixOrdi]} ${choix[choixOrdi]}`;

        // Déterminer le gagnant
        let gagne = false;
        let message = '';

        if (choixJoueur === choixOrdi) {
            // Égalité - relancer
            message = '🤝 Égalité ! Essaie encore !';
            result.style.color = '#999';
            result.textContent = message;

            setTimeout(() => {
                gameArea.innerHTML = '';
                choix.forEach((emoji, index) => {
                    const btn = document.createElement('button');
                    btn.textContent = emoji;
                    btn.title = nomChoix[index];
                    btn.style.fontSize = '32px';
                    
                    btn.addEventListener('click', () => {
                        jouerCentre(index, choix, nomChoix, instruction, gameArea, result, overlay);
                    });
                    
                    gameArea.appendChild(btn);
                });
            }, 1500);
            return;
        }

        // Pierre bat Ciseaux
        if (choixJoueur === 0 && choixOrdi === 2) {
            gagne = true;
        }
        // Papier bat Pierre
        else if (choixJoueur === 1 && choixOrdi === 0) {
            gagne = true;
        }
        // Ciseaux bat Papier
        else if (choixJoueur === 2 && choixOrdi === 1) {
            gagne = true;
        }

        if (gagne) {
            // ✅ VICTOIRE
            result.style.color = '#22b14c';
            result.textContent = '✅ Tu as gagné ! Message envoyé.';
            
            setTimeout(() => {
                overlay.classList.remove('open');
                // Réinitialise le formulaire
                document.getElementById('nom').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
                document.getElementById('btn-envoyer').disabled = true;
                // Efface les messages d'erreur
                document.getElementById('error-nom').textContent = '';
                document.getElementById('error-email').textContent = '';
                document.getElementById('error-message').textContent = '';
                
                alert("✅ Votre message a été envoyé avec succès !");
            }, 1800);
        } else {
            // ❌ DÉFAITE
            result.style.color = '#ff3b00';
            result.textContent = '❌ L\'ordinateur gagne. Formulaire réinitialisé.';
            
            setTimeout(() => {
                overlay.classList.remove('open');
                // Réinitialise le formulaire
                document.getElementById('nom').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
                document.getElementById('btn-envoyer').disabled = true;
                // Efface les messages d'erreur
                document.getElementById('error-nom').textContent = '';
                document.getElementById('error-email').textContent = '';
                document.getElementById('error-message').textContent = '';
            }, 1800);
        }
    }, 1000);
}

// ===== FERMETURE DU JEU =====
// Permet de fermer le jeu avec la touche Échap ou en cliquant à côté
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('game-overlay').classList.remove('open');
    }
});

// Fermer en cliquant en dehors
document.getElementById('game-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'game-overlay') {
        document.getElementById('game-overlay').classList.remove('open');
    }
});

// ===== INITIALISATION =====
function main() {
    initFormValidation();
}

main();