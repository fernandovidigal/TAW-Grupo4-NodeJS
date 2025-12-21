import { indexPage, loginPage, registoPage, profilePage, usersPage, paginaNaoEncontrada, editProfilePage } from './pages.js';
import { authorizationFetch, buildNavigation, checkInvalidToken } from './utils.js';

export function navigate(path, replace = false){
    if(replace){
        window.history.replaceState({}, '', path);
    } else {
        window.history.pushState({}, '', path);
    }
    
    mostraPagina();
}

export async function mostraPagina() {
    const app = document.querySelector(".app");
    const path = window.location.pathname;

    app.innerHTML = '';

    const token = localStorage.getItem('token');

    // Constroi os menus de navegação
    buildNavigation();

    switch(path){
        case '/':
            indexPage(app);
            break;
        case '/login':
            if(token){
                navigate("/profile", true);
                break;
            }
            loginPage(app);
            break;
        case '/register':
            if(token){
                navigate("/", true);
                break;
            }
            registoPage(app);
            break;
        case '/profile':
            const profileFetch = await authorizationFetch("/users/profile");
            if(profileFetch.status >= 200 && profileFetch.status <= 226){ // O pedido é bem succedido
                const data = await profileFetch.json();
                profilePage(app, data.user);
            } else {
                checkInvalidToken(profileFetch); // Verifica se o token expirou ou é inválido
                navigate("/login", true);
            }
            break;
        case '/users':
            const usersFetch = await authorizationFetch("/users");
            if(usersFetch.status >= 200 && usersFetch.status <= 226){
                const data = await usersFetch.json();
                usersPage(app, data.users);
            } else {
                checkInvalidToken(usersFetch); // Verifica se o token expirou ou é inválido
                navigate("/", true);
            }
            break;
        case '/editProfile':
            const peditProfileFetch = await authorizationFetch("/users/profile");
            if(peditProfileFetch.status >= 200 && peditProfileFetch.status <= 226){
                const data = await peditProfileFetch.json();
                editProfilePage(app, data.user);
            } else {
                checkInvalidToken(peditProfileFetch); // Verifica se o token expirou ou é inválido
                navigate("/", true);
            }
            break;
        default:
            paginaNaoEncontrada(app);
            break;
    }
}