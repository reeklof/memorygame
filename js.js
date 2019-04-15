var points = 0;
var timerInt = '';
var timer = 30;
var cards = document.querySelectorAll('.container');
var isFlipped = false;
var firstC, secondC; 
var modal = document.getElementById('myModal');

//countdown
var countdown = document.getElementById('timer');
var score = document.getElementById("result");
score.innerHTML = points;

countdown.textContent = timer;

    timerInt = setInterval (() => {
        timer = --timer;
        countdown.textContent = timer;
        if(timer == 0) {
            clearInterval(timerInt);
            document.getElementsByTagName('svg')[0].classList.add('disabled');
            stopGame()
        };
    },1000);

// shuffle cards
(function shuffle () {
    cards.forEach(cardShuffle => {
        var randomPositions = Math.floor(Math.random() * 12);
        cardShuffle.style.order = randomPositions;
    });
})();

// flip cards
function cardFlipper () {
    if(this === firstC) return;
    this.classList.add('flip');

    if(!isFlipped) {
        isFlipped = true;
        firstC = this;
        return;
    }

    secondC = this;
    locked = true;

    checkMatch();
}

// checks if match
function checkMatch () {

    if(secondC.firstElementChild.id == firstC.firstElementChild.id) {
        points++;
        if(points == 6 || timer == 0) {
            stopGame()
        } else {
            var score = document.getElementById("result");
            score.innerHTML = points;
        }
        cardsDisable()
    } else {
        flippBack()
    }
}

// stop game
function stopGame () {
    document.getElementsByTagName('svg')[0].classList.add('disabled');
    if(points == 6 && timer > 20) {
        points = points+2;
        clearInterval(timerInt);
    } else if (points == 6 && timer > 10) {
        points = points+1;
        clearInterval(timerInt);
    } else if (points == 6) {
        clearInterval(timerInt);
    }
    document.getElementById('timer').innerHTML = '';
    document.getElementById("result").style.color = "black";
    document.getElementById("end-result").innerHTML = points;
    document.getElementById("end-time").innerHTML = timer;
    modal.style.display = "block";
    var score = document.getElementById("result");
    score.innerHTML = points;
}


// disable cards
function cardsDisable () {
    firstC.firstElementChild.removeEventListener('click', cardFlipper);
    secondC.firstElementChild.removeEventListener('click', cardFlipper);
    firstC.classList.add('disabled')
    secondC.classList.add('disabled')
    reset();
}

// if not matched
function flippBack () {
    cards.forEach(card => card.removeEventListener('click', cardFlipper));
    setTimeout(()=> {
        firstC.classList.remove('flip');
        secondC.classList.remove('flip');
        
    cards.forEach(card => card.addEventListener('click', cardFlipper));
        reset();
    }, 700);
} 

// reset cards
function reset() {
    isFlipped = false;
    firstC = null;
    secondC = null;
}
cards.forEach(card => card.addEventListener('click', cardFlipper));