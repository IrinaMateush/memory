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
//перемешиваем массив с картами 
let shuffleCardsDeck = shuffle(cardsDeck);
console.log(shuffleCardsDeck);
//создаем новый массив для двух пар карт (6 карт)
let pairsСards = new Array(); 
for(let i=0; i<3; i++){
    pairsСards.push(shuffleCardsDeck[i]) //берем первые 2 элемента из перемешанной колоды
}
pairsСards.push(...pairsСards);
//перемешивает отобранные карты 
shuffle(pairsСards);
console.log(pairsСards);

//выводим картинки на экран рубашкой вверх с нужным атрибутом
function getImages(){
    let cardsBack = new Array();
    for(let i=0; i<pairsСards.length; i++){
        cardsBack[i] = new Image();
        cardsBack[i].setAttribute('alt', pairsСards[i]);
        cardsBack[i].src = "./img/cards/back.png"; 
        document.getElementById("container").appendChild(cardsBack[i]);
    }   
}

getImages();


let testChecked;
//поворот карты по клику 
function turnCard(eventObj) {
    let image = eventObj.target; //создали изображение за событием которого следим, таргет - информация по событию
  //  if (!image.classList.contains("front")) {
        let name = "./img/cards/" + image.alt + ".png";
        image.src = name; //меняем Src на фронт карты
        image.classList.toggle("front"); //добавляем класс
        frontCounter++; //за чем он следит?

        if (frontCounter%2 == 0){ //может просто сравнения с 2 достаточно?
            console.log("поворот");
            frontCounter = 0;
            setTimeout(ret, 1000);
        }
    } 

// удалить элементы из дом если у них 1 src, если нет, то поворот доработать!
    
    function ret() {
        let images = document.getElementsByClassName("front");
        console.log(images); //ок
        if (images[0].src ==  images[1].src){ //ок
            document.getElementById("container").removeChild(images[0]);
            document.getElementById("container").removeChild(images[0]);
        } else { //ок
           images[0].src = "./img/cards/back.png";
           images[1].src = "./img/cards/back.png";
           images[0].classList.toggle("front");
           images[0].classList.toggle("front");

           
        
    }
}


