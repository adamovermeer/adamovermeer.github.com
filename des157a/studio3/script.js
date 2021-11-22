(function(){
    'use strict';
    console.log('reading js');

    const p1score = document.querySelector('#p1score h3');
    const p2score = document.querySelector('#p2score h3');
    const p1scoreSel = document.querySelector('#p1score img');
    const p2scoreSel = document.querySelector('#p2score img');
    const information = document.getElementById('information');
    const gameControls = document.getElementById('controls');
    const overlay = document.getElementById('overlay');
    const settings = document.getElementById('settings');

    // tracks if AI is activated
    let opponentAi = 0;
    let opponentTimer;

    //tracks if menu is open
    let showMenu = 1;

    var gameData = {
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    function gameReset(){
        // hide menu and initialize settings button
        toggleMenu();
        document.getElementById('reset').innerHTML = 'Restart';
        document.getElementById('settings').addEventListener('click', toggleMenu);

        // initialize gamemode buttons
        gameControls.innerHTML = '<button id="start2p">2 Player</button><button id="start1p">1 Player (vs AI)</button>';
        information.innerHTML = '<p>Pick a gamemode:</p>';

        document.getElementById('start2p').addEventListener('click', function(){
            // activate bot
            opponentAi = 1;
            gameStart();
        })
    
        document.getElementById('start1p').addEventListener('click', function(){
            gameData.index = Math.round(Math.random());
            gameStart();
        })
    }

    function gameStart(){
        // pick starting player
        gameData.index = Math.round(Math.random());
        if(gameData.index){
            p2scoreSel.classList.add('active');
            console.log('p2');
        } else {
            p1scoreSel.classList.add('active');
            console.log('p1');
        }
        gameControls.innerHTML = '<button id="draw">Draw</button><button id="pass">Pass</button>';
        setUpTurn();
    }

    function setUpTurn(){
        // check if AI is on
        if(!opponentAi && gameData.index){
            information.innerHTML = '<p>Player 2 is taking their turn.<p>';
            opponentTimer = setTimeout(draw, 2000);

        } else {
            information.innerHTML = `<p>Draw the cards for ${gameData.players[gameData.index]}.<p>`;
            document.getElementById('draw').addEventListener('click', draw);
            document.getElementById('pass').addEventListener('click', pass);
        }
    }

    function draw(){
        // remove event listeners so buttons cannot be pressed by accident
        document.getElementById('draw').removeEventListener('click', draw);
        document.getElementById('pass').removeEventListener('click', pass);

        // calculate score
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        // move cards to new positions
        const oldHand = document.querySelector('.discard')
        const currentHand = document.querySelector('.hand');
        const newHand = document.querySelector('.deck');

        oldHand.classList.replace('discard', 'deck');
        currentHand.classList.replace('hand', 'discard');
        newHand.classList.replace('deck', 'hand');
        
        // add scores to cards
        document.querySelector('.hand .card1').innerHTML = `<h2>+${gameData.roll1}</h2>`;
        document.querySelector('.hand .card2').innerHTML = `<h2>+${gameData.roll2}</h2>`;

        // if both dice are 1s
        if(gameData.rollSum === 2){
            if(opponentAi){
                information.innerHTML = `<p>Snake eyes! Switching to ${gameData.players[1 - gameData.index]}</p>`;
            } else {
                information.innerHTML = '<p>Player 2 rolled snake eyes! Switching to Player 1.</p>';
            }
            gameData.score[gameData.index] = 0;
            showCurrentScore();
            setTimeout(pass, 2000);
        } 

        // if either die is a 1
        else if(gameData.roll1 === 1 || gameData.roll2 === 1){
            if(opponentAi){
                information.innerHTML = `<p>Sorry, you rolled a 1. Switching to ${gameData.players[1 - gameData.index]}</p>`;
            } else {
                information.innerHTML = '<p>Player 2 rolled a 1. Switching to Player 1!</p>';
            }
            setTimeout(pass, 2000);
        }

        // if neither die is a 1
        else {
            gameData.score[gameData.index] += gameData.rollSum;
            checkWinCondition();
        }
    }

    function pass(){
        gameData.index ? (gameData.index = 0) : (gameData.index = 1);

        // move player turn indicator
        if(gameData.index){
            p1scoreSel.classList.remove('active');
            p2scoreSel.classList.add('active');
        } else {
            p2scoreSel.classList.remove('active');
            p1scoreSel.classList.add('active');
        }

        setUpTurn();
    }

    function showCurrentScore(){
        // show current score
        p1score.innerHTML = gameData.score[0];
        p2score.innerHTML = gameData.score[1];
    }

    function toggleMenu() {
        if(showMenu){
            // hide menu
            overlay.classList.add('hidden');
            settings.innerHTML = '?';
            console.log('peepee');
            showMenu = 0;
        } else {
            // show menu
            overlay.classList.remove('hidden');
            settings.innerHTML = 'X';
            console.log('ree');
            showMenu = 1;
        }
    }

    function checkWinCondition(){
        showCurrentScore();

        // if win condition is met
        if(gameData.score[gameData.index] > gameData.gameEnd){
            // stop AI
            clearTimeout(opponentTimer);

            information.innerHTML = `<p>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</p>`;

            gameControls.innerHTML = '<button id="quit">Restart</button>';
            document.getElementById('quit').addEventListener('click', function(){
                location.reload();
            })

        } else {
            setUpTurn();
        }
    }

    // initialize start button
    document.getElementById('reset').addEventListener('click', gameReset);
}());