export function cleanHTML() {
    if(formContainer){
        formContainer.innerHTML = "";
    }
}

// Limpa os erros de validação
export function limparErros(inputs){
    inputs.forEach((input) => {
        if(input.classList.contains('input-error')){
            input.classList.remove("input-error");
        }

        const parent = input.parentNode;
        const errorElement = parent.querySelector("small");
        errorElement.textContent = "";
        errorElement.classList.add("hidden");
    });
}

export function createUserRow(user){
    const tRow = document.createElement("TR");

    const imgTD = document.createElement("TD");
    const userImg = document.createElement("IMG");
    userImg.classList.add("userImg");
    userImg.setAttribute("src", user.fotografia);
    imgTD.appendChild(userImg);

    const userNameTD = document.createElement("TD");
    userNameTD.textContent = user.nome;

    const userEmailTD = document.createElement("TD");
    userEmailTD.textContent = user.email;

    const deleteTD = document.createElement("TD");
    const deleteBtn = document.createElement("BUTTON");
    deleteBtn.classList.add("button", "logout_button", "delete_button");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg>`;
    deleteTD.appendChild(deleteBtn);

    tRow.appendChild(imgTD);
    tRow.appendChild(userNameTD);
    tRow.appendChild(userEmailTD);
    tRow.appendChild(deleteTD);

    return tRow;
}

export function BuildFormData(inputs){
    const formData = new FormData();
    /*inputs.forEach((input) => {
        if(input.name === "fotografia"){
            //formData.append("fotografia", input.files[0]);
        } else {
            formData.append(input.name, input.value);
        }
    });*/
    formData.append("nome", "aaaaaa");
    formData.append("email", "bbbbbb");

    return formData;
}