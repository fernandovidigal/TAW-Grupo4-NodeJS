import { navigate } from './router.js';

export const API_BASE_URL = 'http://localhost:3000/api';

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

// Cria uma linha na tabela de utilizadores da página users (Admin only)
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

    const userTelemovelTD = document.createElement("TD");
    userTelemovelTD.textContent = user.telemovel;

    const deleteTD = document.createElement("TD");
    const deleteBtn = document.createElement("BUTTON");
    deleteBtn.classList.add("button", "logout_button", "delete_button");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.dataset.username = user.username;
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg>`;
    deleteTD.appendChild(deleteBtn);

    tRow.appendChild(imgTD);
    tRow.appendChild(userNameTD);
    tRow.appendChild(userEmailTD);
    tRow.appendChild(userTelemovelTD);
    tRow.appendChild(deleteTD);

    return tRow;
}

// coloca os dados do formulário pronto para enviar para o servidor
export function buildFormData(inputs){
    const formData = new FormData();
    inputs.forEach((input) => {
        if(input.name === "fotografia"){
            formData.append("fotografia", input.files[0]);
        } else {
            formData.append(input.name, input.value);
        }
    });

    return formData;
}

// Mostra popup de loading
export function showLoadingMessage(texto) {
    Swal.fire({
        title: texto,
        text: 'Por favor, aguarde.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

// Mostra popup de sucesso
export function showSuccessMessage(message, path, pathReplace = false){
    Swal.fire({
        title: 'Sucesso',
        text: message,
        icon: 'success',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 1500,
        timerProgressBar: true,
    }).then(() => {
        navigate(path, pathReplace);
    });
} 

// Mostra popup de erro
export function showErrorMessage(message) {
    Swal.fire({
        title: 'Erro',
        text: message,
        icon: 'error',
        showConfirmButton: true,
    });
}

// Mostra popup com os erros de validação que vêm do lado do servidor
export function showValidationErrors(errors){
    let message = '';
    errors.forEach((error) => {
        message += '<p>'+error.msg+'</p>';
    });

    Swal.fire({
        icon: 'error',
        title: 'Erro',
        html: message,
        showConfirmButton: true,
    });
}

// Mostra popup para confirmação de eliminação
export function showDeleteConfirmationMessage(message){
    return Swal.fire({
        icon: 'question',
        title: message,
        text: 'Esta ação não pode ser desfeita.',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'SIM',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        reverseButtons: true,
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then((result) => result.isConfirmed === true);
}

// Faz pedido com cabeçalho de autorização
export function authorizationFetch(url) {
    const token = localStorage.getItem("token");
    const headers = new Headers({});
    if(token) headers.set("Authorization", "Bearer " + token);
    return fetch(API_BASE_URL + url, { headers });
}

// Constroi os menus de navegação
// Os menus vão depender do estado da aplicação (se o utilizador já fez login, se é administrador)
export function buildNavigation(){
    // Limpa os menus de navegação para serem posteriormente construídos
    const nav = document.querySelector(".navigation");
    nav.innerHTML = '';

    const navLinks = [
        { text: "Home", path: "/" }
    ]

    const token = localStorage.getItem("token");
    const { isAdmin } = JSON.parse(localStorage.getItem("user")) || { isAdmin: false };
    if(token){
        navLinks.push({text: "A minha conta", path: "/profile"});
        if(isAdmin){
            navLinks.push({text: "Painel de Administração", path: "/users"});
        }
    } else {
        navLinks.push({text: "Login", path: "/login"});
    }

    const navUL = document.createElement("UL");

    navLinks.forEach((link) => {
        const navLI = document.createElement("LI");
        const navA = document.createElement("A");
        navA.setAttribute("href", link.path);
        navA.textContent = link.text;

        navLI.appendChild(navA);

        navUL.appendChild(navLI);
    });

    nav.appendChild(navUL);
}

// Verifica se o token for marcado como inválido (espirado ou adulterado)
export async function checkInvalidToken(response){
    const data = await response.json();
    if(data.invalidToken){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
}