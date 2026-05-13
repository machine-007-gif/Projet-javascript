// Fichier acceuil.js : Gère l'animation du slogan sur la page d'accueil
// Les mots s'affichent un par un avec un effet de fondu

function initSloganAnimation() {
    // On récupère l'élément HTML où le texte va s'afficher
    let sloganElement = document.getElementById('slogan-animated');
    
    // Sécurité : si l'élément n'existe pas sur la page, on arrête tout
    if (!sloganElement) return;

    let fullText = "Pour que leurs seules traces soient celles dans le sable.";
    
    // On transforme la phrase en une liste de mots (en coupant aux espaces)
    let words = fullText.split(" "); 

    // Fonction qui gère un cycle complet de l'animation
    function runCycle() {
        // On vide le contenu au début du cycle
        sloganElement.innerHTML = "";
        // On retire l'animation de mouvement final pour la réinitialiser
        sloganElement.classList.remove('animate-move');
        
        let index = 0;

        // Fonction interne pour afficher les mots un par un
        function showNextWord() {
            // Si il reste des mots à afficher dans la liste
            if (index < words.length) {
                // Création d'une balise <span> pour le mot actuel
                let span = document.createElement('span');
                span.innerHTML = words[index] + " "; 
                span.className = 'word'; // On lui donne la classe CSS 'word'
                sloganElement.appendChild(span);

                // Petit délai pour que le CSS puisse déclencher l'effet d'apparition
                setTimeout(() => {
                    span.classList.add('visible');
                }, 50);

                index++;
                // On attend 1 seconde avant d'appeler le mot suivant (récursivité)
                setTimeout(showNextWord, 1000);
            } 
            // Quand tous les mots sont affichés
            else {
                // On attend 0.5s avant de lancer l'animation de mouvement final
                setTimeout(() => {
                    sloganElement.classList.add('animate-move');
                    
                    // Une fois l'animation finie (après 2s), on vide tout et on recommence
                    setTimeout(() => {
                        sloganElement.innerHTML = "";
                        runCycle(); // Relance la boucle infinie
                    }, 2000);
                }, 500);
            }
        }

        // Démarre l'affichage du premier mot
        showNextWord();
    }

    // Lance le tout premier cycle au chargement
    runCycle();
}


function main() {
    // On lance l'animation du slogan
    initSloganAnimation();
}

// Exécution du script
main();