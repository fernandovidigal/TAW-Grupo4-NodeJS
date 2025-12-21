export function createHeader(header){
    const headerElement = document.createElement("H3");
    headerElement.textContent = header;

    return headerElement;
}

export function createForm(nome){
    const formWrapper = document.createElement("FORM");
    formWrapper.setAttribute("name", nome);

    return formWrapper;
}

export function createLabelElement(nome, label){
    const formLabel = document.createElement("LABEL");
    formLabel.setAttribute("for", nome);
    formLabel.textContent = label;

    return formLabel;
}

export function createErrorElement(message = ""){
    const errorElement = document.createElement("SMALL");
    errorElement.textContent = message;
    errorElement.classList.add("valid-error", "hidden");

    return errorElement;
}

export function createFormControlElement(){
    const formControl = document.createElement("DIV");
    formControl.classList.add("form_control");

    return formControl;
}

export function createTextFormElement(nome, label, tipo = "text"){
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

export function createFileUploadElement(nome, label){
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

export function createNumberFormElement(nome, label, max = 0){
    const numberInputElement = createFormControlElement();

    const numberInputLabel = createLabelElement(nome, label);
    numberInputElement.appendChild(numberInputLabel);

    const numberInput = document.createElement("INPUT");
    numberInput.setAttribute("type", "number");
    numberInput.setAttribute("name", nome);
    numberInput.setAttribute("id", nome);
    // Se foi indicado um número máximo de caracteres, apenas essa quantidade de digitos é permitida
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

export function createTableRow(label, value){
    const tableTR = document.createElement("TR");

    const tableLabelTD = document.createElement("TD");
    tableLabelTD.textContent = label;
    tableTR.appendChild(tableLabelTD);

    const tableValueTD = document.createElement("TD");
    tableValueTD.textContent = value;
    tableTR.appendChild(tableValueTD);
    
    return tableTR;
}

export function createButton(nome, className, textContent, tipo = "button"){
    const button = document.createElement("BUTTON");
    button.setAttribute("type", tipo);
    button.setAttribute("name", nome);
    button.setAttribute("class", className);
    button.textContent = textContent;

    return button;
}