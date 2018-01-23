"use strict";
//после события "загрузка страницы" вызывается ф-ция init
window.onload = init; 
//получает все картинки по тегу, перебирает, навешивает ф-цию обратного вызова showFront
//т.е. обработчик (слушатель) на событие клик. При возникновении события вызывается showFront
let frontCounter = 0;

function init() {
    var images = document.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++){
        images[i].onclick = turnCard; 
    }
}

//перемешивает массив
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

//массив с картами
let cardsDeck = ["0C", "0D", "0H", "0S", "QH", "QS", "QD"];
console.log(cardsDeck);
let shuffleCardsDeck = shuffle(cardsDeck);
console.log(shuffleCardsDeck);

//создает массив с парами отобранных карт, добавляет им картинки Src
let pairsСards = new Array(); 
for(let i=0; i<2; i++){
    pairsСards.push(shuffleCardsDeck[i])
    pairsСards[i] = new Image();
    pairsСards[i].src = "./img/cards/" + cardsDeck[i] + ".png";
    pairsСards[i].name = cardsDeck[i];
}

pairsСards.push(...pairsСards);
//перемешивает отобранные карты 
shuffle(pairsСards);
console.log(pairsСards);

//выводим картинки на экран
function getImages(){
    for(let i=0; i<pairsСards.length; i++){
    let img = document.createElement('img'); //создали картинку
    img.src = "./img/cards/back.png"; 
    img.setAttribute('alt', pairsСards[i].name);
    document.getElementById("container").appendChild(img); //выводим на экран
}
}
getImages();

let testChecked;
//поворот карты по клику 
function turnCard(eventObj) {
    let image = eventObj.target; //создали изображение за событием которого следим, таргет - информация по событию
  //  if (!image.classList.contains("front")) {
        let name = image.alt;
        name = "./img/cards/" + name + ".png";
        image.src = name;
        image.classList.toggle("front");
        frontCounter++;
        console.log(frontCounter);
        if (frontCounter%2 == 0){
            console.log("поворот");
            frontCounter = 0;
            image.classList.toggle("front");
            setTimeout(ret, 1000);
            
        }
    } 

function ret() {
    let images = document.getElementsByClassName("front");
    if (images[0].src ==  images[1].src){
        alert("победа!"); } else{
            for (let i = 0; i < images.length; i++){
                images[i].src = "./img/cards/back.png"; 
            }
        }
    }
    



