function initNavigation() {
// On sélectionne tous les liens de la navigation
    const links = document.querySelectorAll('nav a');
    const loader = document.getElementById('loader-overlay');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            // 1. On empêche le lien de s'ouvrir immédiatement
            event.preventDefault();

            // 2. On récupère l'adresse de destination
            const destination = this.href;

            // 3. On affiche le loader
            loader.style.display = 'flex';

            // 4. On attend 2 secondes (2000ms) avant de rediriger
            setTimeout(() => {
                window.location.href = destination;
            }, 2000);
        });
    });
}

function addSegments(digitId){
    let chiffre = document.querySelector(digitId);

    for (let i = 0; i < 7; i++) {
        let segmentDiv = document.createElement("div");
        // On crée chaque barre avec la classe 'off' (éteinte) par défaut
        segmentDiv.classList.add("segment", "off");
        segmentDiv.classList.add("segment" + i);
        chiffre.appendChild(segmentDiv);
    }
}

function updateDigit(digitId, value){
    // Modèles d'allumage pour les chiffres de 0 à 9
    let segmentStates = [
        [1, 1, 1, 0, 1, 1, 1],
        [0, 0, 1, 0, 0, 1, 0],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0, 1, 0],
        [1, 1, 0, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 1, 1]
    ];

    let status = segmentStates[value];
    let chiffre = document.querySelector(digitId);
    let segments = chiffre.querySelectorAll(".segment");

    segments.forEach(function(segment, index) {
        // Si le tableau indique 1, on affiche le segment en retirant 'off'
        if (status[index] === 1) {
            segment.classList.remove("off");
        }
        else {
            segment.classList.add("off");
        }
    });
}



function Time(){
    // Récupere l'heure actuelle
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Affichage des chiffres de l'heure
    updateDigit("#hours-tens", Math.floor(hours / 10));
    updateDigit("#hours-units", hours % 10);
    updateDigit("#minutes-tens", Math.floor(minutes / 10));
    updateDigit("#minutes-units", minutes % 10);
}

function init(){
    // Création des 4 emplacements de l'horloge
    addSegments("#hours-tens");
    addSegments("#hours-units");
    addSegments("#minutes-tens");
    addSegments("#minutes-units");
}

let startTime = Date.now();

function chrono() {
    let now = Date.now();
    let diff = now - startTime;

    let totalseconds = Math.floor(diff / 1000);
    let minutes = Math.floor(totalseconds / 60);
    let seconds = totalseconds % 60; 
    
    let displayMinutes = String(minutes).padStart(2, "0");
    let displaySeconds = String(seconds).padStart(2, "0");

    document.querySelector("#chrono").textContent = displayMinutes + ":" + displaySeconds;
}

function main() {
    // 1. Initialise l'horloge et le chrono
    init(); 
    Time();
    chrono();

    // 2. Initialise le système de chargement des liens
    initNavigation();

    // 3. Gère la disparition du loader quand on ARRIVE sur la page
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader-overlay');
        if (loader) {
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500); // On cache le loader après 0.5s de présence
        }
    });

    // 4. Lance les répétitions
    setInterval(Time, 1000);
    setInterval(chrono, 1000);
}

main();