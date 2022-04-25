const slidesEl = document.querySelectorAll('.slider_slide'),
  sliderProgress = document.getElementById('slider-progress'),
  slidesContainerEl = document.getElementById('slides-container'),
  navEl = document.getElementById('nav-container'),
  navOpenEl = document.getElementById('nav-open'),
  navCloseEl = document.getElementById('nav-close'),
  emailBtn = document.getElementById('submitt-email'),
  emailEl = document.getElementById('email'),
  formEl = document.getElementById('email-form')

// NAVIGATION:

navOpenEl.addEventListener('click', (e) => navEl.classList.add('colapsed'))

navCloseEl.addEventListener('click', (e) => navEl.classList.remove('colapsed'))

// SLIDER:

let currentSlide = 0,
  numOfSlides = 0,
  slideOffset = 0,
  sliderBtnEls

let intervalId = startSlideShow()
createSlideNavigationButtons()
setSlideNavigation()

function createSlideNavigationButtons() {
  for (let index = 0; index < numOfSlides; index++) {
    const btn = document.createElement('button')
    btn.classList.add('slider_button')

    sliderProgress.appendChild(btn)
  }

  sliderBtnEls = document.querySelectorAll('.slider_button')
}

function startSlideShow() {
  const slideWidth = slidesEl[0].offsetWidth,
    slideContainerWidth = slidesContainerEl.offsetWidth,
    slidesPerView = parseInt(slideContainerWidth / slideWidth),
    totalViews = Math.ceil(slidesEl.length / slidesPerView)

  numOfSlides = totalViews
  slideOffset = slideWidth

  return setInterval(() => nextSlide(), 8 * 1000)
}

function nextSlide() {
  currentSlide++

  if (currentSlide > numOfSlides - 1) {
    currentSlide = 0
  }

  showSlide()
  setSlideNavigation()
}

function showSlide() {
  slidesContainerEl.style.transform = `translateX(-${
    currentSlide * slideOffset
  }px)`
}

function setSlideNavigation() {
  sliderBtnEls.forEach((btn) => btn.classList.remove('active'))

  sliderBtnEls[currentSlide].classList.add('active')
}

// change slide on btn click
sliderBtnEls.forEach((btn, i) => {
  btn.addEventListener('click', (e) => gotoSlide(i))
})

function gotoSlide(slideNum) {
  clearInterval(intervalId)

  currentSlide = slideNum

  showSlide()
  setSlideNavigation()

  intervalId = startSlideShow()
}

// EMAIL VALIDATION:
emailBtn.addEventListener('click', (e) => {
  e.preventDefault()

  const email = emailEl.value,
    re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (email && re.test(email)) {
    // call function if email valid
  } else {
    formEl.classList.add('invalid')

    setTimeout(() => formEl.classList.remove('invalid'), 5 * 1000)
  }
})
