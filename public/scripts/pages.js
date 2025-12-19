const mostraPagina = () => {
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
        case '/registo':
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

const navigate = (path) => {
    window.history.pushState({}, '', path);
    mostraPagina();
}

const indexPage = (app) => {
    app.innerHTML = `
        <div class="index_container">
            <section>
                <h2>Grupo 4</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque similique expedita inventore sapiente dicta perferendis magnam maiores quod totam esse. Cumque voluptatibus aliquam unde, iure exercitationem quibusdam illum. Hic, corporis.</p>
            </section>
            <section>
                <video src="https://www.youtube.com/watch?v=it1rTvBcfRg" controls></video>
            </section>
            <section class="full-row">
                <h3>Tabela de Recursos do Projeto</h3>
                <table>
                    <tr>
                        <th></th>
                        <th>Recurso</th>
                        <th>Tipo de Ficheiros</th>
                        <th>Utilização</th>
                    </tr>
                    <tr>
                        <td><img src="/assets/imagens/logo_html.png" alt="HTML 5 Logotipo"></td>
                        <td>Hypertext Markup Language</td>
                        <td>.html</td>
                        <td>Permite descrever conteúdo de páginas web</td>
                    </tr>
                    <tr>
                        <td><img src="/assets/imagens/logo_css.png" alt="CSS Logotipo"></td>
                        <td>Cascading Style Sheets</td>
                        <td>.css</td>
                        <td>Responsável pela apresentação e formatação dos elementos HTML</td>
                    </tr>
                    <tr>
                        <td><img src="/assets/imagens/logo_js.png" alt="JS Logotipo"></td>
                        <td>Javascript</td>
                        <td>.js</td>
                        <td>Permite adicionar comportamento no cliente (browser)</td>
                    </tr>
                </table>
            </section>
        </div>
    `;
}

const loginPage = (app) => {
    const appContainer = document.createElement("DIV");
    appContainer.classList.add("app_container");

    const formHeader = createHeader("Login");
    appContainer.appendChild(formHeader);

    const formWrapper = createFormWrapper("login");

    const usernameInput = createTextFormElement("username", "Username:");
    formWrapper.appendChild(usernameInput);

    const passwordInput = createTextFormElement("password", "Password:", "password");
    formWrapper.appendChild(passwordInput);

    const entrarBtn = createButton("entrar", "entrar", "Entrar", "submit");
    formWrapper.appendChild(entrarBtn);

    entrarBtn.addEventListener("click", function(e){
        e.preventDefault();

        const formElements = document.getElementsByName("login")[0];
        const allInputs = formElements.querySelectorAll("input");

        limparErros(allInputs);

        const isValid = validateLoginFields(allInputs);

        if(isValid){
            navigate('/profile');
        }
        
    });

    const registoButton = createButton("mudar_registo", "mudar_registo", "Mudar para Registo");
    formWrapper.appendChild(registoButton);

    registoButton.addEventListener('click', function(e){
        e.preventDefault();
        navigate('/registo');
    });

    appContainer.appendChild(formWrapper);

    app.appendChild(appContainer);
}

const registoPage = (app) => {
    const appContainer = document.createElement("DIV");
    appContainer.classList.add("app_container");

    const formHeader = createHeader("Registo de Novo Utilizador");
    appContainer.appendChild(formHeader);

    const formWrapper = createFormWrapper("registo");

    const usernameInput = createTextFormElement("username", "Username:");
    formWrapper.appendChild(usernameInput);

    const passwordInput = createTextFormElement("password", "Password:", "password");
    formWrapper.appendChild(passwordInput);

    const fileUploadInput = createFileUploadElement("foto", "Foto de perfil: ");
    formWrapper.appendChild(fileUploadInput);

    const nomeInput = createTextFormElement("nome", "Nome:");
    formWrapper.appendChild(nomeInput);

    const emailInput = createTextFormElement("email", "Email:", "email");
    formWrapper.appendChild(emailInput);

    const telemovelInput = createNumberFormElement("telemovel", "Telemóvel:", 9);
    formWrapper.appendChild(telemovelInput);

    const nifInput = createNumberFormElement("nif", "NIF (9 digitos):", 9);
    formWrapper.appendChild(nifInput);

    const moradaInput = createTextFormElement("morada", "Morada:");
    formWrapper.appendChild(moradaInput);

    const entrarBtn = createButton("registar", "registar", "Registar", "submit");
    formWrapper.appendChild(entrarBtn);

    const loginButton = createButton("mudar_login", "mudar_login", "Mudar para Login");
    formWrapper.appendChild(loginButton);

    loginButton.addEventListener("click", function(e){
        e.preventDefault();
        navigate('/login');
    });

    appContainer.appendChild(formWrapper);

    app.appendChild(appContainer);
}

const profilePage = (app) => {
    const appContainer = document.createElement("DIV");
    appContainer.classList.add("app_container");

    const user = {
        "username": "user",
        "email": "user@projeto.pt",
        "password": "SenhaSegura123",
        "nome": "Utilizador",
        "nif": "999999999",
        "morada": "Rua do Projeto"
    };

    const profileContent = document.createElement('DIV');
    profileContent.classList.add("profile_content");

    const profileDetails = document.createElement('DIV');
    profileDetails.classList.add("profile_details");

    const profileHeader = createHeader("Olá " + user.nome);
    profileDetails.appendChild(profileHeader);

    const profileTable = document.createElement("TABLE");

    const profileTableBody = document.createElement("TBODY");

    // Linha para nome
    const nomeRow = createTableRow("Nome:", user.nome);
    profileTableBody.appendChild(nomeRow);

    // Linha para Email
    const emailRow = createTableRow("Email:", user.email);
    profileTableBody.appendChild(emailRow);

    // Linha para Telemóvel
    const telemovelRow = createTableRow("Telemóvel:", user.telemovel);
    profileTableBody.appendChild(telemovelRow);

    // Linha para Username
    const usernameRow = createTableRow("Uername:", user.username);
    profileTableBody.appendChild(usernameRow);

    // Linha para NIF
    const nifRow = createTableRow("Username:", user.nif);
    profileTableBody.appendChild(nifRow);

    // Linha para Morada
    const moradaRow = createTableRow("Morada:", user.morada);
    profileTableBody.appendChild(moradaRow);

    profileTable.appendChild(profileTableBody);
    profileDetails.appendChild(profileTable);
    profileContent.appendChild(profileDetails);

    // AVATAR
    const profileAvatar = document.createElement('DIV');
    profileAvatar.classList.add("profile_avatar");

    const profileAvatarImage = document.createElement('IMG');
    profileAvatarImage.classList.add("user_photo");
    profileAvatarImage.setAttribute("alt", user.name);
    profileAvatarImage.setAttribute("src", "https://images.pexels.com/photos/360591/pexels-photo-360591.jpeg"); // ALTERAR PARA A IMAGEM VINDA DO NODEJS

    profileAvatar.appendChild(profileAvatarImage);

    profileContent.appendChild(profileAvatar);

    appContainer.appendChild(profileContent);

    // Botão Logout
    const logoutButton = document.createElement('BUTTON');
    logoutButton.classList.add("button", "logout_button");
    logoutButton.setAttribute("name", "logout");
    logoutButton.setAttribute("type", "button");
    logoutButton.textContent = "Sair da Conta (Logout)";

    logoutButton.addEventListener("click", function(e){
        e.preventDefault();
        window.history.replaceState({}, '', '/');
        navigate('/');
    });

    appContainer.appendChild(logoutButton);

    app.appendChild(appContainer);
}

const usersPage = (app) => {
    const appContainer = document.createElement("DIV");
    appContainer.classList.add("app_container");

    app.appendChild(appContainer);
}