// Fonction pour ouvrir la modale ciblée
function ouvrirModale(id) {
    document.getElementById(id).style.display = "block";
}

// Fonction pour fermer la modale ciblée
function fermerModale(id) {
    document.getElementById(id).style.display = "none";
}

// Fermer la modale si on clique à côté de la boîte blanche
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = "none";
    }
}