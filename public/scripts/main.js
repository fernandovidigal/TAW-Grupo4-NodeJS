const formContainer = document.querySelector('.main_container');









// Mesma explicação que a função anterior, mas neste caso para os campos de registo
const validateFields = (inputs) => {
    allFieldsValid = true;

    inputs.forEach((input) => {
        switch(input.name){
            case "username":
                const isUsernameValid = validarUsername(input.value);
                allFieldsValid = !allFieldsValid ? false : isUsernameValid;
                if(!isUsernameValid) mostrarErro("Username inválido", input);
                break;
            case "password":
                const isPasswordValid = validarPassword(input.value);
                allFieldsValid = !allFieldsValid ? false : isPasswordValid;
                if(!isPasswordValid) mostrarErro("Minímo de 6 caracteres", input);
                break;
            case "foto":
                const isFotoValid = validaFotografia();
                allFieldsValid = !allFieldsValid ? false : isFotoValid;
                if(!isFotoValid) mostrarErro("Fotografia inválida", input);
                break;
            case "nome":
                const isNomeValid = validarNome(input.value);
                allFieldsValid = !allFieldsValid ? false : isNomeValid;
                if(!isNomeValid) mostrarErro("Nome inválido", input);
                break;
            case "email":
                const isEmailValid = validarEmail(input.value);
                allFieldsValid = !allFieldsValid ? false : isEmailValid;
                if(!isEmailValid) mostrarErro("Email inválido", input);
                break;
            case "telemovel":
                const isTelemovelValid = validarNumerosTelemovel(input.value);
                allFieldsValid = !allFieldsValid ? false : isTelemovelValid;
                if(!isTelemovelValid) mostrarErro("Número de telemóvel inválido", input);
                break;
            case "nif":
                const isNIFValid = validarNumerosNoveDigitos(input.value);
                allFieldsValid = !allFieldsValid ? false : isNIFValid;
                if(!isNIFValid) mostrarErro("NIF inválido", input);
                break;
            case "morada":
                const isMoradaValid = validaTexto(input.value);
                allFieldsValid = !allFieldsValid ? false : isMoradaValid;
                if(!isMoradaValid) mostrarErro("Morada inválida", input);
                break;
            default:
                break;
        }
    });

    return allFieldsValid;
}

// Converte o ficheiro de imagem carregado para Base64
// foi necessário esta conversão porque por segurança dos browsers, estes
// não têm permissão para ler ficheiros locais.
// Foi necessário utilizar promise porque a função readAsDataURL() é assíncrona
const convertFotoToBase64 = () => {
    const file = document.getElementById("foto").files[0];

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function(event) {
            // Retorna o Base64 através do resolve
            resolve(event.target.result);
        };

        reader.onerror = function(error) {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}

// Obtem todos os utilizadores registados no localStorage
const getAllUsers = () => {
    const allUsers = localStorage.getItem("utilizadores");

    return JSON.parse(allUsers) || [];
}

// Constroi o objeto com os dados do utilizador
const buildUserData = (inputs) => {
    const userData = {};
    
    inputs.forEach((input) => {
        userData[input.name] = input.value;
    });

    return userData;
}

// Verifica se o utilizador (username ou email) já existem no localStorage
// evita registos com usernames ou emails duplicados
const checkUserExists = (user, allUsers) => {
    if(allUsers.length == 0) return false;

    let userExists = false;

    for(let i = 0; i < allUsers.length; i++){
        if(allUsers[i].username === user.username || allUsers[i].email === user.email){
            userExists = true;
            break;
        }
    }

    return userExists;
}

// Valida as credenciais introduzidas pelo utilizador
const checkValidUserCredentials = (user, allUsers) => {
    let userData = {};

    for(let i = 0; i < allUsers.length; i++){
        if(allUsers[i].username === user.username && allUsers[i].password === user.password){
            // Copia o objeto encontrado para dentro do objeto vazio
            userData = { ...allUsers[i]};
        }
    }

    return userData;
}

// Cria o formulário de login quando o DOM é carregado
document.addEventListener('DOMContentLoaded', function(e){
    cleanHTML();
    createFormLogin(formContainer);
});

const buildProfilePage = () => {
    cleanHTML();

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

    const profileHeader = document.createElement("H3");
    profileHeader.textContent = "Olá " + user.nome;
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


    // TODO: FALTA O RESTO DO LAYOUT
    
}

if(formContainer){
    formContainer.addEventListener("click", async function(e){
        
        // Quando se carrega no botão para mudar para o formulário de registo
        if(e.target.classList.contains("mudar_registo")){
            e.preventDefault();
            cleanHTML();
            createFormRegisto(formContainer);
        } else if(e.target.classList.contains("mudar_login")){ // Quando se carrega no botão para mudar para o formulário de login
            e.preventDefault();
            cleanHTML();
            createFormLogin(formContainer);
        } else if(e.target.classList.contains("entrar")){ // Quando se carrega no botão para fazer login
            e.preventDefault();

            const formElements = document.getElementsByName("login")[0];
            const allInputs = formElements.querySelectorAll("input");

            limparErros(allInputs);

            const isValid = validateLoginFields(allInputs);

            if(isValid) {
                const allUsers = getAllUsers();
                const loginUser = buildUserData(allInputs);

                const isValidUser = checkValidUserCredentials(loginUser, allUsers);

                if(Object.keys(isValidUser).length > 0) {
                    localStorage.setItem("utilizador", JSON.stringify(isValidUser));
                    buildProfilePage();
                } else {
                    alert("Credenciais inválidas");
                }
            }

        } else if(e.target.classList.contains("registar")){ // Quando se carrega no botão para fazer o registo
            e.preventDefault();
            
            const formElements = document.getElementsByName("registo")[0];
            const allInputs = formElements.querySelectorAll("input");
            
            limparErros(allInputs);

            const isValid = validateFields(allInputs);

            if(isValid){
                const allUsers = getAllUsers();

                const user = buildUserData(allInputs);
                user.foto = await convertFotoToBase64();
                const userExists = checkUserExists(user, allUsers);

                if(!userExists){
                    allUsers.push(user);

                    localStorage.setItem("utilizador", JSON.stringify(user));
                    localStorage.setItem("utilizadores", JSON.stringify(allUsers));
                    
                    window.location.replace("/profile.html");
                } else {
                    alert("Já existe um utilizador com o username e/ou email indicado(s)");
                }
            }
        }
    });
}