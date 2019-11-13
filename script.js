const card1 = "./img/1.jpg",
      card2 = "./img/2.jpg",
      card3 = "./img/3.jpg",
      card4 = "./img/4.jpg",
      card5 = "./img/5.jpg",
      card6 = "./img/6.jpg"
const arr = [card1,card2,card3,card4,card5,card6]
const main_block = document.createElement('div')

function addStyles(sizeX,sizeY) {
  let style = document.createElement('style');
  style.textContent = `
  .main__container {
      display: grid;
      border: 5px solid slateblue;
      grid-template-columns: ${"100px ".repeat(sizeX)};
      grid-template-rows: ${"100px ".repeat(sizeY)};
      max-width: 2200px;
      max-height: 2200px;
      grid-gap: 3px;
  }
  `
  document.head.appendChild(style)
}
function createGame(size) {
  main_block.classList.add('main__container')
  for (let i = 0; i < size; i++) {
    const content_block = document.createElement('div')
    main_block.appendChild(content_block)
  }
  let btnReset = document.createElement('button')
  btnReset.innerHTML = 'RESET'
  document.body.appendChild(btnReset)
  btnReset.addEventListener('click',()=>{
    Array.from(main_block.children).forEach(item => {
      item.classList.remove('new')
      item.addEventListener('click', flipCard)
      let randomPos = Math.floor(Math.random() * arr.length)
      item.style.order = randomPos
    })
  })
  const items = main_block.children
  Array.from(items).forEach((item,index)=>{
    index = index % 6;
    item.style.backgroundImage = `url(${arr[index]})`
    item.style.backgroundSize = "100px 100px";
    let randomPos = Math.floor(Math.random() * arr.length)
    item.style.order = randomPos
    item.setAttribute(`data`, `${arr[index].slice(6,7)}`)
  })
  Array.from(items).forEach(item => {
    item.addEventListener('click', flipCard)
  })
}
document.querySelector('body').appendChild(main_block)
const btn__container = document.querySelector('.btn__container')
const playBtn = document.querySelectorAll('.btn__container button')
playBtn.forEach(item => {
  item.addEventListener('click', () => {
    createGame(item.getAttribute('dataSize'))
    if (main_block.children.length == 12) {
      addStyles(4,3)
    } else if (main_block.children.length == 24) {
      addStyles(6,4)
    } else {
      addStyles(7,6)
    }
    btn__container.style.display = 'none'
  })
})
let firstCard, secondCard
let lockBoard = false
let hasFlippedCard = false

function flipCard(e) {
  if(lockBoard) return;
  if(firstCard == this) return;
  this.className = 'new';
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this
    return;
  }
  secondCard = this
  checkForMatch()
}

function convolk(){
  Array.from(main_block.children).forEach(item=>{
    item.classList.add('new')
  })
  return '93FEETOFSMOKE'
}

function checkForMatch() {
  let isMatch = firstCard.getAttribute('data') === secondCard.getAttribute('data')
  isMatch ? disableCards() : unflipCards()
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)
  resetBoard()
}

function unflipCards() 
{ lockBoard = true
  setTimeout(() => {
    firstCard.classList.remove('new');
    secondCard.classList.remove('new')
    resetBoard()
  }, 500)
}

function resetBoard(){
  [hasFlippedCard, lockBoard] = [false,false];
  [firstCard, secondCard] = [null,null]
}
