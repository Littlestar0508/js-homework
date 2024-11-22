/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

// querySelector의 사용이 많아 getNode로 정정
const getNode = (node, context = document) => {
  if (context.nodeType !== 9) {
    context = document.querySelector(context);
  }
  return context.querySelector(node);
};

const getNodes = (node, context = document) => {
  if (context.nodeType !== 9) {
    context = document.querySelector(context);
  }
  return context.querySelectorAll(node);
};

const nav = getNode('.nav');

//배경색 바꾸기 함수
const setBgColor = (colorA, colorB = '#000') => {
  const body = getNode('body');

  body.style.background = `linear-gradient(to bottom, ${colorA},${colorB})`;
};

// 이미지 변경 함수
const setImage = ({ alt, name }) => {
  const visual = getNode('.visual img');

  visual.alt = alt;
  visual.src = `./assets/${name}.jpeg`;
};

// 제목 변경 함수
const setNameText = (name) => {
  const title = getNode('.nickName');

  title.textContent = name;
};

// is-actvie할당 함수
const setIsActive = (node) => {
  // li태그 모두 imgList에 저장
  const imgList = getNodes('ul > li');

  imgList.forEach((v) => {
    v.classList.remove('is-active');
  });

  node.classList.add('is-active');
};

// 클릭 이벤트 핸들러
const handleClick = (e) => {
  // li 영역 선택(img를 클릭했어도 li를 반환하도록 closest사용)
  const li = e.target.closest('li');

  // 만약 li의 영역을 빠져 나갔다면 이벤트 실행X
  if (!li) return;

  setIsActive(li);

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

// 이벤트 할당
nav.addEventListener('click', handleClick);
