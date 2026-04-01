// 1. Fonction pour OUVRIR une modale spécifique
function ouvrirModale(idDeLaModale) {
    const modal = document.getElementById(idDeLaModale);
    modal.style.display = "block";
}

// 2. Fonction pour FERMER une modale spécifique
function fermerModale(idDeLaModale) {
    const modal = document.getElementById(idDeLaModale);
    modal.style.display = "none";
}

// 3. Fermer si on clique en dehors de la boîte blanche
window.onclick = function(event) {
    // Si l'élément cliqué a la classe "modal", on le cache
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}