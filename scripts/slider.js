const buttonLeft = document.querySelector('.favorite-coffee__arrow--left')
const buttonRight = document.querySelector('.favorite-coffee__arrow--right')
const sliderCarousel = document.querySelector('.favorite-coffee__slider-carousel')
const slideBack = document.querySelector('#slide-back')
const slideNext = document.querySelector('#slide-next')
const slideActive = document.querySelector('#slide-active')
const paginationList = document.querySelectorAll('.favorite-coffee__pagination-item')

buttonLeft.addEventListener('click', moveLeft)
buttonRight.addEventListener('click', moveRight)

let counter = 0

paginationList[counter].classList.add('favorite-coffee__pagination-item--active')

function countPagination(direction) {
  paginationList[counter].classList.remove('favorite-coffee__pagination-item--active')

  if (direction === 'next') {
    counter = (counter < 2) ? counter + 1 : 0
  } else if (direction === 'back') {
    counter = (counter > 0) ? counter - 1 : 2
  }

  paginationList[counter].classList.add('favorite-coffee__pagination-item--active')
}

function moveLeft() {
  sliderCarousel.classList.add('transition-left')

  buttonLeft.removeEventListener('click', moveLeft)
  buttonRight.removeEventListener('click', moveRight)

  sliderCarousel.removeEventListener('touchend', touchEnd)

  countPagination('back')
}

function moveRight() {
  sliderCarousel.classList.add('transition-right')

  buttonLeft.removeEventListener('click', moveLeft)
  buttonRight.removeEventListener('click', moveRight)
  
  sliderCarousel.removeEventListener('touchend', touchEnd)

  countPagination('next')
}

sliderCarousel.addEventListener('mouseenter', () => {
  paginationList[counter].classList.add('favorite-coffee__pagination-item--paused')
})

sliderCarousel.addEventListener('mouseleave', () => {
  paginationList[counter].classList.remove('favorite-coffee__pagination-item--paused')
})

sliderCarousel.addEventListener('touchstart', () => {
  paginationList[counter].classList.add('favorite-coffee__pagination-item--paused')
})

sliderCarousel.addEventListener('touchend', () => {
  paginationList[counter].classList.remove('favorite-coffee__pagination-item--paused')
})

paginationList.forEach((elem) => {
  elem.addEventListener('animationend', () => {
    sliderCarousel.classList.remove('transition-right')
    moveRight()
  })
})

sliderCarousel.addEventListener('animationend', (animationEvent) => {
  let slidesContent = [slideBack.innerHTML, slideActive.innerHTML, slideNext.innerHTML]
  if (animationEvent.animationName.includes('move-right')) {
    sliderCarousel.classList.remove('transition-right')

    slideActive.innerHTML = slidesContent[2]
    slideBack.innerHTML = slidesContent[1]
    slideNext.innerHTML = slidesContent[0]
  } else {
    sliderCarousel.classList.remove('transition-left')

    slideActive.innerHTML = slidesContent[0]
    slideBack.innerHTML = slidesContent[2]
    slideNext.innerHTML = slidesContent[1]
  }

  buttonRight.addEventListener('click', moveRight)
  buttonLeft.addEventListener('click', moveLeft)

  sliderCarousel.addEventListener('touchend', touchEnd)
})

// Ручной свайп

let startX = 0
let currentX = 0
let offsetX = 0

function touchStart(event) {
  startX = event.touches[0].clientX
  currentX = startX
}

function touchMove(event) {
  currentX = event.touches[0].clientX
  offsetX = currentX - startX
}

function touchEnd() {
  if (offsetX > 50) {
    moveLeft()
  } else if (offsetX < -50) {
    moveRight()
  }

  startX = 0
  currentX = 0
  offsetX = 0
}

sliderCarousel.addEventListener('touchstart', touchStart)
sliderCarousel.addEventListener('touchmove', touchMove)
sliderCarousel.addEventListener('touchend', touchEnd)
