(function(){
    'use strict';
    console.log('reading js');

    //begin input form code
    const myForm = document.querySelector('form');
    const madlib = document.querySelector('#madlib');
    const response = document.querySelector('article');
    const formFields = document.querySelectorAll('input[type=text]');
    const myP = document.querySelector('p');
    let words = [];

    myForm.addEventListener('submit', function(e){
        e.preventDefault();

        words = [];

        for (let eachWord of formFields) {
            words.push(eachWord.value);
        }

        for (let eachWord of formFields) {
            eachWord.value = "";
        };

        madlib.innerHTML = `<p>It is nice to meet you, <span>${words[0]}</span>. So, you want <span>${words[1]}</span>? That sounds like a good goal to have. Yet, you feel that <span>${words[2]}</span> stands in your way?</p>
        <p>It may be hard to accept, but in the garden, nothing happens without reason. We endure the winter because we know the spring will come. You must find practices to control <span>${words[2]}</span>, and when you do, you will find those same practices will help you <span>${words[1]}</span>. There will be times that the <span>${words[2]}</span> may feel overwhelming. Yet, it is only after old leaves fall that new ones may grow.</p>
        <p>You know that you have incredible <span>${words[3]}</span>. Use it. If you must lie dormant for a while, remember that like us, you are not failing—you are simply waiting for spring.</p>`;

        myForm.className = 'hidden';
        response.className = 'showing';
    });

    document.querySelector('#reset').addEventListener('click', function(){
        myForm.className = 'showing';
        response.className = 'hidden';
    });

    //begin plant code
    function plant(plantType, plantPosX, plantPosY, plantRotation, plantSize, leafCount){

        //this code will create a plant based on the input values, and will randomize the size, distribution, and animation of each leaf

        for(var i=0; i < leafCount; i++){
            //create each leaf img and containing div
            let div = document.createElement('div');
            let img = document.createElement('img');
            img.src = `images/${plantType}.svg`;
            div.classList.add('leaf');

            //set plant origin position
            div.style.bottom=plantPosY;
            div.style.left=plantPosX;

            //assign each leaf a random rotation
            div.style.transform=`rotate(${Math.random() * 80 - 40 + plantRotation}deg)`;

            //assign each leaf a random height
            let height = `${Math.random() * plantSize / 2 + plantSize}px`;
            img.style.height=height;
            div.style.height=height;
            
            //assign each leaf a random animation duration and delay
            img.style.animationDuration=`${Math.random() * 10 + 30}S`;
            img.style.animationDelay=`${Math.random() * -40}S`;

            //add leaves to document
            document.querySelector('body').appendChild(div).appendChild(img);
        }
    }
    //note: plants will overlap in opposite order to that in which they are planted below
    
    //bushes
    plant("bush", "-50px", "-20px", 0, 200, 5);
    plant("bush", "150px", "-20px", 0, 150, 4);
    plant("bush", "300px", "-30px", 0, 100, 2);
    plant("bush", "700px", "-150px", 0, 200, 5);
    plant("bush", "1000px", "-50px", 0, 150, 4);
    plant("bush", "1200px", "-50px", 0, 100, 2);
    //grasses
    plant("grass", "200px", "-100px", 10, 350, 40);
    plant("grass", "500px", "-150px", 0, 250, 20);
    plant("grass", "1200px", "-80px", -10, 200, 20);
    plant("grass", "1550px", "-150px", -20, 400, 40);
    plant("grass", "1800px", "-50px", -30, 200, 30);
    //palms
    plant("palm", "-150px", "200px", 50, 450, 5);
    plant("palm", "1800px", "100px", -30, 450, 4);
    plant("palm", "1800px", "100px", -60, 350, 3);

    //end plant code
}());