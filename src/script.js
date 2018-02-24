"use strict";
//после события "загрузка страницы" вызывается ф-ция init
window.onload = init; 
//получает все картинки по тегу, перебирает, навешивает ф-цию обратного вызова showFront
//т.е. обработчик (слушатель) на событие клик. При возникновении события вызывается showFront

let score = 0;
let openСardСounter = 0; 
let closedСardСounter = 9;
let winningsСounter = 0;

let scoreTag = document.getElementById("score");

scoreTag.innerHTML = score;

function init() {
    let images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++){
        images[i].onclick = turnCard; 
    }

    let atFirstButton = document.getElementById("restart");
    atFirstButton.onclick = atFirst;
}

function atFirst(eventObj){
    let rarara = eventObj.target;
    location.reload();
}


//поворот карты по клику 
function turnCard(eventObj) {
    let image = eventObj.target; //создали изображение за событием которого следим, таргет - информация по событию
        let name = "./img/cards/" + image.alt + ".png";
        image.src = name; //меняем Src на фронт карты
        image.classList.toggle("front"); //добавляем класс
        openСardСounter++; //за чем он следит?

        if (openСardСounter%2 == 0){ //может просто сравнения с 2 достаточно?
            openСardСounter = 0;
            setTimeout(ret, 500);
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
let cardsDeck = ["0C", "0D", "0H", "0S", "2C", "2D", "2H", "2S", 
"3C", "3D", "3H", "3S", "4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S",
"6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S", "8C", "8D", "8H", "8S",
"9C", "9D", "9H", "9S", "AC", "AD", "AH", "AS", "JC", "JD", "JH", "JS",
"KC", "KD", "KH", "KS", "QC", "QD", "QH", "QS"];

//перемешиваем массив с картами 
let shuffleCardsDeck = shuffle(cardsDeck);
//создаем новый массив для двух пар карт (6 карт)
let pairsСards = new Array(); 
for(let i=0; i<9; i++){
    pairsСards.push(shuffleCardsDeck[i]) //берем первые 2 элемента из перемешанной колоды
}
pairsСards.push(...pairsСards);
//перемешивает отобранные карты 
shuffle(pairsСards);

//выводим картинки на экран рубашкой вверх с нужным атрибутом
function getImages(){
    let cardsBack = new Array();
    for(let i=0; i<pairsСards.length; i++){
        cardsBack[i] = new Image();
        cardsBack[i].setAttribute('alt', pairsСards[i]);
        setTimeout(returnAll, 5000);
        cardsBack[i].src = "./img/cards/" + cardsBack[i].alt + ".png";
        document.getElementById("container").appendChild(cardsBack[i]);
        //функция внутри функции, а как красиво делать?
        function returnAll(){
            cardsBack[i].src = "./img/cards/back.png"; 
        }
    }   
}

getImages();

// проверка совпадения и подсчет очков 
    
    function ret() {
        let images = document.getElementsByClassName("front");
        if (images[0].src ==  images[1].src){ //ок
            images[0].style.visibility = "hidden";
            images[1].style.visibility = "hidden";
            images[0].classList.toggle("front");
            images[0].classList.toggle("front");
            score = score + closedСardСounter * 42;
            winningsСounter++; 
            closedСardСounter--;
            scoreTag.innerHTML = score;
            // если количество карт = кол-ву исходных карт, то переходим на финалку
            if (winningsСounter == 9){
            window.location.href = 'finalGame.html?='+score;           
            }

        } else { //ок
           images[0].src = "./img/cards/back.png";
           images[1].src = "./img/cards/back.png";
           images[0].classList.toggle("front");
           images[0].classList.toggle("front");
           

           if (score <= 0 ){
            score = 0;
            } else {
                score = score - winningsСounter * 42; 
                if (score <= 0 ){
                    score = 0;
                }
            }
    scoreTag.innerHTML = score;

}
}
