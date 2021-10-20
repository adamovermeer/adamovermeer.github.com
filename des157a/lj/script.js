(function(){
    'use strict';
    console.log('reading js');

    const sections = document.querySelectorAll('article');
    const navs = document.querySelectorAll('li');
    const arrows = document.querySelectorAll('img');

    function navUpdate(){
        for(let i = 0; i < sections.length; i++){

            let sectionPos = sections[i].getBoundingClientRect();

            if (sectionPos.top - 10 < 0 && sectionPos.bottom - 30 > 0){
                arrows[i].style.transform='rotate(-45deg)';

                navs[i].classList.add('active');
            } else if (sectionPos.top - 10 < 0 && sectionPos.bottom -30 < 0){
                arrows[i].style.transform='rotate(-90deg)';

                navs[i].classList.remove('active');
            } else {
                arrows[i].style.transform='rotate(0deg)';

                navs[i].classList.remove('active');
            }
        }
    }

    document.addEventListener('scroll', navUpdate);

    navUpdate();
}());