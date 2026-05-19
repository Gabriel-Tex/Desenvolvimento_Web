
// ========= PLAYER 1 =========

let randomNumber1 = Math.floor(Math.random() * 6) + 1;

let randomDiceImage1 = "dice" + randomNumber1 + ".png";

let randomImageSource1 = "../assets/" + randomDiceImage1;

let image1 = document.querySelectorAll("img")[0];

image1.setAttribute("src", randomImageSource1);

// ========= PLAYER 2 =========
 
let randomNumber2 = Math.floor(Math.random() * 6) + 1;

let randomDiceImage2 = "dice" + randomNumber2 + ".png";

let randomImageSource2 = "../assets/" + randomDiceImage2;

let image2 = document.querySelectorAll("img")[1];

image2.setAttribute("src", randomImageSource2);

// ========= GAME =========

if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "O jogador 1 venceu";
}
else if (randomNumber1 < randomNumber2) {
    document.querySelector("h1").innerHTML = "O jogador 2 venceu";
}
else {
    document.querySelector("h1").innerHTML = "Empate";
}