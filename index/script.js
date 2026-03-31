// --- ÉCRAN DE CHARGEMENT ---
// Cache le loader quand toute la page (images comprises) a fini de charger
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-overlay');
    if (loader) {
        setTimeout(() => {
            loader.style.display = 'none'; // On attend 0.5s pour que ce soit fluide
        }, 500);
    }
});

// --- ANALYSE DU STYLE ---
// Regarde la couleur d'un bouton avant et après avoir cliqué dessus
function logAndChangeStyle(element) {
    const styleAvant = window.getComputedStyle(element);
    const ancienneCouleur = styleAvant.backgroundColor;

    element.classList.add('nav-active'); // On ajoute la classe

    // On attend un tout petit peu (0ms suffit souvent) pour laisser le navigateur 
    // appliquer le style avant de lire la nouvelle couleur
    setTimeout(() => {
        const styleApres = window.getComputedStyle(element);
        const nouvelleCouleur = styleApres.backgroundColor;
        console.log(`Changement réel : ${ancienneCouleur} -> ${nouvelleCouleur}`);
    }, 10); 
}

// --- GESTION DES ERREURS ---
// Affiche proprement les erreurs dans la console du navigateur
function handleUserInputErrors(error, context) {
    console.error(`[Erreur - ${context}] : ${error}`);
}

// --- PROTECTION DU CONTENU ---
// Prévient l'utilisateur dans la console s'il essaie de copier du texte
function initPlagiarismWarning() {
    document.addEventListener('copy', () => {
        console.warn("--- ALERTE PLAGIAT : Ce contenu appartient à Trackwear ---");
    });
}

// --- NAVIGATION ---
// Gère les clics sur le menu et l'animation de transition
function initNavigation() {
    const links = document.querySelectorAll('nav a, .nav-link');
    const loader = document.getElementById('loader-overlay');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // On stoppe le changement de page immédiat
            const destination = this.href;

            logAndChangeStyle(this); // On applique l'effet visuel sur le lien

            // Fenêtre de confirmation si on clique sur "Notre Équipe"
            if (this.classList.contains('confirm-nav')) {
                let choix = confirm("Aller vers la présentation de l'équipe ?");
                if (!choix) {
                    this.classList.remove('nav-active');
                    return; // On annule tout si l'utilisateur dit "Non"
                }
            }

            // Affiche le loader noir/blanc avant de partir
            if (loader) {
                loader.style.display = 'flex';
            }

            // On attend 2 secondes pour montrer l'animation de chargement
            setTimeout(() => {
                window.location.href = destination;
            }, 2000);
        });
    });
}

// --- HORLOGE DIGITALE ---
// Crée les 7 petites barres pour fabriquer un chiffre (comme sur une calculette)
function addSegments(digitId) {
    let chiffre = document.querySelector(digitId);
    if (!chiffre) return;
    for (let i = 0; i < 7; i++) {
        let segmentDiv = document.createElement("div");
        segmentDiv.classList.add("segment", "off"); // Éteint par défaut
        segmentDiv.classList.add("segment" + i);
        chiffre.appendChild(segmentDiv);
    }
}

// Allume ou éteint les barres pour dessiner le bon chiffre (0, 1, 2...)
function updateDigit(digitId, value) {
    // Liste des segments à allumer (1) ou éteindre (0) pour chaque chiffre
    let segmentStates = [
        [1, 1, 1, 0, 1, 1, 1], [0, 0, 1, 0, 0, 1, 0], [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1], [0, 1, 1, 1, 0, 1, 0], [1, 1, 0, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1], [1, 0, 1, 0, 0, 1, 0], [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 1, 1]
    ];
    let status = segmentStates[value];
    let chiffre = document.querySelector(digitId);
    if (!chiffre) return;
    let segments = chiffre.querySelectorAll(".segment");
    segments.forEach((segment, index) => {
        if (status[index] === 1) {
            segment.classList.remove("off"); // Allume le segment
        } else {
            segment.classList.add("off");    // Éteint le segment
        }
    });
}

// Récupère l'heure de l'ordinateur et met à jour l'affichage
function updateTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    updateDigit("#hours-tens", Math.floor(hours / 10)); // Dizaines d'heures
    updateDigit("#hours-units", hours % 10);            // Unités d'heures
    updateDigit("#minutes-tens", Math.floor(minutes / 10)); // Dizaines de minutes
    updateDigit("#minutes-units", minutes % 10);            // Unités de minutes
}

// --- CHRONOMÈTRE ---
let startTime = Date.now(); // Enregistre le moment où on arrive sur le site
function updateChrono() {
    let now = Date.now();
    let diff = now - startTime;
    let totalSeconds = Math.floor(diff / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60; 
    let chronoElement = document.querySelector("#chrono");
    if (chronoElement) {
        // Formate en "00:00"
        chronoElement.textContent = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    }
}

// --- INTERACTIONS TÉLÉPHONE ---
// Joue une sonnerie si on copie un numéro de téléphone dans le footer
function initFooterPhoneEvents() {
    let phoneNumbers = document.querySelectorAll('.phone-number');
    let ringtone = document.getElementById('ringtone');
    phoneNumbers.forEach(phone => {
        phone.addEventListener('copy', () => {
            let numCopie = window.getSelection().toString().trim();
            setTimeout(() => {
                let confirmation = prompt(`Confirmez le numéro pour appeler : ${numCopie}`);
                
                if (confirmation === numCopie) {
                    console.log(`Appel en cours...`);
                    if (ringtone) {
                        ringtone.play(); // Joue le son "alastor"
                        setTimeout(() => { 
                            ringtone.pause(); 
                            ringtone.currentTime = 0; 
                        }, 5000); // Stop après 5 secondes
                    }
                } else if (confirmation !== null) {
                    handleUserInputErrors("Saisie incorrecte.", "Appel");
                    alert("Erreur : le numéro ne correspond pas.");
                }
            }, 100);
        });
    });
}

// --- LANCEMENT GÉNÉRAL ---
function main() {
    // 1. On prépare les chiffres de l'horloge
    addSegments("#hours-tens");
    addSegments("#hours-units");
    addSegments("#minutes-tens");
    addSegments("#minutes-units");
    
    // 2. On lance les fonctions une première fois
    updateTime();
    updateChrono();
    initNavigation();
    initFooterPhoneEvents();
    initPlagiarismWarning();
    
    // 3. On demande au site de se mettre à jour toutes les secondes (1000ms)
    setInterval(updateTime, 1000);
    setInterval(updateChrono, 1000);
}

// Déclenchement du script
main();