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

// 소리 객체 저장
const sound = {
  EMBER: new AudioPlayer('./assets/audio/ember.m4a'),
  WADE: new AudioPlayer('./assets/audio/Wade.m4a'),
  CLOD: new AudioPlayer('./assets/audio/Clod.m4a'),
  GALE: new AudioPlayer('./assets/audio/Gale.m4a'),
};

const nav = getNode('.nav');
const visual = getNode('.visual img');
const title = getNode('.nickName');
const imgList = getNodes('ul > li');

//배경색 바꾸기 함수
const setBgColor = (colorA, colorB = '#000') => {
  document.body.style.background = `linear-gradient(to bottom, ${colorA},${colorB})`;
};

// 이미지 변경 함수
const setImage = ({ alt, name }) => {
  visual.alt = alt;
  visual.src = `./assets/${name}.jpeg`;
};

// 제목 변경 함수
const setNameText = (name) => {
  title.textContent = name;
};

// is-actvie할당 함수
const setIsActive = (node) => {
  // li태그 모두 imgList에 저장

  imgList.forEach((v) => {
    v.classList.remove('is-active');
  });

  node.classList.add('is-active');
};

// 대표 이미지 변경시 소리 이벤트 함수
const changeSound = (index) => {
  for (const key in sound) {
    sound[key].stop();
  }

  sound[data[index - 1].name].play();
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

  // 소리 재생
  changeSound(index);

  // gsap 애니메이션 적용
  gsap.fromTo(
    '.is-active',
    {
      x: -30,
      y: 30,
      opacity: 0,
    },
    { x: 0, y: 0, opacity: 1 }
  );
};

// 이벤트 할당
nav.addEventListener('click', handleClick);
