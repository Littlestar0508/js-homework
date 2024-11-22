/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

const container = document.querySelector('.container');
const nav = document.querySelector('.nav');

//배경색 바꾸기 함수
const setBgColor = (colorA, colorB = '#000') => {
  const body = document.body;

  body.style.background = `linear-gradient(to bottom, ${colorA},${colorB})`;
};

// 이미지 변경 함수
const setImage = ({ alt, name }) => {
  const visual = document.querySelector('.visual img');

  visual.alt = alt;
  visual.src = `./assets/${name}.jpeg`;
};

// 제목 변경 함수
const setNameText = (name) => {
  const title = document.querySelector('.nickName');

  title.textContent = name;
};

// 클릭 이벤트 핸들러
const handleClick = (e) => {
  const imgList = document.querySelectorAll('ul > li');

  // 흰색 테두리 바꾸기
  const li = e.target.closest('li');

  // 만약 li의 영역을 빠져 나갔다면 이벤트 실행X
  if (!li) return;

  imgList.forEach((v) => {
    v.classList.remove('is-active');
  });

  li.classList.add('is-active');

  // data-index의 값과 그에 해당하는 data를 index와 dataSet에 저장
  const index = li.dataset.index;

  const dataSet = data[index - 1];

  // 제목 변경
  setNameText(dataSet.name);

  // 사진 바꾸기

  setImage(dataSet);

  // 배경색 바꾸기
  setBgColor(dataSet.color[0], dataSet.color[1]);
};

nav.addEventListener('click', handleClick);
