const colorData = [
  '#0D0D0D',
  '#98AADA',
  '#B6CDBB',
  '#9996B1',
  '#CEA7A0',
  '#B78EC6',
  '#B7B5CD',
  '#F2B705',
];

const swiper = new Swiper('.swiper', {
  nested: true,
  effect: 'cards',
  normalizeSlideIndex: true,
  direction: 'horizontal',
  autoplay: {
    delay: 3000,
  },

  on: {
    slideChangeTransitionEnd: function () {
      const container = document.querySelector('.container');

      container.style.backgroundImage = `url('assets/bgImg${this.activeIndex}.jpg')`;

      document.body.style.backgroundColor = colorData[this.activeIndex];
    },
  },
});
