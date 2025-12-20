import { indexPage, loginPage, registoPage, profilePage, usersPage } from './pages.js';
import { authorizationFetch, buildNavigation } from './utils.js';

const navLinks = [
    {
        text: "Home",
        path: "/",
    }
]

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
            navLinks.push({text: "Login", path: "/login" });
            buildNavigation(navLinks);
            indexPage(app);
            break;
        case '/login':
            navLinks.push({text: "Login", path: "/login" });
            buildNavigation(navLinks);
            const token = localStorage.getItem('token');
            if(token){
                navigate("/profile", true);
                break;
            }
            loginPage(app);
            break;
        case '/register':
            navLinks.push({text: "Login", path: "/login" });
            buildNavigation(navLinks);
            registoPage(app);
            break;
        case '/profile':
            navLinks.push({text: "A minha conta", path: "/profile" });
            const auth = await authorizationFetch("/users/profile");
            if(auth.status === 400 || auth.status === 401 || auth.status === 403){
                navigate("/login", true);
                break;
            } else {
                const data = await auth.json();
                if(data.user.isAdmin){
                    navLinks.push({text: "Painel de Administração", path: "/users" });
                }

                buildNavigation(navLinks);
                profilePage(app, data.user);
                break;
            }
        case '/users':
            navLinks.push({text: "A minha conta", path: "/profile" });
            navLinks.push({text: "Painel de Administração", path: "/users" });
            buildNavigation(navLinks);
            usersPage(app);
            break;
        default:
            //mostraPaginaNaoEncontrada();
            break;
    }
}