function modeEdition() {
    let buttonEdition = document.querySelector("#edition");
    let identifiant = "admin";
    let password = "admin_pwd"

    buttonEdition.addEventListener("click", () => {
        let inputId = prompt(`Entrez l'identifiant : ${identifiant}`);

        if (inputId === identifiant) {
            let inputPwd = prompt(`Entrez le mot de passe : ${password}`);
            if (inputPwd === password) {
                
            }
        }
    })
}


function grattage() {
    let canvases = document.querySelectorAll("canvas");

    canvases.forEach(c => {
        let ctx = c.getContext("2d");
        
        // On force le calcul de la taille après un léger délai ou au chargement
        // pour être sûr que offsetWidth ne soit pas égal à 0
        const initCanvas = () => {
            c.width = c.offsetWidth;
            c.height = c.offsetHeight;

            // 1. On PEINT le gris d'abord
            ctx.fillStyle = "#787878";
            ctx.fillRect(0, 0, c.width, c.height);

            // 2. On active la gomme
            ctx.globalCompositeOperation = "destination-out";
            ctx.lineWidth = 30;
            ctx.lineCap = "round";
        };

        initCanvas();

        c.addEventListener("mousemove", (e) => {
            if (e.buttons === 1) {
                // CALCUL CRUCIAL : On soustrait la position du canvas dans la page
                let rect = c.getBoundingClientRect();
                let x = e.clientX - rect.left;
                let y = e.clientY - rect.top;

                ctx.beginPath();
                // On utilise les coordonnées locales (x, y) et non globales (clientX)
                ctx.arc(x, y, 15, 0, Math.PI * 2); 
                ctx.fill();
            }
        });
    });
}

function main() {
    // On attend que la fenêtre soit totalement prête pour avoir les bonnes tailles CSS
    // window.addEventListener('load', grattage);
    grattage();
    
}

main();