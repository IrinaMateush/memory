"use strict";

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

    сreateNewDeck: function(cardsDeck) {
        let shuffleCardsDeck = this.shuffle(cardsDeck);
        let pairsСards = new Array(); 
        for(let i=0; i<9; i++) {
            pairsСards.push(shuffleCardsDeck[i]);
        }
        pairsСards.push(...pairsСards);
        pairsСards = model.shuffle(pairsСards)
        return pairsСards; 
    },

    shuffle: function(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
    return a;
    },
};

let view = {
    displayCards: function() {
        let pairsСards = model.сreateNewDeck(model.cardsDeck);
        let cardsBack = new Array();
        for(let i=0; i<pairsСards.length; i++) {
            cardsBack[i] = new Image();
            cardsBack[i].setAttribute('alt', pairsСards[i]);
            cardsBack[i].src = "./img/cards/" + cardsBack[i].alt + ".png";
            document.getElementById("container").appendChild(cardsBack[i]);
            setTimeout(returnAll, 5000);
            //может заменить на анонимную или еще что?
            function returnAll(){
                cardsBack[i].src = "./img/cards/back.png"; 
             }
            }  
    },

    returnCards: function(eventObj) {
        let image = eventObj.target; //создали изображение за событием которого следим, таргет - информация по событию
        let name = "./img/cards/" + image.alt + ".png";
        image.src = name; 
        image.classList.toggle("front"); 
        model.openСardСounter++; 

        if (model.openСardСounter === 2){ 
            model.openСardСounter = 0;
            setTimeout(controller.matchChecker, 500);
        }
    },
    
    showScore: function() {
        let scoreTag = document.getElementById("score");
        scoreTag.innerHTML = model.score;
    }
};

let controller = {
    startOver: function() {
        location.reload();
    },

    handleRestart: function() {
        document.getElementById("restart").onclick = this.startOver;
    },

    handleClick: function() {
        let images = document.getElementsByTagName("img");
        for (let i = 0; i < images.length; i++){
            images[i].onclick = view.returnCards;
        }
    
    },

    matchChecker: function() {
        view.showScore();
        let images = document.getElementsByClassName("front");
        if (images[0].src ==  images[1].src) { 
            images[0].style.visibility = "hidden";
            images[1].style.visibility = "hidden";
            images[0].classList.toggle("front");
            images[0].classList.toggle("front");

            model.score = model.score + model.closedСardСounter * 42;
            model.winningsСounter++; 
            model.closedСardСounter--;
            view.showScore();

            if (model.winningsСounter == 9) {
                window.location.href = 'finalGame.html?='+model.score;           
            }

        } else { 
           images[0].src = "./img/cards/back.png";
           images[1].src = "./img/cards/back.png";
           images[0].classList.toggle("front");
           images[0].classList.toggle("front");
           
           if (model.score <= 0 ){
            model.score = 0;
            } else {
                model.score = model.score - model.winningsСounter * 42; 
                if (model.score <= 0 ){
                    model.score = 0;
                }
            }
            view.showScore();
        }
    }
};


window.onload = init;

function init() {
    view.displayCards();
    view.showScore();
    controller.handleClick();
    controller.handleRestart(); 
}