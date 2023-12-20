AOS.init();

const profilowe = document.getElementById('profilowe');

profilowe.addEventListener('mouseover', () => {
  for (let i = 0; i <= 10; i++) {
    setTimeout(() => {
      profilowe.src = `img/animacja/${i}.png`;
    }, i * 25);
  }
});

profilowe.addEventListener('mouseout', () => {
  for (let i = 10; i >= 0; i--) {
    setTimeout(() => {
      profilowe.src = `img/animacja/${i}.png`;
    }, (10 - i) * 25);
  }
});

function animacja(idJezyka, idProcenty, wartoscKoncowa, predkosc) {
    const jezyk = document.getElementById(idJezyka);
    const procenty = document.getElementById(idProcenty);

    let startowaWartosc = 0;
    let czerwony = 255;
    let zielony = 0;

    const animacjaPostepu = setInterval(() => {
    startowaWartosc++;

    procenty.innerHTML = `${startowaWartosc}%`;

    if (zielony <= 150) {
        zielony = startowaWartosc * 3;
    } else {
        czerwony = 255 - ((startowaWartosc - 50) * 5.10);
    }

    jezyk.style.background = `conic-gradient(rgb(${czerwony}, ${zielony}, 0) ${startowaWartosc * 3.6}deg, #EEE 0deg)`;

    if (startowaWartosc === wartoscKoncowa) {
        clearInterval(animacjaPostepu);
    }
    }, predkosc);
}

let htmlAnimacja = false;
let cssAnimacja = false;
let jsAnimacja = false;
let pythonAnimacja = false;
let cAnimacja = false;

function czyElementWidoczny(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight - 200 && rect.bottom >= 0;
}


function uruchomAnimacje() {
  const htmlElement = document.getElementById('html');
  const cssElement = document.getElementById('css');
  const jsElement = document.getElementById('js');
  const pythonElement = document.getElementById('python');
  const cElement = document.getElementById('c');

  if (czyElementWidoczny(htmlElement) && !htmlAnimacja) {
    htmlAnimacja = true;
    animacja('html', 'html-wartosc', 90, 20);
  }

  if (czyElementWidoczny(cssElement) && !cssAnimacja) {
    cssAnimacja = true;
    animacja('css', 'css-wartosc', 80, 20);
  }

  if (czyElementWidoczny(jsElement) && !jsAnimacja) {
    jsAnimacja = true;
    animacja('js', 'js-wartosc', 70, 20);
  }

  if (czyElementWidoczny(pythonElement) && !pythonAnimacja) {
    pythonAnimacja = true;
    animacja('python', 'python-wartosc', 60, 20);
  }

  if (czyElementWidoczny(cElement) && !cAnimacja) {
    cAnimacja = true;
    animacja('c', 'c-wartosc', 50, 20);
  }
}

let wysokoscPrzewiniecia

const rakieta = document.querySelector('#rakieta');
const zdjecie = document.querySelector('#rakieta img')

let rakietaX = 0;
let rakietaY = 0;
let kierunekX = 1
let kierunekY = 1

let aktualneLeftProcenty
let aktualneTopProcenty

let rakietaWRuchu = false

const kontener = document.getElementById('widocznosc');

function pobierzAktualneWartosci() {
  
  let ostatniaPozycja = aktualneTopProcenty

  const kontenerSzerokosc = kontener.clientWidth;
  const kontenerWysokosc = kontener.clientHeight;

  const aktualneLeftPiksele = rakieta.getBoundingClientRect().left;
  const aktualneTopPiksele = rakieta.getBoundingClientRect().top;

  aktualneLeftProcenty = (aktualneLeftPiksele / kontenerSzerokosc) * 100;
  aktualneTopProcenty = (aktualneTopPiksele / kontenerWysokosc) * 100;

  if (ostatniaPozycja == aktualneTopProcenty){
    rakietaWRuchu = false
  } else{
    rakietaWRuchu = true
  }

  requestAnimationFrame(pobierzAktualneWartosci);
}

requestAnimationFrame(pobierzAktualneWartosci);


const dym = document.getElementById('dym')


function dymRakiety() {
  if(aktualneLeftProcenty > 0 && aktualneLeftProcenty < 85){
  const element = document.createElement('img')
  element.classList.add('element')
  element.src = 'img/dym.svg'

  let losowa = ((Math.random() * 3)  + 1).toFixed(1)
  element.style.width = `${losowa}%`
  element.style.height = `${losowa}%`

  if(kierunekX == 1){
    element.style.left = `${aktualneLeftProcenty}%`
    setTimeout(()=>{
      element.classList.add('animacjaLewo')
    }, 10)
  } 
  if (kierunekX == -1){
    element.style.left = `${8 + aktualneLeftProcenty}%`
    setTimeout(()=>{
      element.classList.add('animacjaPrawo')
    }, 10)
  }
  element.style.top = `${aktualneTopProcenty + wysokoscPrzewiniecia}%`

  dym.appendChild(element)
}
}

function ruchRakiety(){
  rakieta.style.left=`${rakietaX}%`
  rakieta.style.top=`${rakietaY}%`
  rakietaX += kierunekX;
  rakietaY += kierunekY;
  if(rakietaX >= 75){
    setTimeout(() => {
      kierunekX = -1
      zdjecie.src = 'img/rakietaLewo.svg'
    },500)
  } else if(rakietaX <= 10){
    setTimeout(() => {
      kierunekX = 1
      zdjecie.src = 'img/rakietaPrawo.svg'
    },500)
  }
  if(rakietaY >= 85){
    kierunekY = -1
  } else if(rakietaY == 0){
    kierunekY = 1
  }
}

let licznik = 0


setInterval(() => {
  if(rakietaWRuchu == true){
    let losowa = Math.floor(Math.random() * 10)
    if(losowa <= 2 && licznik < 200){
      licznik++
      dymRakiety()
    }
  }
}, 50)

const nav = document.querySelector('nav')

window.addEventListener('scroll', () => {
    uruchomAnimacje()
    ruchRakiety()
    wysokoscPrzewiniecia = (window.scrollY / document.documentElement.clientHeight) * 100;
    if(wysokoscPrzewiniecia > 0){
      nav.classList.add('scrollowany')
    } else {
      nav.classList.remove('scrollowany')
    }
});
window.addEventListener('DOMContentLoaded', ()=>{
  uruchomAnimacje()
  if (window.innerWidth <= 767) {
    usunAtrybutZElementow()
  }
});

window.addEventListener('resize', ()=>{
  if (window.innerWidth <= 767) {
    usunAtrybutZElementow()
  }
})

function usunAtrybutZElementow() {
  let elementy = document.querySelectorAll('[data-aos]');
  elementy.forEach(function(element) {
    element.removeAttribute('data-aos');
  });
}
