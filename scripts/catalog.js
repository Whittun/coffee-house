fetch('./assets/products.json')
  .then(response => response.json())
  .then(data => {
    let jsonList = data
    catalog(jsonList)
  })

function catalog(jsonList) {
  
  const catalogList = document.querySelector('.catalog__product-list')
  const choiceItems = document.querySelectorAll('.catalog__choice-button')
  const showButton = document.querySelector('.catalog__product-button')
  const body = document.querySelector('body')
  
  showButton.addEventListener('click', showProducts)

  function showProducts() {
    catalogList.classList.remove('catalog__product-list--hidden')
    showButton.classList.remove('catalog__product-button--showed')
  }

  choiceItems.forEach((item) => {
    item.addEventListener('click', choiceCategory)
  })

  function choiceCategory(e) {
    const categoryName = e.target.innerText.toLowerCase()
    const targetButton = e.target

    const previousActiveButton = document.querySelector('.catalog__choice-button--active')
    previousActiveButton.classList.remove('catalog__choice-button--active')
    previousActiveButton.removeAttribute('disabled')

    targetButton.classList.add('catalog__choice-button--active')
    targetButton.setAttribute('disabled', 'disabled')

    generateCards(categoryName)
  }

  function generateCards(categoryName) {
    const filteredCards = jsonList.filter((obj) => obj.category === categoryName)

    catalogList.classList.add('catalog__product-list--hidden')

    if (filteredCards.length > 4) {
      showButton.classList.add('catalog__product-button--showed')
    } else {
      showButton.classList.remove('catalog__product-button--showed')
    }

    catalogList.innerHTML = ''

    filteredCards.forEach((product) => {
      const imgName = product.name.split(' ').join('-')
      let html = `
        <li class="catalog__product-item">
          <div class="catalog__product-img-wrap">
            <img class="catalog__product-img" src="assets/images/${imgName}.jpg" alt="${product.name}">
            <span class="loader-92"></span>
          </div>
          <div class="catalog__product-content"> 
            <h3 class="catalog__product-title">
              ${product.name}
            </h3>
            <p class="catalog__product-text">
              ${product.description}
            </p>
            <p class="catalog__product-price">
              $${product.price}
            </p>
          </div>
        </li>
      `

      catalogList.insertAdjacentHTML('beforeend', html)
    })
    
    let cards = document.querySelectorAll('.catalog__product-item')
    cards.forEach((card) => {
      card.addEventListener('click', showPopup)
    })
  }

  function showPopup(e) {
    const card = e.target
    const name = card.querySelector('.catalog__product-title').innerText

    const jsonProduct = jsonList.find((product) => product.name === name)

    body.classList.add('off-scroll')

    createPopup(jsonProduct)

    const closeButton = document.querySelector('.popup__close')
    closeButton.addEventListener('click', closePopup)

    document.querySelector('.popup').addEventListener('click', closeOuter)
  }

  function createPopup(jsonProduct) {
    const popup = document.createElement('div')
    popup.classList.add('popup')

    const imgName = jsonProduct.name.split(' ').join('-')

    popup.innerHTML = `
      <div class="popup__catalog">
        <div class="popup__image-wrapper">
          <img class="popup__image" src="assets/images/${imgName}.jpg" alt="${jsonProduct.name}">
        </div>
        <div class="popup__content-wrapper">
          <h3 class="popup__title">${jsonProduct.name}</h3>
          <p class="popup__description">${jsonProduct.description}</p>
          <div class="popup__category-wrapper">
            <p class="popup__category">Size</p>
            <ul class="popup__category-list popup__sizes-list">
              <li class="popup__category-item">
                <button data-status='active' disabled='disabled' class="popup__category-button popup__button-size popup__category-button--active">
                  <span class="popup__category-index popup__category-type">S</span>
                  <span class="popup__category-text">${jsonProduct.sizes.s.size}</span>
                </button>
              </li>
              <li class="popup__category-item">
                <button class="popup__category-button popup__button-size">
                  <span class="popup__category-index popup__category-type">M</span>
                  <span class="popup__category-text">${jsonProduct.sizes.m.size}</span>
                </button>
              </li>
              <li class="popup__category-item">
                <button class="popup__category-button popup__button-size">
                  <span class="popup__category-index popup__category-type">L</span>
                  <span class="popup__category-text">${jsonProduct.sizes.l.size}</span>
                </button>
              </li>
            </ul>
          </div>
          <div class="popup__category-wrapper">
            <p class="popup__category">Additives</p>
            <ul class="popup__category-list popup__category-additives">
              <li class="popup__category-item">
                <button class="popup__category-button">
                  <span class="popup__category-index popup__category-type">1</span>
                  <span class="popup__category-text">${jsonProduct.additives[0].name}</span>
                </button>
              </li>
              <li class="popup__category-item">
                <button class="popup__category-button">
                  <span class="popup__category-index popup__category-type">2</span>
                  <span class="popup__category-text">${jsonProduct.additives[1].name}</span>
                </button>
              </li>
              <li class="popup__category-item">
                <button class="popup__category-button">
                  <span class="popup__category-index popup__category-type">3</span>
                  <span class="popup__category-text">${jsonProduct.additives[2].name}</span>
                </button>
              </li>
            </ul>
          </div>
          <div class="popup__price-wrapper">
            <p class="popup__price-title">
              Total:
            </p>
            <p class="popup__price">$${jsonProduct.price}</p>
          </div>
          <p class="popup__info-text">
            <svg class="popup__svg">
              <use xlink:href="assets/sprite.svg#info"></use>
            </svg>
            The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
          </p>
          <button class="popup__close">
            Close
          </button>
        </div>
      </div>
    `

    body.insertAdjacentHTML('beforeend', popup.outerHTML)

    /* Логика сетов */

    const categoryButtons = document.querySelectorAll('.popup__category-button')

    categoryButtons.forEach((button) => {
      button.addEventListener('click', setCategoryStatus) 
    })

    function setCategoryStatus(e) {
      const button = e.target.closest('.popup__category-button')
      const sizesList = document.querySelector('.popup__category-list')

      if (button.classList.contains('popup__button-size')) {
        const beforeButton = sizesList.querySelector('.popup__category-button--active')
        beforeButton.classList.remove('popup__category-button--active')
        beforeButton.removeAttribute('disabled')
        beforeButton.removeAttribute('data-status')

        button.setAttribute('disabled', 'disabled')
      }
      
      button.classList.toggle('popup__category-button--active')
      button.toggleAttribute('data-status')

      countPrice()
    }

    function countPrice() {
      const sizesList = document.querySelector('.popup__category-list')
      const priceText = document.querySelector('.popup__price')
      const sizeButton = sizesList.querySelector('.popup__category-button--active')
      const buttonTypeSize = sizeButton.querySelector('.popup__category-type')

      const basePrice = +jsonProduct.price
      let typePrice = +jsonProduct.sizes[buttonTypeSize.innerText.toLowerCase()]['add-price']
      let additivesPrice = 0

      const setButtons = document.querySelectorAll('.popup__category-additives .popup__category-button')
      setButtons.forEach((button) => {
        if (button.hasAttribute('data-status')) {
          const type = button.querySelector('.popup__category-type')
          additivesPrice += +jsonProduct.additives[+type.innerText - 1]['add-price']
        }
      }) 

      const finalPrice = typePrice + basePrice + additivesPrice

      priceText.innerText = `$${finalPrice.toFixed(2)}`
    }
  }

  function closeOuter(e) {
    if(e.target.classList.value === 'popup') {
      closePopup()
    }
  }

  function closePopup() {
    body.classList.remove('off-scroll')
    document.querySelector('.popup').remove()
  }

  generateCards('coffee')
}