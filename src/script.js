"use strict";
//после события "загрузка страницы" вызывается ф-ция init
window.onload = init; 
//получает все картинки по тегу, перебирает, навешивает ф-цию обратного вызова showAnswer
//т.е. обработчик (слушатель) на событие клик. При возникновении события вызывается showAnswer
function init() {
    var images = document.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++){
        images[i].onclick = showAnswer; 
    }
}
//массив с картами
let cards = ["0C", "0D", "0H", "0S", "QH"];

//добавляет в массив картинки из массива карт (доработка)
function addElemInArray() {
    let slide = new Array();
    for(let i=0; i<cards.length; i++){
        slide[i] = new Image();
        slide[i].src = "./img/cards/" + cards[i] + ".png";
        slide[i].name = cards[i];
}
    return slide;
}

//создает массив с парами карт
let pairCardArray = new Array();
pairCardArray.push(...addElemInArray());
pairCardArray.push(...addElemInArray());

//перемешивает массив
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

//перемешиваем массив
let shuffleArray = shuffle(pairCardArray);

//выводим картинки на экран (доработка)
function getImages(){
    for(let i=0; i<shuffleArray.length; i++){
    let img = document.createElement('img');
    img.src = shuffleArray[i].src;
    img.classList.add(shuffleArray[i].name);
    document.getElementById("container").appendChild(img);
}
}
getImages();
//поворот карты по клику (доработка)
function showAnswer(eventObj) {
    var image = eventObj.target;
    var name = image.id;
    name = "./img/cards/" + name + ".png";
    image.src = name;

    setTimeout(returnCard, 2000, image);
}