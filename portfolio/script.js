(function(){
    'use strict';
    console.log('reading js');

    // roll call
    const body = document.querySelector('body');
    const main = document.querySelector('main');
    const logos = document.querySelectorAll('#logo');
    const links = document.querySelectorAll('a');
    const menus = document.querySelectorAll('#menu');
    const navUl = document.querySelectorAll('nav ul');
    
    // initialize measurement variables
    let menuState = 0;

    // wait until window is loaded
    window.addEventListener('load', function(){

        // mobile menu toggle
        menus.forEach((menu, index) => {
            menu.addEventListener('click', function(){
                if(menuState == 0){
                    openMenu(index);
                    menuState = 1;
                }else{
                    closeMenu(index);
                    menuState = 0;

                }
            });
        })

        function openMenu(index){
            menus.forEach(menu => {
                menu.style.backgroundImage = 'url(/images/closemenu.svg)';
            })
            navUl[index].classList.add('open');
        }

        function closeMenu(index){
            menus.forEach(menu => {
                menu.style.backgroundImage = 'url(/images/openmenu.svg)';
            })
            navUl[index].classList.remove('open');
        }

        // add delay for links
        for(let i = 0; i < links.length; i++){
            links[i].addEventListener('click', function(e){
                e.preventDefault();
                main.classList.remove('active');
                logos.forEach(logo => {
                    logo.classList.add('active');
                });
                menus.forEach((menu, index) => {
                    closeMenu(index);
                })
                setTimeout(function(){window.location.assign(links[i].href)}, 400);
            });
        }

        function makeStars(){
            for(let i=0; i < 30; i++){
                const star = document.createElement('div');
                star.classList.add('star');
    
                // generate random size, speed and delay
                star.style.width = '3px';
                star.style.height = '3px';
                star.style.animationDuration = `${Math.random() * 3 + 3}s`;
                star.style.animationDelay = `${Math.random() * 6}s`;


                star.style.top = `${Math.random() * 50}vh`;
                star.style.left = `${Math.random() * 100}vw`;
    
                // attach cloud to container
                body.appendChild(star);
            };
        }

        // make stars
        makeStars();

        // reveal content on load
        main.classList.add('active');
        logos.forEach(logo => {
            logo.classList.add('active');
        });
    })
}());