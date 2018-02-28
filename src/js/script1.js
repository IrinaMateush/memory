"use strict";

let view = {
   
    startOver: function() {
        location.reload();
    },

    сreateNewDeck: function(cardsDeck) {
        let shuffleCardsDeck = model.shuffle(cardsDeck);
        let pairsСards = new Array(); 
        for(let i=0; i<9; i++) {
            pairsСards.push(shuffleCardsDeck[i]);
         }
        pairsСards.push(...pairsСards);
        pairsСards = model.shuffle(pairsСards)
        return pairsСards; 
    },

    displayCards: function(pairsСards) {
        let cardsBack = new Array();
        for(let i=0; i<pairsСards.length; i++) {
            cardsBack[i] = new Image();
            cardsBack[i].setAttribute('alt', pairsСards[i]);
            cardsBack[i].src = "./img/cards/" + cardsBack[i].alt + ".png";
            document.getElementById("container").appendChild(cardsBack[i]);
            //функция внутри функции, а как красиво делать?
            setTimeout(returnAll, 5000);
            function returnAll(){
                cardsBack[i].src = "./img/cards/back.png"; 
             }
            }  
    },

    //поворот карты по клику
    returnCards: function(eventObj) {
        
        let image = eventObj.target; //создали изображение за событием которого следим, таргет - информация по событию
        let name = "./img/cards/" + image.alt + ".png";
        image.src = name; //меняем Src на фронт карты
        image.classList.toggle("front"); //добавляем класс
        model.openСardСounter++; //за чем он следит?

        if (model.openСardСounter%2 == 0){ //может просто сравнения с 2 достаточно?
            model.openСardСounter = 0;
            setTimeout(model.matchChecker, 500);
        }
    }
}

let model = {
    score: 0,
    openСardСounter: 0,
    closedСardСounter: 9,
    winningsСounter: 0,
    cardsDeck: ["0C", "0D", "0H", "0S", "2C", "2D", "2H", "2S", 
"3C", "3D", "3H", "3S", "4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S",
"6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S", "8C", "8D", "8H", "8S",
"9C", "9D", "9H", "9S", "AC", "AD", "AH", "AS", "JC", "JD", "JH", "JS",
"KC", "KD", "KH", "KS", "QC", "QD", "QH", "QS"],

    shuffle: function(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
    return a;
    },

    matchChecker: function(){
        let scoreTag = document.getElementById("score");
        scoreTag.innerHTML = score;

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
}

let controller = {

    listenerRestart: function() {
        document.getElementById("restart").onclick = view.startOver;
    },

    listenerClick: function() {
        let images = document.getElementsByTagName("img");
        for (let i = 0; i < images.length; i++){
            images[i].onclick = view.returnCards;
        }
    
    }
    
};


controller.listenerRestart(); 


//получает все картинки по тегу, перебирает, навешивает ф-цию обратного вызова showFront
//т.е. обработчик (слушатель) на событие клик. При возникновении события вызывается showFront

//создали новую колоду, возвращает pairsСards
let newDesk = view.сreateNewDeck(model.cardsDeck);
let newDesk2 =  view.displayCards(newDesk);
controller.listenerClick();

