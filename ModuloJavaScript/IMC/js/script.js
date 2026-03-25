function local(){
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e){
        e.preventDefault();
        
        const inputHeight = form.querySelector("#altura");
        const inputWidth = form.querySelector("#peso");

        const height = Number(inputHeight.value);
        const width = Number(inputWidth.value);

        if(!height || !width || height < 0 || width < 0){
            setResult("Inválido", false);
            return;
        }

        const IMC = getIMC(height, width);
        const result = getResultIMC(IMC);

        const text = `Seu IMC é ${IMC.toFixed(2)} (${result})`
        setResult(text, true);
    });
}

// function to get IMC
function getIMC(height, width){
    return width / (height ** 2);
}

// function to get result
function getResultIMC(IMC){

    if(IMC <= 0) return "Inválido";
    else if(IMC < 18.5) return "Abaixo do peso";
    else if (IMC < 24.9) return "Peso normal";  
    else if(IMC < 29.9) return "Sobrepeso";
    else if(IMC < 34.9) return "Obesidade grau 1";
    else if(IMC < 40) return "Obesidade grau 2"; 
    else if(IMC >= 40) return "Obesidade grau 3";
    return "Inválido";
}

// function to create paragraph
function createParagraph(){
    return document.createElement("p");
}

// function to set result
function setResult(text, isValid){
    const result = document.querySelector("#result-container");
    result.innerHTML = "";

    const p = createParagraph();

    if(isValid){
        p.classList.add("valid-result")
    } else{
        p.classList.add("invalid-result")
    }

    p.innerHTML = text;
    result.appendChild(p);
}

local();