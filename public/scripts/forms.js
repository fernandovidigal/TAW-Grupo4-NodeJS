const createHeader = (header) => {
    const headerElement = document.createElement("H3");
    headerElement.textContent = header;

    return headerElement;
}

const createFormWrapper = (nome) => {
    const formWrapper = document.createElement("FORM");
    formWrapper.setAttribute("name", nome);

    return formWrapper;
}

const createLabelElement = (nome, label) => {
    const formLabel = document.createElement("LABEL");
    formLabel.setAttribute("for", nome);
    formLabel.textContent = label;

    return formLabel;
}

const createErrorElement = (message = "") => {
    const errorElement = document.createElement("SMALL");
    errorElement.textContent = message;
    errorElement.classList.add("valid-error", "hidden");

    return errorElement;
}

const createFormControlElement = () => {
    const formControl = document.createElement("DIV");
    formControl.classList.add("form_control");

    return formControl;
}

const createTextFormElement = (nome, label, tipo = "text") => {
    const textInputElement = createFormControlElement();

    const textInputLabel = createLabelElement(nome, label);
    textInputElement.appendChild(textInputLabel);

    const textInput = document.createElement("INPUT");
    textInput.setAttribute("type", tipo);
    textInput.setAttribute("name", nome);
    textInput.setAttribute("id", nome);
    textInputElement.appendChild(textInput);

    const errorLabel = createErrorElement();
    textInputElement.appendChild(errorLabel);

    return textInputElement;
}

const createFileUploadElement = (nome, label) => {
    const fileUploadElement = createFormControlElement();

    const fileUploadLabel = createLabelElement(nome, label);
    fileUploadElement.appendChild(fileUploadLabel);

    const fileUploadInput = document.createElement("INPUT");
    fileUploadInput.setAttribute("type", "file");
    fileUploadInput.setAttribute("name", nome);
    fileUploadInput.setAttribute("id", nome);
    fileUploadElement.appendChild(fileUploadInput);

    const errorLabel = createErrorElement();
    fileUploadElement.appendChild(errorLabel);

    return fileUploadElement;
}

const createNumberFormElement = (nome, label, max = 0) => {
    const numberInputElement = createFormControlElement();

    const numberInputLabel = createLabelElement(nome, label);
    numberInputElement.appendChild(numberInputLabel);

    const numberInput = document.createElement("INPUT");
    numberInput.setAttribute("type", "number");
    numberInput.setAttribute("name", nome);
    numberInput.setAttribute("id", nome);
    if(max && max > 0){
        numberInput.addEventListener("input", function(e){
            if (this.value.length > max) {
                this.value = this.value.slice(0, max);
            }
        });
    }
    numberInputElement.appendChild(numberInput);

    const errorLabel = createErrorElement();
    numberInputElement.appendChild(errorLabel);

    return numberInputElement;
}

const createTableRow = (label, value) => {
    const tableTR = document.createElement("TR");

    const tableLabelTD = document.createElement("TD");
    tableLabelTD.textContent = label;
    tableTR.appendChild(tableLabelTD);

    const tableValueTD = document.createElement("TD");
    tableValueTD.textContent = value;
    tableTR.appendChild(tableValueTD);
    
    return tableTR;
}

const createButton = (nome, className, textContent, tipo = "button") => {
    const button = document.createElement("BUTTON");
    button.setAttribute("type", tipo);
    button.setAttribute("name", nome);
    button.setAttribute("class", className);
    button.textContent = textContent;

    return button;
}

/*const createFormRegisto = (formContainer) => {
    const formHeader = createFormHeader("Registo de Novo Utilizador");
    formContainer.appendChild(formHeader);

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

    const button = createButton("mudar_login", "mudar_login", "Mudar para Login");
    formWrapper.appendChild(button);

    formContainer.appendChild(formWrapper);
}*/

/*const createFormLogin = (formContainer) => {
    const formHeader = createFormHeader("Login");
    formContainer.appendChild(formHeader);

    const formWrapper = createFormWrapper("login");

    const usernameInput = createTextFormElement("username", "Username:");
    formWrapper.appendChild(usernameInput);

    const passwordInput = createTextFormElement("password", "Password:", "password");
    formWrapper.appendChild(passwordInput);

    const entrarBtn = createButton("entrar", "entrar", "Entrar", "submit");
    formWrapper.appendChild(entrarBtn);

    const button = createButton("mudar_registo", "mudar_registo", "Mudar para Registo");
    formWrapper.appendChild(button);

    formContainer.appendChild(formWrapper);
}*/