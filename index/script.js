window.addEventListener('load', () => {
    const loader = document.getElementById('loader-overlay');
    if (loader) {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

function logAndChangeStyle(element) {
    const styleAvant = window.getComputedStyle(element);
    const ancienneCouleur = styleAvant.backgroundColor;

    element.classList.add('nav-active');

    const styleApres = window.getComputedStyle(element);
    const nouvelleCouleur = styleApres.backgroundColor;

    console.log(`Changement de style : L'ancienne couleur était "${ancienneCouleur}" et la nouvelle couleur est "${nouvelleCouleur}".`);
}

function handleUserInputErrors(error, context) {
    console.error(`[Erreur Utilisateur - ${context}] : ${error}`);
}

function initPlagiarismWarning() {
    document.addEventListener('copy', () => {
        console.warn("--- ALERTE PLAGIAT ---");
        console.warn("Rappel : Tout contenu copié sur ce site (Trackwear) reste la propriété intellectuelle de l'entreprise. Toute reproduction sans citation est strictement interdite.");
    });
}

function initNavigation() {
    const links = document.querySelectorAll('nav a');
    const loader = document.getElementById('loader-overlay');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const destination = this.href;

            logAndChangeStyle(this);

            if (this.classList.contains('confirm-nav')) {
                let choix = confirm("Souhaitez-vous vraiment naviguer vers la présentation de l'équipe ?");
                if (!choix) {
                    this.classList.remove('nav-active');
                    return;
                }
            }

            if (loader) {
                loader.style.display = 'flex';
            }

            setTimeout(() => {
                window.location.href = destination;
            }, 2000);
        });
    });
}

function addSegments(digitId) {
    let chiffre = document.querySelector(digitId);
    if (!chiffre) return;
    for (let i = 0; i < 7; i++) {
        let segmentDiv = document.createElement("div");
        segmentDiv.classList.add("segment", "off");
        segmentDiv.classList.add("segment" + i);
        chiffre.appendChild(segmentDiv);
    }
}

function updateDigit(digitId, value) {
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
            segment.classList.remove("off");
        } else {
            segment.classList.add("off");
        }
    });
}

function updateTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    updateDigit("#hours-tens", Math.floor(hours / 10));
    updateDigit("#hours-units", hours % 10);
    updateDigit("#minutes-tens", Math.floor(minutes / 10));
    updateDigit("#minutes-units", minutes % 10);
}

let startTime = Date.now();

function updateChrono() {
    let now = Date.now();
    let diff = now - startTime;
    let totalSeconds = Math.floor(diff / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60; 
    let displayMinutes = String(minutes).padStart(2, "0");
    let displaySeconds = String(seconds).padStart(2, "0");
    let chronoElement = document.querySelector("#chrono");
    if (chronoElement) {
        chronoElement.textContent = displayMinutes + ":" + displaySeconds;
    }
}

function initFooterPhoneEvents() {
    let phoneNumbers = document.querySelectorAll('.phone-number');
    let ringtone = document.getElementById('ringtone');
    phoneNumbers.forEach(phone => {
        phone.addEventListener('copy', () => {
            let numCopie = window.getSelection().toString().trim();
            setTimeout(() => {
                let confirmation = prompt(`Si vous voulez appeler ce numéro : ${numCopie}, entrez-le de nouveau dans le champ ci-dessous puis validez`);
                
                if (confirmation === null) return;

                if (confirmation === numCopie) {
                    console.log(`Vous appelez ce numéro : ${numCopie}`);
                    if (ringtone) {
                        ringtone.play();
                        setTimeout(() => {
                            ringtone.pause();
                            ringtone.currentTime = 0;
                        }, 5000);
                    }
                } else {
                    handleUserInputErrors("Le numéro saisi ne correspond pas au numéro copié.", "Vérification Appel");
                    alert("Erreur : Saisie incorrecte.");
                }
            }, 100);
        });
    });
}

function main() {
    addSegments("#hours-tens");
    addSegments("#hours-units");
    addSegments("#minutes-tens");
    addSegments("#minutes-units");
    updateTime();
    updateChrono();
    initNavigation();
    initFooterPhoneEvents();
    initPlagiarismWarning();
    setInterval(updateTime, 1000);
    setInterval(updateChrono, 1000);
}

main();