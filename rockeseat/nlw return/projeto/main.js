window.addEventListener('scroll', onScroll)
onScroll()

function onScroll() {
  showNavOnScroll()
  showBackToTopButtonOnScroll()

  activateMenuAtCurrentSection(home)
  activateMenuAtCurrentSection(services)
  activateMenuAtCurrentSection(about)
  activateMenuAtCurrentSection(contact)
}

function showNavOnScroll() {
  //por estar com erro de js no navegador, adicionei a class manualmente no html
  if (scrollY > 0) {
    document.navigation.classList.add('scroll')
    alert('adicionou a classe scroll no navigation')
  } else {
    document.navigation.classList.remove('scroll')
    alert('removeu a classe scroll no navigation')
  }
}

function showBackToTopButtonOnScroll() {
  //por estar com erro de js no navegador, adicionei a class manualmente no html
  if (scrollY > 300) {
    document.backToTopButton.classList.add('show')
  } else {
    document.backToTopButton.classList.remove('show')
  }
}

function openMenu() {
  document.body.classList.add('menu-expanded')
}

function closeMenu() {
  document.body.classList.remove('menu-expanded')
}

ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700
}).reveal(`#home,
  #home img,
  #home .stats,
  #services,
  #services header,
  #services .card
  #about,
  #about header,
  #about .content
`)

function activateMenuAtCurrentSection() {
  const targetLine = scrollY + innerHeight / 2 // linha alvo

  // verificar se a seção passou da linha
  // quais dados vou precisar?
  const sectionTop = section.offsetTop // o topo da seção
  const sectionHeight = section.offsetHeight // a altura da seção
  const sectionTopReachOrPassedTargetline = targetLine >= sectionTop // o topo da seção chegou ou passou da linha alvo?

  // verificar se a base está abaixo da linha alvo
  const sectionEndsAt = sectionTop + sectionHeight // o final da seção
  const sectionEndPassedTargetline = sectionEndsAt <= targetLine // o final da seção chegou ou passou da linha alvo?

  // limites da seção
  const sectionBoundaries =
    sectionTopReachOrPassedTargetline && !sectionEndPassedTargetline

  const sectionId = section.getAttribute('id')
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`)

  menuElement.classList.remove('active')
  if (sectionBoundaries) {
    menuElement.classList.add('active')
  }
}
