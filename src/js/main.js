'use strict';

console.log ("Hello World!");

function something (){
    let x = 5;
    let y = 10; 
}

const burgerOpen = document.querySelector("#burger-open");
const burgerClose = document.querySelector("#burger-close");
const burgerMenu = document.querySelector("#burger-menu");

burgerOpen.addEventListener("click", function onclick(event) {
    event.preventDefault();
    burgerMenu.style.display = "block";
  });

burgerClose.addEventListener("click", function onclick(event) {
    event.preventDefault();
    burgerMenu.style.display = "none";

});

