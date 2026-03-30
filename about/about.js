// On récupère les éléments
const modal = document.getElementById("maModale");
const btn = document.getElementById("btn-securite");
const span = document.getElementsByClassName("fermer")[0];

// Quand on clique sur le rectangle, on affiche la modale
btn.onclick = function() {
    modal.style.display = "block";
}

// Quand on clique sur le X, on ferme la modale
span.onclick = function() {
    modal.style.display = "none";
}

// Si on clique n'importe où en dehors de la boîte blanche, on ferme aussi
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}