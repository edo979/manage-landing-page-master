const slidesEl = document.querySelectorAll('.slider_slide'),
  sliderBtnEls = document.querySelectorAll('.slider_button'),
  slidesContainerEl = document.getElementById('slides-container')

let currentSlide = 0
setSlideNavigation()
let intervalId = startSlideShow()

function startSlideShow() {
  return setInterval(() => nextSlide(), 8 * 1000)
}

function nextSlide() {
  currentSlide++

  if (currentSlide > slidesEl.length - 1) {
    currentSlide = 0
  }

  showSlide()
  setSlideNavigation()
}

function showSlide() {
  slidesContainerEl.style.transform = `translateX(-${currentSlide * 100}%)`
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
