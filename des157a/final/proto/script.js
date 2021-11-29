(function(){
    'use strict';

    const carousel = document.querySelector('#carousel');
    const container = document.querySelector('#container');
    let resizeTimer;
    let mouseTimer;

    //make clouds
    for(var i=0; i < 40; i++){
        const cloud = document.createElement('img');
        cloud.src='images/cloud.svg';
        cloud.classList.add('cloud');

        //generate random size, speed and delay
        cloud.style.width=`${Math.floor(Math.pow(Math.random(), 5) * 7 + 4)}vh`;
        cloud.style.animationDuration=`${Math.floor(Math.random() * 200 + 200)}s`;
        cloud.style.animationDelay=`${-Math.floor(Math.random() * 400)}s`;

        //attach cloud
        container.appendChild(cloud);
    };

    

    window.addEventListener('load', function(){
        const sections = document.querySelectorAll('#carousel section');
        const articles = document.querySelectorAll('#carousel article');
        const lis = document.querySelectorAll('li');
        const context = document.querySelector('#context');
        const overlay = document.querySelector('#overlay');
        // let articleRightEdges = [];
        let snapTimer;
        let scrollTimer;
        let slideTimer;
        let imgWidth;
        let imgCenter;
        let counter = 0;
        let prevCounter = 0;

        sections[counter].classList.add('selected');

        context.addEventListener('mouseover', function(){
            overlay.classList.remove('hidden');
        })

        context.addEventListener('mouseout', function(){
            overlay.classList.add('hidden');
        })

        // take last image and append before first image
        let relocate = carousel.removeChild(articles[articles.length - 1]);
        carousel.insertBefore(relocate, articles[0]);

        //checks for window resize
        window.addEventListener('resize', function(){
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resetPagePosition, 500);
        });

        resetPagePosition();

        carousel.scrollLeft += imgWidth;

        function hideUI(){
            lis.forEach(li => li.classList.add('hidden'));
        }

        window.addEventListener('mousemove', function(){
            clearTimeout(mouseTimer);
            lis.forEach(li => li.classList.remove('hidden'));
            mouseTimer = setTimeout(hideUI, 4000);
        })

        function slideshow(){
            slideTimer = setTimeout(slideshow, 6000);
            nextSlide();
        }

        function nextSlide(){
            counter++;
            prevCounter = counter;

            if(counter > articles.length - 1){
                counter = 0;
            }
            console.log(counter);
            if(counter < 2){
                relocate = carousel.removeChild(articles[articles.length - 2 + counter]);
            } else {
                relocate = carousel.removeChild(articles[counter - 2]);
            }
            carousel.scrollLeft  -= imgWidth;
            carousel.appendChild(relocate);

            

            carousel.scrollBy({
                left: imgWidth,
                behavior: 'smooth'
            });
            sections.forEach(article => article.classList.remove('selected'));
            sections[counter].classList.add('selected');
        }

        // function lastSlide(){
        //     counter--;
        //     prevCounter = counter;

        //     if(counter < 0){
        //         counter = articles.length - 1;
        //     }
        //     console.log(counter);
        //     if(counter == 0){
        //         relocate = carousel.removeChild(articles[articles.length - 1]);
        //     } else {
        //         relocate = carousel.removeChild(articles[counter - 1]);
        //     }
        //     carousel.insertBefore(relocate, articles[counter]);
        //     carousel.scrollLeft  -= imgWidth;

        //     carousel.scrollBy({
        //         left: -imgWidth,
        //         behavior: 'smooth'
        //     });
        //     sections.forEach(article => article.classList.remove('selected'));
        //     sections[counter].classList.add('selected');
        // }

        document.addEventListener('keydown', function(e){
            clearTimeout(slideTimer);
            if(e.key == 'ArrowRight' || e.key == ' '){
                nextSlide();
            // }else if(e.key == 'ArrowLeft'){
            //     lastSlide();
            }
        })

        function snapTo(){
            clearTimeout(slideTimer);
            slideTimer = setTimeout(slideshow, 6000);

            const difference = carousel.scrollLeft - imgWidth;
            console.log(difference);

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
    
        window.addEventListener('wheel', function(e){
            e.preventDefault;
            carousel.scrollLeft += e.deltaY + e.deltaX;

            clearTimeout(scrollTimer);
            clearTimeout(slideTimer);
            scrollTimer = setTimeout(snapTo, 500);
    
            if(carousel.scrollLeft > imgCenter){
                counter++;
                // console.log(`scrolling down ${counter}`);
            }else if(carousel.scrollLeft < imgCenter - imgWidth){
                counter--;
                // console.log(`scrolling up ${counter}`);
            }
    
            if(counter !== prevCounter){
                if(counter > prevCounter && counter == 1){
                    relocate = carousel.removeChild(articles[articles.length - 1]);
                    carousel.scrollLeft -= imgWidth;
                    carousel.appendChild(relocate);
                    // lastElement = articles.length - 1;
                } else if(counter > prevCounter && counter > articles.length - 1){
                    relocate = carousel.removeChild(articles[counter - 2]);
                    carousel.scrollLeft -= imgWidth;
                    carousel.appendChild(relocate);
                    // lastElement = counter - 2;
                    counter = 0;
                }else if(counter > prevCounter){
                    relocate = carousel.removeChild(articles[counter - 2]);
                    carousel.scrollLeft -= imgWidth;
                    carousel.appendChild(relocate);

                }else if(counter < prevCounter){
                    if(counter == 0){
                        relocate = carousel.removeChild(articles[articles.length - 1]);
                        carousel.insertBefore(relocate, articles[counter]);
                    }else if(counter == -1){
                        relocate = carousel.removeChild(articles[articles.length - 2]);
                        carousel.insertBefore(relocate, articles[articles.length - 1]);
                        counter = articles.length - 1;
                    } else {
                        relocate = carousel.removeChild(articles[counter - 1]);
                        carousel.insertBefore(relocate, articles[counter]);
                    }
                    carousel.scrollLeft = imgWidth / 2 + imgWidth;
                }
                prevCounter = counter;
                sections.forEach(article => article.classList.remove('selected'));
                sections[counter].classList.add('selected');
            }
        });

        function resetPagePosition() {
            imgWidth = articles[0].clientWidth;
            imgCenter = imgWidth + imgWidth / 2;
            
            // articleRightEdges = [];
            // articles.forEach(function (article) {
            //     articleRightEdges.push(Math.floor(article.getBoundingClientRect().left));
            // });
        
            // const pagePosition = carousel.scrollLeft;
            // counter = -1;
        
            // articleRightEdges.forEach(function (article) { if (pagePosition > article) { counter++; } });
        }
        snapTo();
    })
}());