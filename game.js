const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login_form')
const app = document.getElementById('app')
const player1 =document.getElementById('player1')
const player2 =document.getElementById('player2')
const pontos1 =document.getElementById('pontos1')
const pontos2 =document.getElementById('pontos2')
const jogo = document.getElementById('jogo')
const divgrid = document.createElement('div')
const main = document.getElementById('main')

let jogadorDaVez = 0
let pontuacao = [0,0]

const span1 = document.createElement('span')
span1.setAttribute('id', 'player1')
const span2 = document.createElement('span')
span1.setAttribute('id', 'pontos1')
const spantexto = document.createElement('span')
spantexto.innerText = 'X'
const span3 = document.createElement('span')
span1.setAttribute('id', 'player2')
const span4 = document.createElement('span')
span1.setAttribute('id', 'pontos2')

const validateInput = ({ target }) => {
    if(target.value.length>2){
        button.removeAttribute('disabled'); 
   }else{
    button.setAttribute('disabled', '')
   }
}

const handleSubmit = (event) => {
    event.preventDefault(event);
}

const grid = document.querySelector('.grid');
const priplayer = document.querySelector('.player1') 
const segplayer = document.querySelector('.player2')
const jogador1 = document.getElementById('jogador1')
const jogador2 = document.getElementById('jogador2')


const animais = [
    'agua.jpeg',
    'baleia.jpg',
    'cara.jpg',
    'estrela.jpg',
    'polvo.jpg',
    'tuba.jpg',
    'tubabaleia.jpg',
    'tortuga.jpg',
    'arraia.jpg',
    'vacalo.jpg',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className
    return element;
};

let primeiCarta='';
let segunCarta=''

const checarFim = () => {
    const desabilitadaCartas = document.getElementsByClassName('disaparecer-carta')
    if(desabilitadaCartas.length===20){
        setTimeout(() => { alert('parabens voce ganhou um centavo') },500)
    }
}

const checarCarta = () => {
   const primeiroAnimal =  primeiCarta.getAttribute('data-animais')
   const segundoAnimal =  segunCarta.getAttribute('data-animais')

   if(primeiroAnimal=== segundoAnimal){
        primeiCarta.firstChild.classList.add('disaparecer-carta')
        segunCarta.firstChild.classList.add('disaparecer-carta')
        primeiCarta=''
        segunCarta=''

        pontuacao[jogadorDaVez]++
        mostraPontuacao()
        checarFim()
    } else{
        jogadorDaVez = jogadorDaVez === 0 ? 1 : 0
        setTimeout(() => {
            primeiCarta.classList.remove('revelar-carta')
            segunCarta.classList.remove('revelar-carta')

            primeiCarta=''
            segunCarta=''

        }, 500);
    }
}

const revealCard= ({target}) => {
    if(target.parentNode.className.includes('revelar-carta')){
        return;
    }
    if(primeiCarta=== ''){
        target.parentNode.classList.add('revelar-carta')
        primeiCarta= target.parentNode;
    }else if(segunCarta===''){
        target.parentNode.classList.add('revelar-carta')
        segunCarta= target.parentNode;
        checarCarta()
    }
}

const createCard = (animais) => {
    const card = createElement('div', 'card');
    const frent = createElement('div', 'face frent');
    const back = createElement('div', 'face back');
    frent.style.backgroundImage = `url('${animais}')`;

    card.appendChild(frent);
    card.appendChild(back);
    card.addEventListener('click', revealCard)
    card.setAttribute('data-animais', animais)
    divgrid.appendChild(card);
    return card;
}

const loadGame = () => {
    app.innerHTML = ''
    const header1 = document.createElement('header')
    header1.setAttribute('id', 'header')
    header1.appendChild(span1)
    header1.appendChild(span2)
    header1.appendChild(span3)
    header1.appendChild(span4)
    app.appendChild(header1)
    divgrid.setAttribute('class', 'grid')
    app.appendChild(divgrid)
    main.appendChild(app)
    main.appendChild(divgrid)

    mostraPontuacao()

    const duplicarAnimais = [ ... animais, ... animais ];
    const embaralharCartas = duplicarAnimais.sort(()=> Math.random()- 0.5)
    
    embaralharCartas.forEach((animais) => {
        const card = createCard(animais)
        divgrid.appendChild(card)
    })
    jogo.appendChild(divgrid)
}

const mostraPontuacao = () => {
    span2.innerText = pontuacao[0]
    spantexto. innerText = 'X'
    span4.innerText = pontuacao[1]
}

const mostraFormulario = () => {
    jogo.innerHTML = ''
    const divLogin = document.createElement('div')
    divLogin.classList.add('login')
    const divLoginComeco = document.createElement('div')
    divLoginComeco.classList.add('login_comeco')

    const img = document.createElement('img')
    img.setAttribute('src', 'tuba.jpg')
    img.setAttribute('alt', 'Tubarao martelo')
    const h1 = document.createElement('h1')
    h1.innerText = "Jogo da Memória"
    divLoginComeco.appendChild(img)
    divLoginComeco.appendChild(h1)

    const input1 = document.createElement('input')
    input1.setAttribute('type', 'text')
    input1.setAttribute('placeholder', 'Jogador1')
    input1.classList.add('login_input')
    input1.setAttribute('id', 'jogador1')

    const input2 = document.createElement('input')
    input2.setAttribute('type', 'text')
    input2.setAttribute('placeholder', 'Jogador2')
    input2.classList.add('login_input')
    input2.setAttribute('id', 'jogador2')

    const button = document.createElement('button')    
    button.setAttribute('type','button')
    button.classList.add('login_button')
    
    button.innerText = 'Jogar'
    button.addEventListener('click', () => {
        loadGame()
        span1.innerText = input1.value
        span3.innerText = input2.value
    })

    divLogin.appendChild(divLoginComeco)
    divLogin.appendChild(input1)
    divLogin.appendChild(input2)
    divLogin.appendChild(button)

    app.appendChild(divLogin)
}

//init
mostraFormulario()