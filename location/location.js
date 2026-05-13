// Fichier location.js : Gère les cartes interactives avec Leaflet
// Affiche les campus ISEN avec géolocalisation, météo et calcul des distances

const API_KEY = "1fb5f48e05b6441888c132553262704";
let globalMap = null;

// Données des campus
const CAMPUS = {
    Nantes: { lat: 47.283, lon: -1.516 },
    Brest:  { lat: 48.406, lon: -4.495 },
    Caen:   { lat: 49.183, lon: -0.350 },
    Rennes: { lat: 48.117, lon: -1.677 }
};

let mapInstance = null;
let villeActive = null;

// ── MÉTÉO ──────────────────────────────────────────────
// Récupère la température actuelle pour chaque campus via l'API WeatherAPI
async function chargerTouteLaMeteo() {
    for (let ville of Object.keys(CAMPUS)) {
        try {
            const resp = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${ville}&aqi=no`
            );
            const data = await resp.json();
            const el = document.getElementById(`weather-${ville}`);
            if (el) el.textContent = data.current.temp_c + "°C";
        } catch(e) {
            const el = document.getElementById(`weather-${ville}`);
            if (el) el.textContent = "N/A";
        }
    }
}

// ── OUVERTURE MODALE ───────────────────────────────────
function ouvrirCarte(nomVille, lat, lon) {
    villeActive = { nom: nomVille, lat, lon };

    // Mise à jour du header
    document.getElementById('modal-city-name').textContent = nomVille;

    // Météo dans la stat bar
    const weatherEl = document.getElementById(`weather-${nomVille}`);
    document.getElementById('modal-weather').textContent = weatherEl
        ? weatherEl.textContent
        : '--°C';

    // Reset stats
    document.getElementById('modal-distance').textContent = 'Localisation...';
    document.getElementById('modal-distance').classList.add('loading');
    document.getElementById('modal-coords').textContent = 'En attente...';
    document.getElementById('modal-coords').classList.add('loading');

    // Afficher la modale
    const modal = document.getElementById('map-modal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Initialiser la carte après un court délai (rendu DOM)
    setTimeout(() => {
        
        initialiserCarte(lat, lon);

        // Géolocalisation
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => afficherItineraire(pos.coords.latitude, pos.coords.longitude, lat, lon),
                () => {
                    document.getElementById('modal-distance').textContent = 'Non disponible';
                    document.getElementById('modal-coords').textContent = 'Refusé';
                    document.getElementById('modal-distance').classList.remove('loading');
                    document.getElementById('modal-coords').classList.remove('loading');
                },
                { enableHighAccuracy: true }
            );
    } else {
        document.getElementById('modal-distance').textContent = 'Non supporté';
    }}, 200);
}

// ── INITIALISATION LEAFLET ─────────────────────────────
function initialiserCarte(latIsen, lonIsen) {
    // Détruire la carte précédente si elle existe
    if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
    }

    // Créer la carte centrée sur le campus
    mapInstance = L.map('map-container').setView([latIsen, lonIsen], 13);

    // Tuiles OpenStreetMap (gratuit, sans clé)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance);

    // Marqueur personnalisé pour le campus (noir Trackwear)
    const iconCampus = L.divIcon({
        className: '',
        html: `<div style="
            width:16px; height:16px;
            background:#0a0a0a;
            border:3px solid #ff3b00;
            border-radius:50%;
            box-shadow: 0 0 0 3px rgba(255,59,0,0.3);
        "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    });

    L.marker([latIsen, lonIsen], { icon: iconCampus })
        .addTo(mapInstance)
        .bindPopup(`<strong>ISEN ${villeActive.nom}</strong>`)
        .openPopup();
}

// ── ITINÉRAIRE ─────────────────────────────────────────
// Affiche la distance, les coordonnées et trace une ligne entre l'utilisateur et le campus
function afficherItineraire(userLat, userLon, isenLat, isenLon) {
    // Mise à jour des stats
    const dist = calculerDistance(userLat, userLon, isenLat, isenLon);
    const distEl = document.getElementById('modal-distance');
    distEl.textContent = Math.round(dist) + ' KM';
    distEl.classList.remove('loading');

    const coordsEl = document.getElementById('modal-coords');
    coordsEl.textContent = `${userLat.toFixed(2)}, ${userLon.toFixed(2)}`;
    coordsEl.classList.remove('loading');

    if (!mapInstance) return;

    // Marqueur utilisateur (blanc)
    const iconUser = L.divIcon({
        className: '',
        html: `<div style="
            width:14px; height:14px;
            background:#fafafa;
            border:3px solid #0a0a0a;
            border-radius:50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
    });

    L.marker([userLat, userLon], { icon: iconUser })
        .addTo(mapInstance)
        .bindPopup('<strong>Votre position</strong>');

    // Ligne droite entre l'utilisateur et le campus
    const ligne = L.polyline(
        [[userLat, userLon], [isenLat, isenLon]],
        {
            color: '#ff3b00',
            weight: 3,
            dashArray: '8, 8',
            opacity: 0.9
        }
    ).addTo(mapInstance);

    // Ajuster le zoom pour voir les deux points
    mapInstance.fitBounds(ligne.getBounds(), { padding: [40, 40] });
}

// ── FERMETURE ──────────────────────────────────────────
function fermerCarte() {
    const modal = document.getElementById('map-modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';

    if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
    }
}

// Fermer en cliquant sur le fond
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('map-modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('map-modal')) {
            fermerCarte();
        }
    });
});

// ── FORMULE HAVERSINE ──────────────────────────────────
// Calcule la distance en km entre deux coordonnées GPS
function calculerDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) ** 2 +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function initGlobalMap() {
    // Centre la carte sur le grand ouest
    globalMap = L.map('global-map-container').setView([48.5, -2.5], 7);

    // Tuiles carto (On peut garder OpenStreetMap, mais le filtre CSS adoucira le rendu)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(globalMap);

    // Un marqueur plus classique et discret (style "point d'intérêt" standard)
    const iconCampusClassique = L.divIcon({
        className: '',
        html: `<div style="
            width:12px; height:12px;
            background:#3b82f6; /* Un bleu standard au lieu du orange Trackwear */
            border:2px solid #ffffff; /* Bordure blanche pour détacher du fond */
            border-radius:50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
    });

    // Ajoute un point pour chaque campus dans l'objet CAMPUS
    Object.keys(CAMPUS).forEach(ville => {
        const c = CAMPUS[ville];
        L.marker([c.lat, c.lon], { icon: iconCampusClassique }) // Utilisation du nouveau marqueur
            .addTo(globalMap)
            .bindPopup(`<div style="text-align: center;"><strong>ISEN ${ville}</strong><br><span style="color:#666; font-size:11px;">Campus</span></div>`);
    });
}

// ── INIT ───────────────────────────────────────────────
window.addEventListener('load', () => {
    chargerTouteLaMeteo();
    initGlobalMap(); // Lance la carte globale au démarrage
});