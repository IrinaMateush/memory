"use strict";

window.onload = init;

function init() {
    var images = document.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++){
        images[i].onclick = showAnswer; 
    }
}

function showAnswer(eventObj) {
    var image = eventObj.target;
    var name = image.id;
    name = "./img/cards/" + name + ".png";
    image.src = name;

    setTimeout(returnCard, 2000, image);
}




let cards = ["0C", "0D", "0H", "0S"];
//перемешивает массив
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

//добавляет в массив картинки из массива карт
let addElemInArray = function() {
    let slide = new Array();
    for(let i=0; i<cards.length; i++){
        slide[i] = new Image();
        slide[i].src = "./img/cards/" + cards[i] + ".png";
        slide[i].name = cards[i];
}
    return slide;
}

//создает массив с парами карт
let hh = new Array();
hh.push(...addElemInArray());
hh.push(...addElemInArray());

//перемешиваем массив
let tete = shuffle(hh);

//выводим картинки на экран
function getImages(){
    for(let i=0; i<tete.length; i++){
    let img = document.createElement('img');
    img.src = tete[i].src;
    img.classList.add(tete[i].name);
    document.getElementById("container").appendChild(img);
}
}
getImages();

