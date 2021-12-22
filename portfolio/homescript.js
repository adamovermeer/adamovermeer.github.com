(function(){
    'use strict';
    console.log('reading home js');

    // this script handles the infinite carousel on the home page

    // roll call
    const carousel = document.querySelector('#carousel');
    const articles = document.querySelectorAll('#carousel article');
    const sections = document.querySelectorAll('section');

    // initialize measurement variables
    let imgWidth;
    let articleMargin;
    let relocate;
    let counter = 0;
    let prevPageX;
    let windowMiddle;
    let totalWidth;
    let articleComputedStyle;

    // initialize the timers
    let scrollTimer;
    let slideTimer;
    let resizeTimer;

    // wait until window is loaded
    window.addEventListener('load', function(){

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
            carousel.appendChild(relocate);
            carousel.scrollLeft -= totalWidth;

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
            sections.forEach(section => section.classList.remove('active'));
            sections[counter].classList.add('active');
        }

        // snap to nearest image on timeout
        function snapTo(){
            // calculate which image is closest to center
            const difference = carousel.scrollLeft + windowMiddle - 1.5 * totalWidth;

            carousel.scrollBy({
                left: -difference,
                behavior: 'smooth'
            });

            sky.scrollBy({
                left: -difference / 2,
                behavior: 'smooth'
            });

            sections[counter].classList.add('active');
        }

        // it does what it says on the tin
        function resetPagePosition() {
            windowMiddle = window.innerWidth / 2;
            imgWidth = articles[0].clientWidth;
            articleComputedStyle = getComputedStyle(articles[0]);
            articleMargin = parseInt(articleComputedStyle.getPropertyValue('margin-left'), 10);
            totalWidth = imgWidth + 2 * articleMargin;

            // re-center image
            snapTo();
        }

        // initialize event listeners
    
        // scroll carousel on mouse wheel
        window.addEventListener('wheel', function(e){

            sections[counter].classList.remove('active');

            // scroll carousel
            carousel.scrollLeft += e.deltaY + e.deltaX;
            

            // reset timers
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(snapTo, 50);
    
            // check if the active image has changed
            if(carousel.scrollLeft > totalWidth * 2 - windowMiddle){
                nextSlide();
                
            }else if(carousel.scrollLeft < totalWidth - windowMiddle){
                lastSlide();
                carousel.scrollLeft = 2 * totalWidth - windowMiddle;
            }
        });

        // zero page scroll on first touch
        window.addEventListener('touchstart', function(e){
            prevPageX = e.touches[0].pageX;
        })

        // scroll carousel on mobile scroll
        window.addEventListener('touchmove', function(e){

            // scroll carousel
            carousel.scrollLeft += 2 * (prevPageX - e.touches[0].pageX);

            //reset prevPageX
            prevPageX = e.touches[0].pageX;

            // reset timers
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(snapTo, 50);
    
            // check if the active image has changed
            if(carousel.scrollLeft > 2 * imgWidth - windowMiddle){
                nextSlide();
                
            }else if(carousel.scrollLeft < imgWidth - windowMiddle){
                lastSlide();
                carousel.scrollLeft = 2 * imgWidth - windowMiddle;
            }
        });

        // change slide on arrows, spacebar
        document.addEventListener('keydown', function(e){
            clearTimeout(slideTimer);

            // if right arrow or spacebar is pressed
            if(e.key == 'ArrowRight' || e.key == ' '){
                carousel.scrollBy({
                    left: totalWidth,
                    behavior: 'smooth'
                });

                setTimeout(function(){
                    nextSlide();
                    snapTo();
                }, 600);

            // if left arrow is pressed
            }else if(e.key == 'ArrowLeft'){
                lastSlide();

                // compensate for images moving
                carousel.scrollLeft += totalWidth;

                carousel.scrollBy({
                    left: -totalWidth,
                    behavior: 'smooth'
                });
            }
        })

        // checks for window resize
        window.addEventListener('resize', function(){
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resetPagePosition, 500);
        });

        // setup

        // measure page
        resetPagePosition();

        // take last image and append before first image
        relocate = carousel.removeChild(articles[articles.length - 1]);
        carousel.insertBefore(relocate, articles[0]);
        carousel.scrollLeft = 1.5 * totalWidth - windowMiddle;

        // select first article
        sections[counter].classList.add('active');
    })
}());