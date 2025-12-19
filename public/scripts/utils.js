const cleanHTML = () => {
    if(formContainer){
        formContainer.innerHTML = "";
    }
}

// Limpa os erros de validação
const limparErros = (inputs) => {
    inputs.forEach((input) => {
        if(input.classList.contains('input-error')){
            input.classList.remove("input-error");
        }

        const parent = input.parentNode;
        const errorElement = parent.querySelector("small");
        errorElement.textContent = "";
        errorElement.classList.add("hidden");
    });
}