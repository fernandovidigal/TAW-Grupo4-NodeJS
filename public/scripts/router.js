import { indexPage, loginPage, registoPage, profilePage, usersPage } from './pages.js';
import { authorizationFetch } from './utils.js';

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
            const auth = await authorizationFetch("/users/profile");
            if(auth.status === 400 || auth.status === 401 || auth.status === 403){
                navigate("/login", true);
                break;
            } else {
                const data = await auth.json();
                if(data.user.isAdmin){
                    usersPage(app);
                    break;
                }
                profilePage(app, data.user);
                break;
            }
        case '/users':
            usersPage(app);
            break;
        default:
            //mostraPaginaNaoEncontrada();
            break;
    }
}