export default function toggleMenu() {
  const button = document.querySelector('.main-header__burger-menu') 
  const nav = document.querySelector('.main-header__nav') 
  const menuLink = document.querySelector('.main-header__menu-wrap')
  const headerContainer = document.querySelector('.main-header .container')
  const body = document.querySelector('body')
  const headerLinks = document.querySelectorAll('.main-header__link')

  const handlerMenu = () => {
    if (document.documentElement.clientWidth < 801) {
      nav.classList.toggle('main-header__nav--opened')
      body.classList.toggle('off-scroll')
      button.classList.toggle('main-header__burger-menu--opened')

      window.scrollTo(0, 0)
    }
  }

  headerLinks.forEach((link) => {
    link.addEventListener('click', handlerMenu)
  })

  const handlerResize = () => {
    if (document.documentElement.clientWidth > 800) {
      nav.classList.remove('main-header__nav--opened')
      if (!document.querySelector('.popup')) body.classList.remove('off-scroll')
      button.classList.remove('main-header__burger-menu--opened')

      headerContainer.append(nav)
      headerContainer.append(menuLink)
    } else {
      nav.append(menuLink)
      body.prepend(nav)
    }
  }

  button.addEventListener('click', handlerMenu)

  handlerResize() // Отработать один раз во время загрузки страницы
  window.addEventListener('resize', handlerResize)
}