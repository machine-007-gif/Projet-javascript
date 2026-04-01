function calqueGrattage() {
    let canvases = document.querySelectorAll("canvas");
    canvases.forEach(c => {
        grattage(c);
    });
}

function verifModeEdition() {
    let editionMode = false;
    let buttonEdition = document.querySelector(".btn-edition");
    let idAdmin = "admin";
    let pwdAdmin = "admin_pwd";

    buttonEdition.addEventListener("click", () => {
        if (!editionMode) {
            let inputId = prompt("Entrez le nom du profil administrateur :");
            if (inputId === idAdmin) {
                let inputPwd = prompt("Entrez le mot de passe: ");
                if (inputPwd === pwdAdmin) {
                    modeEdition();
                    editionMode = true;
                }
            }
        }
        else {
            let sortie = confirm("Confirmez pour quitter le mode edition");
            if (sortie) {
                editionMode = false;
                exitModeEdition();
            }
        }
    })
}

function modeEdition() {
    let buttonEdition = document.querySelector(".btn-edition");
    let buttonRemove = document.querySelectorAll(".delete-btn");
    let name = document.querySelectorAll(".member-name");
    let buttonAdd = document.querySelector(".add");
    let parentElement = document.querySelector(".card-section");

    buttonEdition.classList.add("active");
    buttonAdd.style.display = "flex";

    name.forEach(function(h2) {
        h2.contentEditable = true;
    });
    buttonRemove.forEach(function(btn) {
        btn.style.display = "flex";
        btn.addEventListener("click", function() {
            let parentElement = btn.parentElement;
            parentElement.remove();
        });
    });

    buttonAdd.addEventListener("click", function() {
        let newMember = document.createElement("div");
        newMember.classList.add("card");
        newMember.innerHTML = addMember();
        let newh2 = newMember.querySelector("h2");
        newh2.contentEditable = true;
        let newBtnRemove = newMember.querySelector(".delete-btn");
        newBtnRemove.style.display = "flex";
        newBtnRemove.addEventListener("click", function() {
            let parentElement = newBtnRemove.parentElement;
            parentElement.remove();
        })
        parentElement.insertBefore(newMember, buttonAdd);
        grattage(newMember.querySelector("canvas"));
    });
}

function exitModeEdition() {
    let buttonEdition = document.querySelector(".btn-edition");
    let buttonRemove = document.querySelectorAll(".delete-btn");
    let name = document.querySelectorAll(".member-name");
    let buttonAdd = document.querySelector(".add");

    buttonEdition.classList.remove("active");
    buttonAdd.style.display = "none";

    name.forEach(function(h2) {
        h2.contentEditable = false;
    });
    buttonRemove.forEach(function(btn) {
        btn.style.display = "none";
    });
}

function addMember() {
    return `
    <button class="delete-btn">x</button>
    <div class="presentation">
        <div class="calque">
            <img src="../assets/images/Desrier.jpg" alt="Thomas">
            <canvas></canvas>
        </div>
        <h2 class="member-name">Antoine Desrier</h2>
        <p>Enseignant ISEN</p>
    </div>
    <div class="skils">
        <span class="badge">Physique quantique</span>
        <span class="badge">Mathématiques </span>
        <span class="badge">Informatique</span>
    </div>`;
}

function grattage(card) {

    let ctx = card.getContext("2d");
    
    const initCanvas = () => {
        card.width = card.offsetWidth;
        card.height = card.offsetHeight;

        // 1. On PEINT le gris d'abord
        ctx.fillStyle = "#787878";
        ctx.fillRect(0, 0, card.width, card.height);

        // 2. On active la gomme
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
    };

    initCanvas();

    card.addEventListener("mousemove", (e) => {
        let rect = card.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2); 
        ctx.fill();
    });
}

function main() {
    calqueGrattage();
    verifModeEdition();
}

main();