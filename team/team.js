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
            let rect = c.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            ctx.beginPath();
            ctx.arc(x, y, 15, 0, Math.PI * 2); 
            ctx.fill();
        });
    });
}

function main() {
    grattage();
}

main();