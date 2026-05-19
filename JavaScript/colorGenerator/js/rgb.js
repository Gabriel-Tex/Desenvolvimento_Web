const main = document.querySelector("#main-container");

const btn = main.querySelector("#btn");

const textColor = main.querySelector("#span-color")

btn.addEventListener("click", function(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let color = `rgb(${r}, ${g}, ${b})`;
    
    main.style.backgroundColor = color;

    textColor.textContent = color;
})