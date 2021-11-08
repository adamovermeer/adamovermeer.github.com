(function(){
    'use strict';

    const carousel = document.querySelector('#carousel');
    const overlay = document.querySelector('#overlay');
    const prompt = document.querySelector('h2');
    let snapTimer;
    let scrollTimer;
    let resizeTimer;
    let imgWidth = document.querySelector('#carousel img').clientWidth;

    //make clouds
    for(var i=0; i < 40; i++){
        const cloud = document.createElement('img');
        cloud.src='images/cloud.svg';
        cloud.classList.add('cloud');

        //generate random size, speed and delay
        cloud.style.width=`${Math.floor(Math.pow(Math.random(), 5) * 60 + 20)}px`;
        cloud.style.animationDuration=`${Math.floor(Math.random() * 200 + 200)}s`;
        cloud.style.animationDelay=`${-Math.floor(Math.random() * 400)}s`;

        //attach cloud
        container.appendChild(cloud);
    };

    //shows a scroll message if user doesn't scroll
    function scrollPrompt(){
        prompt.classList.add('showprompt');
    };

    //remeasures carousel when window is resized
    function resetWindow() {
        carousel.scrollLeft = 0;
        imgWidth = document.querySelector('#carousel img').clientWidth;
    };

    //checks for alignment to snap to after scroll
    function snap(){
        //return remainer of snap grid and carousel position
        const snapOffset = carousel.scrollLeft % imgWidth;

        if(0 < snapOffset && snapOffset < imgWidth / 2.5){
            carousel.scrollBy ({
                left: -snapOffset, 
                behavior: 'smooth'
            });
        } else if(imgWidth - imgWidth / 2.5 < snapOffset){
            carousel.scrollBy ({
                left: imgWidth - snapOffset, 
                behavior: 'smooth'
            });
        }

        //reset prompt class and start timer for scroll prompt
        prompt.classList.remove('showprompt');
        scrollTimer = setTimeout(scrollPrompt, 3000);
    };

    //scroll container on mouse scrollwheel deltaY
    carousel.addEventListener('wheel', function(e){
        e.preventDefault();

        //reset timers
        clearTimeout(snapTimer);
        clearTimeout(scrollTimer);

        carousel.scrollLeft += e.deltaY;

        if(carousel.scrollLeft >= imgWidth * 4){
            carousel.scrollLeft = 0;
            console.log('switch');

        } else if(carousel.scrollLeft <= 0 && e.deltaY < 0){
            carousel.scrollLeft = imgWidth * 4;
            console.log('switch');
        }

        snapTimer = setTimeout(snap, 500);
    });

    //checks for window resize
    window.addEventListener('resize', function(){
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resetWindow, 500);
    });

    window.addEventListener('load', function(){
        //reset window on load
        resetWindow();
    });

    //initiate first scroll prompt
    scrollTimer = setTimeout(scrollPrompt, 3000);
}());