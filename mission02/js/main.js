/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

const container = document.querySelector('.container');
const nav = document.querySelector('.nav');
const imgList = document.querySelectorAll('ul > li');
const title = document.querySelector('.nickName');
const visual = document.querySelector('.visual img');

const handleClick = (e) => {
  // 흰색 테두리 바꾸기
  const li = e.target.closest('li');

  if (!li) return;

  imgList.forEach((v) => {
    v.classList.remove('is-active');
  });

  li.classList.add('is-active');

  // 사진 바꾸기
  const index = li.dataset.index;
  title.textContent = data[index - 1].name;
  visual.alt = data[index - 1].alt;
  visual.src = `./assets/${data[index - 1].name}.jpeg`;
  document.body.style.background = `linear-gradient(to bottom,${data[index - 1].color[0]},${data[index - 1].color[1]})`;
};

nav.addEventListener('click', handleClick);
