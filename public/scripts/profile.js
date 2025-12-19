const currentUser = JSON.parse(localStorage.getItem("utilizador"));

const greeting = document.querySelector('.greeting');
greeting.textContent = "";
greeting.textContent = "Olá " + currentUser.nome;

const nome = document.querySelector('.perfil_nome');
nome.textContent = currentUser.nome;

const email = document.querySelector('.perfil_email');
email.textContent = currentUser.email;

const telemovel = document.querySelector('.perfil_telemovel');
telemovel.textContent = currentUser.telemovel;

const username = document.querySelector('.perfil_username');
username.textContent = currentUser.username;

const nif = document.querySelector('.perfil_nif');
nif.textContent = currentUser.nif;

const morada = document.querySelector('.perfil_morada');
morada.textContent = currentUser.morada;

const userPhoto = document.querySelector('.user_photo');
userPhoto.setAttribute("src", currentUser.foto);
userPhoto.setAttribute("title", currentUser.nome);

const logoutButton = document.querySelector('.logout_button');
logoutButton.addEventListener("click", function(e){
    e.preventDefault();

    localStorage.removeItem("utilizador");
    window.location.replace("/index.html");
});