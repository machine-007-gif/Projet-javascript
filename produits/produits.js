let listeProduits = [
    {id: 'Chapeau', type:'accessoire',Selection:'taille',tailles: ['1-3mois','7-6 mois','2-3 ans','4-6 ans','7-10 ans'], nom: 'Chapeau', prix: 20, image: '../assets/images/produits/chapeau.png',image2:"../assets/images/produits/chapeauInterieur.png",modal: 'chapeauModal'},
    {id: 'CoucheFleurs', type:'habillement',Selection:'taille',tailles: ['1-3 mois','4-6 mois','7-10 mois','11-24 mois','2-3 ans'], nom: 'Couche fleurie', prix: 15, image: '../assets/images/produits/coucheFleursF.png',image2:"../assets/images/produits/coucheFleursDosF.png",modal: 'coucheFleurModal'},
    {id:'CoucheRobots', type:'habillement',Selection:'taille',tailles: ['1-3 mois','4-6 mois','7-10 mois','11-24 mois','2-3 ans'], nom: 'Couche robot', prix: 15, image: '../assets/images/produits/coucheRobotsG.png',image2:"../assets/images/produits/coucheRobotsDosG.png",modal: 'coucheRobotModal'},
    {id:'MaillotFleurs', type:'habillement',Selection:'taille',tailles: ['2-3 ans','4-6 ans','7-10 ans','12 ans','14 ans'], nom: 'Maillot de bain fleurie', prix: 25, image: '../assets/images/produits/maillotFleursF.png',image2:"../assets/images/produits/maillotFleursDosF.png",modal: 'maillotFleurModal'},
    {id:'ShortRobots', type:'habillement',Selection:'taille',tailles: ['2-3 ans','4-6 ans','7-10 ans','12 ans','14 ans'], nom: 'Short de bain robot', prix: 25, image: '../assets/images/produits/maillotRobotsG.png',image2:"../assets/images/produits/maillotRobotsDosG.png",modal: 'shortRobotModal'},
    {id:'MaillotWavesRoses', type:'habillement',Selection:'taille',tailles: ['2-3 ans','4-6 ans','7-10 ans','12 ans','14 ans'], nom: 'Maillot de bain vagues roses', prix: 25, image: '../assets/images/produits/maillotWavesRoseF.png',image2:"../assets/images/produits/maillotWavesRoseDosF.png",modal: 'maillotWavesRosesModal'},
    {id:'EnsembleWavesBleus', type:'habillement',Selection:'taille',tailles: ['2-3 ans','4-6 ans','7-10 ans','12 ans','14 ans'], nom: 'ensemble maillot de bain vagues bleues', prix: 25, image: '../assets/images/produits/maillotWavesBleuG.png',image2:"../assets/images/produits/maillotWavesBleuDosG.png",modal: 'maillotWavesBleusModal'},
    {id:'ShortWavesRoses', type:'habillement',Selection:'taille',tailles: ['2-3 ans','4-6 ans','7-10 ans','12 ans','14 ans'], nom: 'Short de bain vagues roses', prix: 20, image: '../assets/images/produits/maillotWavesRoseG.png',image2:"../assets/images/produits/maillotWavesRoseDosG.png",modal: 'shortWaves'},
    {id:'Tracker', type:'accessoire',Selection:'couleur',tailles: ['rose','bleu','vert','originale','blanc'], nom: 'Tracker d\'activité', prix: 50, image: '../assets/images/produits/tracker.png',image2:"../assets/images/produits/fonctionnementDuTraceur.png",modal: 'trackerModal'},
];

let produitsContainer = document.getElementById('produits');
// Affichage des produits
listeProduits.forEach(produit => {
    let html = `
        <div class="produit">
            <div class='carousel'>
                <div class="imagesContainer"> <!-- Conteneur pour le mouvement -->
                    <div class="images" id="slider-${produit.id}">
                        <div class="slide"><img src="${produit.image}" onclick="ouvrirModal('${produit.modal}')"></div> 
                        <div class="slide"><img src="${produit.image2}" onclick="ouvrirModal('${produit.modal}')"></div>
                    </div>
                </div>
                <div class="indicators">
                    <button class="fleche gauche" onclick="moveSlide('${produit.id}', -1)"><</button>
                    <button class="fleche droite" onclick="moveSlide('${produit.id}', 1)">></button>
                </div>
            </div>

            <h2>${produit.nom}</h2>
            <p>${produit.prix} €</p>
            
            <form onclick="event.stopPropagation()">
                <select class="taille" required>
                    <option value="">Sélectionnez une ${produit.Selection}</option>
                    <option value=${produit.tailles[0]}>${produit.tailles[0]}</option>
                    <option value=${produit.tailles[1]}>${produit.tailles[1]}</option>
                    <option value=${produit.tailles[2]}>${produit.tailles[2]}</option>
                    <option value=${produit.tailles[3]}>${produit.tailles[3]}</option>
                    <option value=${produit.tailles[4]}>${produit.tailles[4]}</option>
                </select>
                <button id="btnAchat${produit.id}" type="submit" class="btnAchat" onclick="event.preventDefault(); canvasSmiley('Smiley${produit.id}')">Ajouter au panier</button>

                

            </div>
            </form> 
        </div>
    `;
    produitsContainer.innerHTML += html; //ajoute le produit à la page
});

let slideStates = {}; 

function moveSlide(id, direction) {
    // Initialise l'index pour ce produit s'il n'existe pas
    if (slideStates[id] === undefined) slideStates[id] = 0;

    const slider = document.getElementById(`slider-${id}`);
    const slides = slider.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Calcul du nouvel index
    slideStates[id] += direction;

    if (slideStates[id] >= totalSlides) slideStates[id] = 0;
    if (slideStates[id] < 0) slideStates[id] = totalSlides - 1;

    // Animation de glissement
    slider.style.transform = `translateX(-${slideStates[id] * 100}%)`;
}

// Fonction pour ouvrir la modale ciblée
function ouvrirModal(id) {
    document.getElementById(id).style.display = "block";
}

// Fonction pour fermer la modale ciblée
function fermerModal(id) {
    document.getElementById(id).style.display = "none";
}

// Fermer la modale si on clique à côté de la boîte blanche
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = "none";
    }
}