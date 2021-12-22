(function(){
    'use strict';
    console.log('reading slideshow js');

    // roll call
    const slideshow = document.querySelector('.slideshow');
    const figs = document.querySelectorAll('.slideshow figure');

    // initialize measurements
    let figWidth;
    let figComputedStyle;
    let figMargin;
    let totalWidth;
    let currentSlide = 0;
    let resizeTimer;

    // wait until window is loaded
    window.addEventListener('load', function(){

        function resetPagePosition() {
            figWidth = figs[0].clientWidth;
            figComputedStyle = getComputedStyle(figs[1]);
            figMargin = parseInt(figComputedStyle.getPropertyValue('margin-left'), 10);
            totalWidth = figWidth + 2 * figMargin;
        }

        // checks for window resize
        window.addEventListener('resize', function(){
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resetPagePosition, 500);
        });

        function nextSlide(){
            if(currentSlide == figs.length - 1){
                slideshow.scrollBy({
                    left: -totalWidth * figs.length,
                    behavior: 'smooth'
                });

                currentSlide = 0;
            }else{
                slideshow.scrollBy({
                    left: totalWidth,
                    behavior: 'smooth'
                });

                currentSlide++;
            }

            setTimeout(nextSlide, 3000);
        }

        // measure slideshow
        resetPagePosition();

        // start slideshow
        setTimeout(nextSlide, 3000);

        console.log(slideshow);
    })
}());