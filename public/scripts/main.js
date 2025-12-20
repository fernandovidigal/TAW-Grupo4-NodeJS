/*const formContainer = document.querySelector('.main_container');


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
}*/