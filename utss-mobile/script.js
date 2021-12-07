(function(){
    'use strict';
    console.log('reading js');

    // find all the sections
    const carousel = document.querySelector('#carousel');
    const container = document.querySelector('#container');
    const sections = document.querySelectorAll('#carousel section');
    const articles = document.querySelectorAll('#carousel article');
    const context = document.querySelector('#context');
    const overlay = document.querySelector('#overlay');
    const lis = document.querySelectorAll('li');
    
    // initialize measurement variables
    let imgWidth;
    let imgCenter;
    let containerOffsetX;
    let containerOffsetY;
    let containerMiddle;
    let relocate;
    let counter = 0;

    // initialize the timers
    let scrollTimer;
    let slideTimer;
    let overlayTimer;
    let resizeTimer;
    let mouseTimer;

    // wait until window is loaded
    window.addEventListener('load', function(){
        // make clouds
        for(var i=0; i < 40; i++){
            const cloud = document.createElement('img');
            cloud.src='images/cloud.svg';
            cloud.classList.add('cloud');

            // generate random size, speed and delay
            cloud.style.width=`${Math.floor(Math.pow(Math.random(), 5) * 7 + 4)}vh`;
            cloud.style.animationDuration=`${Math.floor(Math.random() * 200 + 200)}s`;
            cloud.style.animationDelay=`${-Math.floor(Math.random() * 400)}s`;

            // attach cloud to container
            container.appendChild(cloud);
        };
        
        // generate birds at given coordinates
        function makeBird(spawnX, spawnY){
            const bird = document.createElement('div');
            bird.classList.add('bird');
            bird.style.left = `${spawnX - containerOffsetX}px`;
            bird.style.top = `${spawnY - containerOffsetY}px`;

            // generate random size and speed
            const birdSize = Math.random() * 10 + 5;
            bird.style.animationDuration = `${Math.random() * 30 + 30}s`;
            bird.style.height = `${birdSize}px`;
            bird.style.width = `${birdSize}px`;

            // attach bird to container
            container.appendChild(bird);
        }

        // generates random birds at random intervals
        function randomBird(){
            makeBird(0, Math.random() * (containerMiddle - containerOffsetY) + containerOffsetY * 2);
            setTimeout(randomBird, Math.random() * 50000 + 2000);
        }

        // cycles through images automatically
        function slideshow(){
            slideTimer = setTimeout(slideshow, 6000);
            nextSlide();
            carousel.scrollBy({
                left: imgWidth,
                behavior: 'smooth'
            });
        }

        // moves carousel to next image
        function nextSlide(){
            counter++;

            // check which images to cycle
            if(counter > articles.length - 1){
                // reset counter at the end of the images
                counter = 0;
                relocate = carousel.removeChild(articles[articles.length - 2 + counter]);
            }else if(counter < 2){
                relocate = carousel.removeChild(articles[articles.length - 2 + counter]);
            } else {
                relocate = carousel.removeChild(articles[counter - 2]);
            }

            // append image and scroll to compensate
            carousel.scrollLeft  -= imgWidth;
            carousel.appendChild(relocate);
            updateDesc();
        }

        // moves carousel to previous image
        function lastSlide(){
            counter--;

            // check which images to cycle
            if(counter < 0){
                // reset counter at beginning of images
                counter = articles.length - 1;
                relocate = carousel.removeChild(articles[counter - 1]);
            }else if(counter == 0){
                relocate = carousel.removeChild(articles[articles.length - 1]);
            } else {
                relocate = carousel.removeChild(articles[counter - 1]);
            }
            carousel.insertBefore(relocate, articles[counter]);
            updateDesc();
        }

        // update active description to match active image
        function updateDesc(){
            sections.forEach(article => article.classList.remove('selected'));
            sections[counter].classList.add('selected');
        }

        // hides UI when mouse isn't moving
        function hideUI(){
            lis.forEach(li => li.classList.add('hidden'));
        }

        // snap to nearest image on timeout
        function snapTo(){
            clearTimeout(slideTimer);
            slideTimer = setTimeout(slideshow, 6000);

            // calculate which image is closest to center
            const difference = carousel.scrollLeft - imgWidth;

            if(difference < 0){
                carousel.scrollBy({
                    left: -difference,
                    behavior: 'smooth'
                });
            }else{
                carousel.scrollBy({
                    left: -difference,
                    behavior: 'smooth'
                });
            }
        }

        // it does what it says on the tin
        function resetPagePosition() {
            imgWidth = articles[0].clientWidth;
            imgCenter = imgWidth + imgWidth / 2;
            containerMiddle = container.clientHeight / 2;
            containerOffsetX = container.getBoundingClientRect().left;
            containerOffsetY = container.getBoundingClientRect().top;
        }

        // initialize event listeners
    
        // scroll carousel on mouse wheel
        window.addEventListener('wheel', function(e){
            // scroll carousel
            carousel.scrollLeft += e.deltaY;

            //reset timers
            clearTimeout(scrollTimer);
            clearTimeout(slideTimer);
            scrollTimer = setTimeout(snapTo, 500);
    
            // check if the active image has changed
            if(carousel.scrollLeft > imgCenter){
                nextSlide();
            }else if(carousel.scrollLeft < imgCenter - imgWidth){
                lastSlide();
                carousel.scrollLeft = imgWidth / 2 + imgWidth;
            }
        });

        // scroll carousel on mobile scroll
        window.addEventListener('touchmove', function(){

            //reset timers
            clearTimeout(scrollTimer);
            clearTimeout(slideTimer);
            scrollTimer = setTimeout(snapTo, 500);
    
            // check if the active image has changed
            if(carousel.scrollLeft > imgCenter){
                nextSlide();
            }else if(carousel.scrollLeft < imgCenter - imgWidth){
                lastSlide();
                carousel.scrollLeft = imgWidth / 2 + imgWidth;
            }
        });

        // change slide on arrows, spacebar
        document.addEventListener('keydown', function(e){
            clearTimeout(slideTimer);

            // if right arrow or spacebar is pressed
            if(e.key == 'ArrowRight' || e.key == ' '){
                nextSlide();
                carousel.scrollBy({
                    left: imgWidth,
                    behavior: 'smooth'
                });
            // if left arrow is pressed
            }else if(e.key == 'ArrowLeft'){
                lastSlide();
                // compensate for images moving
                carousel.scrollLeft = 2 * imgWidth;
                carousel.scrollBy({
                    left: -imgWidth,
                    behavior: 'smooth'
                });
            }
        })

        // show info menu
        context.addEventListener('mouseover', function(){
            clearTimeout(overlayTimer);
            overlay.classList.remove('hidden');
        })

        // hide info menu
        context.addEventListener('mouseout', function(){
            overlay.classList.add('hidden');
        })

        // show UI on mouse movement
        window.addEventListener('mousemove', function(){
            clearTimeout(mouseTimer);
            lis.forEach(li => li.classList.remove('hidden'));
            mouseTimer = setTimeout(hideUI, 4000);
        })

        // make bird on click
        container.addEventListener('click', function(e){
            if(e.clientY < containerMiddle){
                makeBird(e.clientX, e.clientY)
            }
        });

        //checks for window resize
        window.addEventListener('resize', function(){
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resetPagePosition, 500);
        });

        // timers and such

        // measure page
        resetPagePosition();

        // take last image and append before first image
        relocate = carousel.removeChild(articles[articles.length - 1]);
        carousel.insertBefore(relocate, articles[0]);
        carousel.scrollLeft += imgWidth;

        // show then hide description
        setTimeout(function(){overlay.classList.remove('hidden');}, 500);
        overlayTimer = setTimeout(function(){
            overlay.classList.add('hidden');

            // select first section
            sections[counter].classList.add('selected');

            // initialize slideshow
            slideTimer = setTimeout(slideshow, 1000);
        }, 9000);

        // start making random birds
        setTimeout(randomBird, Math.random() * 20000 + 2000);
    })
}());