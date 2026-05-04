let listeProduits = [
    {id: 'chapeau', nom: 'Chapeau', prix: 20, image: '../assets/images/produits/chapeau.png',dataImg:'["../asset/images/produits/chapeau.png","../asset/images/produits/chapeauInterieur.png"]',modal: 'chapeauModal'},
    {id: 'coucheFleurs', nom: 'Couche fleurie', prix: 15, image: '../assets/images/produits/coucheFleursF.png',dataImg:'["../asset/images/produits/coucheFleurF.png","../asset/images/produits/coucheFleurDosF.png"]',modal: 'coucheFleurModal'},
    {id:'coucheRobots', nom: 'Couche robot', prix: 15, image: '../assets/images/produits/coucheRobotsG.png',modal: 'coucheRobotModal'},
    {id:'maillotFleurs', nom: 'Maillot de bain fleurie', prix: 25, image: '../assets/images/produits/maillotFleursF.png',modal: 'maillotFleurModal'},
    {id:'shortRobots', nom: 'Short de bain robot', prix: 25, image: '../assets/images/produits/maillotRobotsG.png',modal: 'shortRobotModal'},
    {id:'maillotWavesRoses', nom: 'Maillot de bain vagues roses', prix: 25, image: '../assets/images/produits/maillotWavesRoseF.png',modal: 'maillotWavesRosesModal'},
    {id:'enssembleWavesBleus', nom: 'ensemble maillot de bain vagues bleues', prix: 25, image: '../assets/images/produits/maillotWavesBleuG.png',modal: 'maillotWavesBleusModal'},
    {id:'shortWavesRoses', nom: 'Short de bain vagues roses', prix: 20, image: '../assets/images/produits/maillotWavesRoseG.png',modal: 'shortWaves'},
    {id:'tracker', nom: 'Tracker d\'activité', prix: 50, image: '../assets/images/produits/tracker.png',modal: 'trackerModal'},
];

let produitsContainer = document.getElementById('produits');
// Affichage des produits
listeProduits.forEach(produit => {
    let html = `
        <div class="produit">
            <div class='images'>
            <bouton class="fleche" id="gauche" onclick="changerImg(this,-1); event.stopPropagation()">></bouton>
            <img src="${produit.image}" dataImg="${produit.dataImg}" index="0" alt="${produit.nom}">
            <bouton class="fleche" id="droite" onclick="changerImg(this,1); event.stopPropagation()">></bouton>
            </div>
            <h2>${produit.nom}</h2>
            <p>${produit.prix} €</p>
            <form onclick="event.stopPropagation()">
                <select class="taille" required>
                    <option value="">Sélectionnez une taille</option>
                    <option value="2">2 ans</option>
                    <option value="3-4">3-4 ans</option>
                    <option value="5-6">5-6 ans</option>
                    <option value="7-8">7-8 ans</option>
                    <option value="9-10">9-10 ans</option>
                </select>
                <button type="submit" class="btnAchat">Ajouter au panier</button>
            </form>
        </div>
    `;
    produitsContainer.innerHTML += html; //ajoute le produit à la page
});

