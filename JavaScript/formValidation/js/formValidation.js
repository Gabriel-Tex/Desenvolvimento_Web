class FormValidation{

    // =============== construtor ===============

    constructor(){
        this.form = document.querySelector("#form-container");
        this.events();
    }

    // =============== eventos ===============

    events(){
        this.form.addEventListener("submit", e => {
            this.handleSubmit(e);
        });
    }

    // =============== submissão ===============

    handleSubmit(e){
        e.preventDefault();

        const validFields = this.fieldValidation();
        const validPassword = this.passwordValidation();

        if(validFields && validPassword){
            alert("Formulário enviado");
            this.form.submit();
        }
    }

    // =============== exibição de erro ===============

    fieldError(field, msg){
        const div = document.createElement("div");
        div.innerHTML = msg;
        div.classList.add("error-text");

        field.insertAdjacentElement("afterend", div);
    }

    // =============== validação de senha ===============

    passwordValidation(){
        let valid = true;

        const password = this.form.querySelector("#password");
        const repeatedPassword = this.form.querySelector("#repeat-password");

        // verificando se ambas as senhas inseridas são iguais
        if(password.value !== repeatedPassword.value){
            valid = false;

            this.fieldError(password, "As senhas não correspondem.");
            this.fieldError(repeatedPassword, "As senhas não correspondem.");
            
        }

        // verificando tamanho da senha

        if(password.value.length < 8 || password.value.length > 32){
            valid = false;
            this.fieldError(password, "A senha deve conter de 8 a 32 caracteres. ");
        }

        // tudo válido
        return valid;
    }

    // =============== validação de usuário ===============

    userValidation(field){
        const user = field.value;
        let valid = true;

        // verificando tamanho do nome de usuário
        if(user.length < 5 || user.length > 15){
            this.fieldError(field, "Usuário deve conter de 5 a 15 caracteres.");
            valid = false;
        }

        // verificando caracteres do nome de usuário
        if(!user.match(/^[a-zA-Z0-9]+$/g)){
            this.fieldError(field, "Usuáro deve conter apenas letras ou números.");
            valid = false;
        }

        return valid;
    }

    // =============== validação de CPF ===============

    cpfValidation(field){
        const CPF = new CPFValidation(field.value);

        if(!CPF.valid()){
            this.fieldError(field, "CPF inválido.");
            return false;
        }
        return true;
    }

    // =============== validação de campos ===============

    fieldValidation(){
        let valid = true;

        // limpando mensagens de erro
        for(let errorText of this.form.querySelectorAll(".error-text")){
            errorText.remove();
        }

        
        for(let field of this.form.querySelectorAll(".validate")){
            const label = field.previousElementSibling.innerText;

            // verificando se campos estão vazios
            if(!field.value){
                this.fieldError(field, `"Campo ${label} não pode estar vazio.`);
                valid = false;
            }

            // validando CPF
            if(field.classList.contains("CPF")){
                if(!this.cpfValidation(field)) valid = false;
            }

            // validando usuário
            if(field.classList.contains("user")){
                if(!this.userValidation(field)) valid = false;
            }
        }

        return valid;
    }
}

const validation = new FormValidation();