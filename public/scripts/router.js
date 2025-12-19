import { indexPage, loginPage, registoPage, profilePage, usersPage } from './pages.js';

export function mostraPagina() {
    const app = document.querySelector(".app");
    const path = window.location.pathname;

    app.innerHTML = '';

    switch(path){
        case '/':
            indexPage(app);
            break;
        case '/login':
            loginPage(app);
            break;
        case '/register':
            registoPage(app);
            break;
        case '/profile':
            profilePage(app);
            break;
        case '/users':
            usersPage(app);
            break;
        default:
            //mostraPaginaNaoEncontrada();
            break;
    }
}

export function navigate(path, replace = false){
    if(replace){
        window.history.replaceState({}, '', path);
    } else {
        window.history.pushState({}, '', path);
    }
    
    mostraPagina();
}