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

function init(){
    // Création des 4 emplacements de l'horloge
    addSegments("#hours-tens");
    addSegments("#hours-units");
    addSegments("#minutes-tens");
    addSegments("#minutes-units");

    // Affichage d'une heure de test : 22:40
    updateDigit("#hours-tens", 2);
    updateDigit("#hours-units", 2);
    updateDigit("#minutes-tens", 4);
    updateDigit("#minutes-units", 0);
}

function main(){
    init();
}

main();