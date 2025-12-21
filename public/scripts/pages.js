import { navigate } from './router.js';
import { API_BASE_URL, limparErros, createUserRow, buildFormData, showLoadingMessage, showSuccessMessage, showErrorMessage, showValidationErrors, showDeleteConfirmationMessage } from './utils.js';
import { createHeader, createForm, createTextFormElement, createFileUploadElement, createNumberFormElement, createTableRow, createButton } from './forms.js';
import { validateLoginFields, validateFields} from './validations.js'

export function indexPage(app){
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

export function loginPage(app){
    const appContainer = document.createElement("DIV");
    appContainer.classList.add("app_container");

    const formHeader = createHeader("Login");
    appContainer.appendChild(formHeader);

    const formWrapper = createForm("login");

    const usernameInput = createTextFormElement("identifier", "Username or Email:");
    formWrapper.appendChild(usernameInput);

    const passwordInput = createTextFormElement("password", "Password:", "password");
    formWrapper.appendChild(passwordInput);

    const entrarBtn = createButton("entrar", "entrar", "Entrar", "submit");
    formWrapper.appendChild(entrarBtn);

    entrarBtn.addEventListener("click", function(e){
        e.preventDefault();

        // Obtem o formulário de login
        const formElements = document.getElementsByName("login")[0];
        // Obtem todos os inputs do formulario de login
        const allInputs = formElements.querySelectorAll("input");

        limparErros(allInputs);

        // Valida os campos do formulário de login
        const isValid = validateLoginFields(allInputs);

        if(isValid){
            // Constroi um conjunto key:value que representa os campos do formulário
            const formData = buildFormData(allInputs);

            fetch(API_BASE_URL + "/auth/login", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    identifier: formData.get('identifier'),
                    password: formData.get('password'),
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                if(data.success){
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    showSuccessMessage(data.message, "/profile");
                } else {
                    if(data.errors){
                        showValidationErrors(data.errors);
                    } else {
                        showErrorMessage(data.message);
                    } 
                }
            })
            .catch((err) => {
                showErrorMessage(err);
            });
        }
        
    });

    const registoButton = createButton("mudar_registo", "mudar_registo", "Mudar para Registo");
    formWrapper.appendChild(registoButton);

    registoButton.addEventListener('click', function(e){
        e.preventDefault();
        navigate('/register');
    });

    appContainer.appendChild(formWrapper);

    app.appendChild(appContainer);
}

export function registoPage(app){
    const appContainer = document.createElement("DIV");
    appContainer.classList.add("app_container");

    const header = createHeader("Registo de Novo Utilizador");
    appContainer.appendChild(header);

    const formWrapper = createForm("registo");
    formWrapper.setAttribute("enctype", "multipart/form-data");

    const usernameInput = createTextFormElement("username", "Username:");
    formWrapper.appendChild(usernameInput);

    const passwordInput = createTextFormElement("password", "Password:", "password");
    formWrapper.appendChild(passwordInput);

    const fileUploadInput = createFileUploadElement("fotografia", "Foto de perfil: ");
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

    entrarBtn.addEventListener("click", function(e){
        e.preventDefault();
            
        const formElements = document.getElementsByName("registo")[0];
        const allInputs = formElements.querySelectorAll("input");
            
        limparErros(allInputs);

        const isValid = validateFields(allInputs);

        if(isValid){
            const formData = buildFormData(allInputs);

            showLoadingMessage("A registar...");
            
            fetch(API_BASE_URL + "/auth/register", {
                method: 'POST',
                body: formData
            })
            .then((res) => res.json())
            .then((data) => {
                if(data.success){
                    showSuccessMessage(data.message, "/login");
                } else {
                    if(data.errors){
                        showValidationErrors(data.errors);
                    } else {
                        showErrorMessage(data.message);
                    } 
                }
            })
            .catch((err) => {
                showErrorMessage(err);
            });
        }
    });

    const loginButton = createButton("mudar_login", "mudar_login", "Mudar para Login");
    formWrapper.appendChild(loginButton);

    loginButton.addEventListener("click", function(e){
        e.preventDefault();
        navigate('/login');
    });

    appContainer.appendChild(formWrapper);

    app.appendChild(appContainer);
}

export function profilePage(app, user){
    const appContainer = document.createElement("DIV");
    appContainer.classList.add("app_container");

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
    const usernameRow = createTableRow("Username:", user.username);
    profileTableBody.appendChild(usernameRow);

    // Linha para NIF
    const nifRow = createTableRow("NIF:", user.nif);
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

    // AVATAR - Image
    const profileAvatarImage = document.createElement('IMG');
    profileAvatarImage.classList.add("user_photo");
    profileAvatarImage.setAttribute("alt", user.name);
    profileAvatarImage.setAttribute("src", user.fotografia);

    profileAvatar.appendChild(profileAvatarImage);

    profileContent.appendChild(profileAvatar);

    appContainer.appendChild(profileContent);

    const editProfileButton = document.createElement("BUTTON");
    editProfileButton.classList.add("button");
    editProfileButton.setAttribute("name", "logout");
    editProfileButton.setAttribute("type", "button");
    editProfileButton.textContent = "Editar Perfil";

    editProfileButton.addEventListener("click", function(e){
        e.preventDefault();
        navigate('/editProfile');
    });

    appContainer.appendChild(editProfileButton);

    // Botão Logout
    const logoutButton = document.createElement('BUTTON');
    logoutButton.classList.add("button", "logout_button");
    logoutButton.setAttribute("name", "logout");
    logoutButton.setAttribute("type", "button");
    logoutButton.textContent = "Sair da Conta (Logout)";

    logoutButton.addEventListener("click", function(e){
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/', true);
    });

    appContainer.appendChild(logoutButton);

    app.appendChild(appContainer);
}

export function usersPage(app, users){
    const appContainer = document.createElement("DIV");
    appContainer.classList.add("app_container", "app_container_wider");

    // Verifica se não existem utilizadores registados
    if(users.length == 0){
         appContainer.innerHTML = "<h2>Não existem utilizadores registados.</h2>";
    } else {
        // Existem utilizadores registados
        appContainer.innerHTML = `
            <h3>Lista de Utilizadores</h3>
            <table class="users_list">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telemovel</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;

        const usersList = appContainer.querySelector('table.users_list tbody');

        // Constroi as linhas da tabela com os dados dos utilizadores
        users.forEach((user) => {
            usersList.appendChild(createUserRow(user));
        });

        // Como existem vários botões delete o evento é definido na tag <table>
        // e depois o botão que foi clicado é apanhado no e.target
        const usersTable = appContainer.querySelector('table.users_list');
        usersTable.addEventListener("click", function(e){
            const delBtn = e.target.closest(".delete_button");
            const username = delBtn.dataset.username;
            if(!delBtn) return;

            showDeleteConfirmationMessage("Deseja eliminar o utilizador com username: "+username+"?")
            .then((confirmed)=> {
                if(confirmed){
                    const token = localStorage.getItem("token");
                    fetch(API_BASE_URL + "/users/" + username, {
                        method: 'DELETE',
                        headers: { "Authorization": "Bearer " + token },
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        if(data.success){
                            showSuccessMessage(data.message, "/users");
                        } else {
                            showErrorMessage(data.message);
                        }
                    })
                    .catch((err) => {
                        showErrorMessage(err);
                    });
                }
            });
        });
    }

    app.appendChild(appContainer);
}

export function paginaNaoEncontrada(app){
    const appContainer = document.createElement("DIV");
    appContainer.classList.add("app_container");

    appContainer.innerHTML = "<h2>Página não encontrada.</h2>";

    app.appendChild(appContainer);
}

export function editProfilePage(app, user){
    const appContainer = document.createElement("DIV");
    appContainer.classList.add("app_container");

    const header = createHeader("Editar Utilizador");
    appContainer.appendChild(header);

    const form = createForm("editar");

    const nomeInput = createTextFormElement("nome", "Nome:");
    nomeInput.querySelector("input").value = user.nome;
    form.appendChild(nomeInput);

    const telemovelInput = createNumberFormElement("telemovel", "Telemóvel:", 9);
    telemovelInput.querySelector("input").value = user.telemovel;
    form.appendChild(telemovelInput);

    const nifInput = createNumberFormElement("nif", "NIF (9 digitos):", 9);
    nifInput.querySelector("input").value = user.nif;
    form.appendChild(nifInput);

    const moradaInput = createTextFormElement("morada", "Morada:");
    moradaInput.querySelector("input").value = user.morada;
    form.appendChild(moradaInput);

    const editarBtn = createButton("editar", "editar", "Editar", "submit");
    form.appendChild(editarBtn);

    editarBtn.addEventListener("click", function(e){
        e.preventDefault();
            
        const formElements = document.getElementsByName("editar")[0];
        const allInputs = formElements.querySelectorAll("input");
            
        limparErros(allInputs);

        const isValid = validateFields(allInputs);

        if(isValid){
            const formData = buildFormData(allInputs);

            showLoadingMessage("A atualizar...");

            const token = localStorage.getItem("token");

            fetch(API_BASE_URL + "/users/editProfile", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    username: user.username,
                    nome: formData.get('nome'),
                    telemovel: formData.get('telemovel'),
                    nif: formData.get('nif'),
                    morada: formData.get('morada'),
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                if(data.success){
                    showSuccessMessage(data.message, "/login");
                } else {
                    if(data.errors){
                        showValidationErrors(data.errors);
                    } else {
                        showErrorMessage(data.message);
                    } 
                }
            })
            .catch((err) => {
                showErrorMessage(err);
            });
        }
    });

    const cancelButton = createButton("cancelar", "cancelar", "Cancelar");
    form.appendChild(cancelButton);

    cancelButton.addEventListener("click", function(e){
        e.preventDefault();
        navigate('/profile');
    });

    appContainer.appendChild(form);

    app.appendChild(appContainer);
}