"use strict";

 let cardsDeck = ["0C", "0D", "0H", "0S", "2C", "2D", "2H", "2S", 
"3C", "3D", "3H", "3S", "4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S",
"6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S", "8C", "8D", "8H", "8S",
"9C", "9D", "9H", "9S", "AC", "AD", "AH", "AS", "JC", "JD", "JH", "JS",
"KC", "KD", "KH", "KS", "QC", "QD", "QH", "QS"];

let score = 0;
let openСardСounter = 0;
let closedСardСounter = 9;
let winningsСounter = 0;

     function сreateNewDeck(cardsDeck) {
        let shuffleCardsDeck = shuffle(cardsDeck);
        let pairsСards = new Array(); 
        for(let i=0; i<9; i++) {
            pairsСards.push(shuffleCardsDeck[i]);
        }
        pairsСards.push(...pairsСards);
        pairsСards = shuffle(pairsСards)
        return pairsСards; 
    }

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
    return a;
    }

     function displayCards() {
        let pairsСards = сreateNewDeck(cardsDeck);
        let cardsBack = new Array();
        for(let i=0; i<pairsСards.length; i++) {
            cardsBack[i] = new Image();
            cardsBack[i].setAttribute('alt', pairsСards[i]);
            cardsBack[i].src = "./img/cards/" + cardsBack[i].alt + ".png";
            document.getElementById("container").appendChild(cardsBack[i]);
            setTimeout(returnAll, 5000);
            function returnAll() {
                cardsBack[i].src = "./img/cards/back.png"; 
            }
        }  
    }

    function returnCards(eventObj) {
        let image = eventObj.target; 
        let name = "./img/cards/" + image.alt + ".png";
        image.src = name; 
        image.classList.toggle("front"); 
        openСardСounter++; 

        if (openСardСounter === 2){ 
            openСardСounter = 0;
            setTimeout(matchChecker, 500);
        }
    }
    
    function startOver() {
        location.reload();
    }

    function handleRestart() {
        document.getElementById("restart").onclick = startOver;
    }

    function handleClick() {
        let images = document.getElementsByTagName("img");
        for (let i = 0; i < images.length; i++) {
            images[i].onclick = returnCards;
        }
    }

    function showScore(score) {
        let scoreTag = document.getElementById("score");
        scoreTag.innerHTML = score;
    }
    
    function addScore(score, closedСardСounter) {
        score = score + closedСardСounter * 42;
        return score;        
    }

    function replaceScore(score, winningsСounter) {
        if (score <= 0 ){
            score = 0;
            } else {
                score = score - winningsСounter * 42; 
                if (score <= 0 ){
                    score = 0;
                }
            }
            return score;       
    }

    function matchChecker() {
        showScore();
        let images = document.getElementsByClassName("front");
        if (images[0].src ==  images[1].src) { 
            images[0].style.visibility = "hidden";
            images[1].style.visibility = "hidden";
            images[0].classList.toggle("front");
            images[0].classList.toggle("front");
            score = addScore(score, closedСardСounter);
            winningsСounter++; 
            closedСardСounter--;
            showScore(score);
            if (winningsСounter == 9) {
                window.location.href = 'finalGame.html?='+score;           
            }

        } else { 
           images[0].src = "./img/cards/back.png";
           images[1].src = "./img/cards/back.png";
           images[0].classList.toggle("front");
           images[0].classList.toggle("front");
           score = replaceScore(score, winningsСounter);
           showScore(score);
        }
    }

window.onload = init;

function init() {
    displayCards();
    showScore(score);
    handleClick();
    handleRestart(); 
}