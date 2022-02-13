'use strict';
const nav = document.querySelector('.nav');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
// Tab component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

 btnsOpenModal.forEach( btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const handleHover = function(e){
  if ( e.target.classList.contains('nav__link') ) {
    const over = e.target;
    const teNgjashme = over.closest('.nav').querySelectorAll('.nav__link');
    const logo = over.closest('.nav').querySelector('img');
    teNgjashme.forEach( el => {
      if ( el !== over)el.style.opacity = this;
    });
    logo.style.opacity = this;
  };
};
//Fade Animation
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const sec1Koordinata = section1.getBoundingClientRect();


const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  console.log
  const [entry] = entries;
  if ( !entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav,{
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// zbulojme sections

const zbuloSection = function ( entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  //kodi meposhtem ben te mundur heqjen e animacioneve
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(zbuloSection, {
  root: null,
  threshold: 0.15
});

allSections.forEach( function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})

// Lazy Loading images
const imazhTarget = document.querySelectorAll('img[data-src');

const loadImazh = function(entries , observer ){
  const [entry] = entries;
  if( !entry.isIntersecting ) return;
  entry.target.src = entry.target.dataset.src;
  
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imazhObserver = new IntersectionObserver(loadImazh, {
  root: null,
  threshold: 0,
  //kodi me poshte ben te mundur te ekzekutohet 200px me pare
  rootMargin: '200px',
});
imazhTarget.forEach( img => imazhObserver.observe(img) );



const slideBtnLeft = document.querySelector('.slider__btn--left');
const slideBtnRight = document.querySelector('.slider__btn--right');

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const dotContainer = document.querySelector('.dots');


const createDots = function () {
    slides.forEach( function(s, i) {
      dotContainer.insertAdjacentHTML('beforeend', `<button class = "dots__dot" data-slide = "${i}">
      </button>`
    );
  });
};
createDots();

const activateDot = function(slide){

  document.querySelectorAll('.dots__dot')
  .forEach( dot => dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

let tempSlide = 0;
const maxSlide = slides.length-1;
activateDot(tempSlide);
const goSlide = function(slide){
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * ( i - slide)}%)`);
};

goSlide(0);

const nextSlide = function(){
  if ( tempSlide === maxSlide ) {
    tempSlide = 0;
  } else {
    tempSlide++; 
  }
goSlide(tempSlide);
activateDot(tempSlide);
};
const prevSlide = function() {
  if ( tempSlide === 0 ) {
    tempSlide = maxSlide;
  } else {
    tempSlide--; 
  }
goSlide(tempSlide);
activateDot(tempSlide);
};
slideBtnRight.addEventListener('click', nextSlide );
slideBtnLeft.addEventListener('click', prevSlide );

document.addEventListener('keydown', function(e){
  console.log(e)
  if ( e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function(e){
  if ( e.target.classList.contains('dots__dot')){
    //const slide = e.target.dataset.slide; //kodi me poshte eshte i barabarte me kodin ne kete rresht
    console.log(e.target.dataset)
    const { slide } = e.target.dataset;
    goSlide(slide);
    activateDot(slide);
  };
});



btnScrollTo.addEventListener('click' , function(e){

    section1.scrollIntoView({ behavior: 'smooth'});
});

// per ta bo per te gjith qe kane klasen nav__links
document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();

  if ( e.target.classList.contains('nav__link') ) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  };
});

tabsContainer.addEventListener('click', function(e){
    const clicked = e.target.closest('.operations__tab');
    //ignore null clicked
    if ( !clicked ) return;

    tabs.forEach( t => t.classList.remove('operations__tab--active'));
   clicked.classList.add('operations__tab--active'); 
   // aktivizojme pjesen e permbajtjes se pershkrimit
   tabsContent.forEach( t => t.classList.remove('operations__content--active'));
   document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});


// console.log(document.documentElement);
// console.log(document.head);

// console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
//  console.log(allButtons);


// creating and inserting elements

// .insertAdjecentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = ' We use cookies for improve functionality and analystics.';
message.innerHTML = ' We use cookies for improve functionality and analystics. <button class = "btn--close-cookie">Got it!</button ';
// console.log(message);
header.prepend(message);
//header.append(message);

// ne mom qe duam te vejme cookie si lart si poshte faqes

// header.append(message.cloneNode(true));

// e njejta gjo eshte dhe me before dhe after
//header.before(message);
//header.after(message);

//Delete elements:
document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  console.log('ok');
  message.remove();
});

//Styles

message.style.backgroundColor = '#37383d';
message.style.width = '120%' ;


const V = [1,2,2,3,4,5,6,7,3,4,3];

// const gjej = function(A){
//   const arrNew = new Set();
//   const c = [];
// const newA =  A.filter( (el, i, arr) => {
//       if( i < arr.length - 1){
//         for(let j = 1; j < arr.length; j++){
//           if( j != i){
//             if( el === arr[j]){
//             return el;
//             }
//           } 
//         }
//       } 
//     });
//     newA.forEach(a => {arrNew.add(a)});
//     arrNew.forEach(x => c.push(x));
//     console.log(c);
// }
// gjej(V);


const funksionKot = (a,b) => Math.Max(a,b);

const arrKot = [50,100];


console.log(arrKot.reduce(funksionKot,50))