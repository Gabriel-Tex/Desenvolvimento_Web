let buttons = document.querySelectorAll(".drum");

for (let i = 0; i < buttons.length; ++i) {
    buttons[i].addEventListener("click", function () {
        let key = this.innerHTML;

        makeSound(key);

        buttonAnimation(key);

    });
}

document.addEventListener("keydown", function(event) {
    makeSound(event.key);

    buttonAnimation(event.key);
})

function makeSound(key) {
    switch (key) {
        case "w":
            new Audio("./sounds/tom-1.mp3").play()
            break;
        case "a":
            new Audio("./sounds/tom-2.mp3").play()
            break;
        case "s":
            new Audio("./sounds/tom-3.mp3").play()
            break;
        case "d":
            new Audio("./sounds/tom-4.mp3").play()
            break;
        case "j":
            new Audio("./sounds/snare.mp3").play()
            break;
        case "k":
            new Audio("./sounds/crash.mp3").play()
            break;
        case "l":
            new Audio("./sounds/kick-bass.mp3").play()
            break;
        default:
            break;
    }
}

function buttonAnimation(currentKey){
    buttonPressed = document.querySelector("." + currentKey);
    buttonPressed.classList.add("pressed");

    setTimeout( function () {
        buttonPressed.classList.remove("pressed");
    }, 200);
  
}