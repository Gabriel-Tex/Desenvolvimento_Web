const HexaChar = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 
    "A", "B", "C", "D", "E", "F"];

const main = document.querySelector("#main-container");

const btn = main.querySelector("#btn");

const textColor = main.querySelector("#span-color")

btn.addEventListener("click", function(){

    let HexaText = "#";

    for(let i = 0; i < 6; ++i){
        let RandomNumber = Math.floor(Math.random() * HexaChar.length);
        HexaText += HexaChar[RandomNumber];
    }
    
    main.style.backgroundColor = HexaText;

    textColor.textContent = HexaText;
})