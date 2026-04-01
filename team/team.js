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