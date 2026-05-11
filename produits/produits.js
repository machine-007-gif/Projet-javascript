let listeProduits = [
    {id: 'Chapeau', type:'accessoire', Selection:'taille', tailles: ['1-3 mois','7-6 mois','2-3 ans','4-6 ans','7-10 ans'], nom: 'Chapeau', prix: 20, image: '../assets/images/produits/chapeau.png', image2: '../assets/images/produits/chapeauInterieur.png', description: 'Chapeau artisanal pour bébé, doux et respirant, idéal pour le soleil.'},
    {id: 'CoucheFleurs', type:'habillement', Selection:'taille', tailles: ['1-3 mois','4-6 mois','7-10 mois','11-24 mois','2-3 ans'], nom: 'Couche fleurie', prix: 15, image: '../assets/images/produits/coucheFleursF.png', image2: '../assets/images/produits/coucheFleursDosF.png', description: 'Couche lavable motif fleuri, écologique et confortable pour les tout-petits.'},
    {id: 'CoucheRobots', type:'habillement', Selection:'taille', tailles: ['1-3 mois','4-6 mois','7-10 mois','11-24 mois','2-3 ans'], nom: 'Couche robot', prix: 15, image: '../assets/images/produits/coucheRobotsG.png', image2: '../assets/images/produits/coucheRobotsDosG.png', description: 'Couche lavable motif robots, amusante et pratique pour les bébés aventuriers.'},
    {id: 'MaillotFleurs', type:'habillement', Selection:'taille', tailles: ['2-3 ans','4-6 ans','7-10 ans','12 ans','14 ans'], nom: 'Maillot de bain fleurie', prix: 25, image: '../assets/images/produits/maillotFleursF.png', image2: '../assets/images/produits/maillotFleursDosF.png', description: 'Maillot de bain fille, motif fleuri coloré, tissu résistant au chlore et au sel.'},
    {id: 'ShortRobots', type:'habillement', Selection:'taille', tailles: ['2-3 ans','4-6 ans','7-10 ans','12 ans','14 ans'], nom: 'Short de bain robot', prix: 25, image: '../assets/images/produits/maillotRobotsG.png', image2: '../assets/images/produits/maillotRobotsDosG.png', description: 'Short de bain garçon motif robots, séchage rapide et élastique confortable.'},
    {id: 'MaillotWavesRoses', type:'habillement', Selection:'taille', tailles: ['2-3 ans','4-6 ans','7-10 ans','12 ans','14 ans'], nom: 'Maillot vagues roses', prix: 25, image: '../assets/images/produits/maillotWavesRoseF.png', image2: '../assets/images/produits/maillotWavesRoseDosF.png', description: 'Maillot de bain fille motif vagues roses, élégant et résistant pour la piscine.'},
    {id: 'EnsembleWavesBleus', type:'habillement', Selection:'taille', tailles: ['2-3 ans','4-6 ans','7-10 ans','12 ans','14 ans'], nom: 'Ensemble vagues bleues', prix: 25, image: '../assets/images/produits/maillotWavesBleuG.png', image2: '../assets/images/produits/maillotWavesBleuDosG.png', description: 'Ensemble maillot garçon vagues bleues, 2 pièces assortis pour un look parfait.'},
    {id: 'ShortWavesRoses', type:'habillement', Selection:'taille', tailles: ['2-3 ans','4-6 ans','7-10 ans','12 ans','14 ans'], nom: 'Short vagues roses', prix: 20, image: '../assets/images/produits/maillotWavesRoseG.png', image2: '../assets/images/produits/maillotWavesRoseDosG.png', description: 'Short de bain vagues roses, léger et stylé pour les journées à la plage.'},
    {id: 'Tracker', type:'accessoire', Selection:'couleur', tailles: ['rose','bleu','vert','originale','blanc'], nom: "Tracker d'activité", prix: 50, image: '../assets/images/produits/tracker.png', image2: '../assets/images/produits/fonctionnementDuTraceur.png', description: "Tracker d'activité pour enfant, suivi des mouvements , étanche."},
];

// ───────── Rendu HTML ───────── //
function genererProduitHTML(produit) {
    return `
    <div class="produit" id="${produit.id}" >
        <img src="${produit.image}" alt="${produit.nom}" class="imgProduit" id="img${produit.id}" onclick="alternerImage('${produit.id}')">
        <h3>${produit.nom}</h3>
        <p>Prix: ${produit.prix}€</p>

        <form class="selectionForm">
            <select>
            <option value="">Sélectionnez une ${produit.Selection}</option>
            ${produit.tailles.map(function(taille) {
                return `<option value="${taille}">${taille}</option>`;
            })}</select>
        </form>

        <button class="btnAcheter" onclick="Acheter(event)">Acheter</button>
        <canvas id="canvas${produit.id}" class="canvasAchat" width="200" height="200"></canvas>
    </div>


    `;
}

// ───────── Alterner images ───────── //
function alternerImage(id) {
    let img = document.getElementById(`img${id}`);
    // cherche le produit correspondant à l'id
    let produit = listeProduits.find(function(p) {
        return p.id === id;
    });
    let imageActuelle = img.getAttribute('src');
    let image1 = produit.image;
    let image2 = produit.image2;
    //si l'image actuelle est image1, on met image2, sinon on remet image1
    if (imageActuelle === image1) {
        img.setAttribute('src', image2);
    } else {
        img.setAttribute('src', image1);
    }
}
// ───────── fleche ───────── //

let btnRetourHaut = document.getElementById('btnRetourHaut');

btnRetourHaut.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });//fait défiler la page vers le haut de manière fluide
});

// ───────── Acheter ───────── //

function Acheter(event) {
    let btn = event.target;
    let divProduit = btn.parentElement;
    let taille = divProduit.querySelector('select').value;

    if (taille === '') {
        alert('Veuillez sélectionner une taille avant d\'acheter.');//envoie une alerte si aucune taille n'est sélectionnée
        return;
    }
    let produitId = divProduit.id;//récupère l'id du produit à partir du bouton cliqué

    AfficherCanvas(produitId);//affiche le canvas d'achat pour le produit correspondant
    
}
// Affiche le canvas d'achat
function AfficherCanvas(id) {
    let canvas = document.getElementById(`canvas${id}`);
    let context = canvas.getContext('2d');

    //affiche fond bleu
    context.clearRect(0, 0, canvas.width, canvas.height); // efface le canvas avant de dessiner
    context.fillStyle="blue";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //affiche smiley
    context.beginPath();
    context.arc(100, 100, 50, 0, 2 * Math.PI); // visage
    context.fillStyle = 'yellow';
    context.fill();
    context.beginPath();
    context.arc(80, 80, 10, 0, 2 * Math.PI); // œil gauche
    context.arc(120, 80, 10, 0, 2 * Math.PI); // œil droit
    context.fillStyle = 'black';
    context.fill();
    context.beginPath();
    context.arc(100, 120, 30, 0, Math.PI); // bouche
    context.fillStyle = 'black';
    context.fill();
    
    // Affiche un message de confirmation d'achat
    
    context.font = '16px Arial';
    context.fillStyle = 'white';
    context.fillText('Achat confirmé !', 10, 50);
}
// ───────── Filtre ───────── //
//filtre → nouvelle liste → re-génère le HTML → écrase l'ancien affichage

function filtrer(){
    let taille= document.getElementById('filtreTaille').value;
    let type= document.getElementById('filtreType').value;
    let prixmax = parseInt(document.getElementById('filtrePrix').value);

    //on filtre la liste des produits en fonction des critères sélectionnés
    let produitsFiltres = listeProduits.filter(function(produit) {
        let selectionTaille = (taille === '' || produit.tailles.includes(taille));
        let selectionType = (type === '' || produit.type === type);
        let selectionPrix = (prixmax === '' || produit.prix <= prixmax);
        return selectionTaille && selectionType && selectionPrix;
    });

    //on génère le HTML pour les produits filtrés et on l'affiche
    let produitsContainer = document.getElementById('produits');
    let HtmlProduits = '';
    produitsFiltres.forEach(function(produit) {//pour chaque produit filtré on génère son HTML et on l'ajoute à la variable HtmlProduits
        HtmlProduits += genererProduitHTML(produit);
    });
    produitsContainer.innerHTML = HtmlProduits;//on insère le HTML généré dans le conteneur pour afficher les produits filtrés
}

document.getElementById('filtreTaille').addEventListener('change', filtrer);
document.getElementById('filtreType').addEventListener('change', filtrer);

document.getElementById('filtrePrix').addEventListener('input', function() {
    document.getElementById('filtrePrixAffichage').textContent = `${this.value}€`; 
    filtrer();
});

document.getElementById('btnResetFiltres').addEventListener('click', function() {
    document.getElementById('filtreTaille').value = '';
    document.getElementById('filtreType').value = '';
    document.getElementById('filtrePrix').value = '50';
    document.getElementById('filtrePrixAffichage').textContent = '50€'; 
    main();
});


// ───────── Main ───────── //

function main(){
    let produitsContainer = document.getElementById('produits');

    //on génère le HTML pour chaque produit et on l'ajoute à la variable HtmlProduits
    let HtmlProduits = '';
    listeProduits.forEach(function(produit) {
        HtmlProduits += genererProduitHTML(produit);
    });
    //on insère le HTML généré dans le conteneur
    produitsContainer.innerHTML = HtmlProduits; 
}

main();