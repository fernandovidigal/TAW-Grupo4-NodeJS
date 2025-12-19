const validarUsername = (username) => {
    // Só contém letras, números, _ ou -
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) return false;

    // Tamanho mínimo
    if (username.length < 3) return false;

    return true;
}

const validarPassword = (password) => {
    // Tamanho mínimo
    if (password.length < 6) return false;

    return true;
}

const validaFotografia = () => {
    const imageInput = document.getElementById("foto");

    // Verificar se existe ficheiro
    if (!imageInput || !imageInput.files || imageInput.files.length === 0) {
        return false;
    }

    const file = imageInput.files[0];

    // Tipos de imagem permitidos
    const tiposValidos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!tiposValidos.includes(file.type)) return false;

    return true;
}

const validarNome = (nome) => {
    // Só contém letras, números, _ ou -
    if (!/^[a-zA-Z_\- ]+$/.test(nome)) return false;

    // Tamanho mínimo
    if (nome.length < 3) return false;

    return true;
}

const validarEmail = (email) => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return false;

    return true;
}

const validarNumerosTelemovel = (numero) => {
    // Números que começam por 9 seguidos de 8 digitos
    if (!/^9[0-9]{8}$/.test(numero)) return false;

    return true;
}

const validarNumerosNoveDigitos = (numero) => {
    // Números e 9 digitos
    if (!/^[0-9]{9}$/.test(numero)) return false;

    return true;
}

const validaTexto = (texto) => {
    // O texto deve ter 3 ou mais caracteres
    if(texto.length < 3) return false;

    return true
}

// Mostra a mensagem de erro da validação dos campos
const mostrarErro = (mensagem, input) => {
    input.classList.add("input-error");

    const parent = input.parentNode;

    const errorElement = parent.querySelector("small");
    errorElement.classList.remove("hidden");
    errorElement.textContent = "";
    errorElement.textContent = mensagem;
}

// Valida os campos de login
// allFieldsValid mantem o estado da validação, ou seja, a partir do momento
// que um campo tem erros esta variável fica com o valor falso e mantêm-se assim até ao final
// porque pelo menos um campo tem erro
const validateLoginFields = (inputs) => {
    allFieldsValid = true;

    inputs.forEach((input) => {
        switch(input.name){
            case "username":
                const isUsernameValid = validarUsername(input.value);
                allFieldsValid = !allFieldsValid ? false : isUsernameValid;
                if(!isUsernameValid) mostrarErro("Username inválido", input);
                break;
            case "password":
                const isNotEmptyPassword = input.value.length > 0 ? true : false;
                allFieldsValid = !allFieldsValid ? false : isNotEmptyPassword;
                if(!isNotEmptyPassword) mostrarErro("Deve preencher a password", input);
                break;
            default:
                break;
        }
    });

    return allFieldsValid;  
}

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