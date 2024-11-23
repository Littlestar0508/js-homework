// querySelector의 사용이 많아 getNode로 정정
const getNode = (node, context = document) => {
  if (context.nodeType !== 9 && typeof context === 'string') {
    context = document.querySelector(context);
  }
  return context.querySelector(node);
};

const getNodes = (node, context = document) => {
  if (context.nodeType !== 9 && typeof context === 'string') {
    context = document.querySelector(context);
  }
  return context.querySelectorAll(node);
};

const nav = getNode('.nav');
const visual = getNode('.visual img');
const title = getNode('.nickName');

// INDEX설정을 위한 i 값
let i = 0;

// 앨범의 정보를 fetch해오는 함수
const getAlbum = async (artist, albumName) => {
  const result = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=ed010a27ee3ead3137b0fe3ef45b9187&artist=${artist}&album=${albumName}&format=json`
  );

  const data = await result.json();

  const template = `
      <li data-index="${++i}">
      <button>
        <img src="${data.album.image[4]['#text']}" alt="${data.album.artist} - ${data.album.name} 앨범" />
      </button>
    </li>`;

  getNode('ul').insertAdjacentHTML('beforeend', template);
};

// 앨범 자켓 li항목으로 추가하는 함수
const getAlbumData = async () => {
  await getAlbum('쏜애플', '계몽');
  await getAlbum('검정치마', 'TEAM+BABY');
  await getAlbum('윤하', 'resCuE');
  await getAlbum('장범준', '장범준+2집');
};

// is-actvie할당 함수
const setIsActive = (node) => {
  // 비동기 통신으로 li가 이후에 생기므로 함수 내부에 li모음을 생성
  // li태그 모두 imgList에 저장
  const imgList = getNodes('ul li');

  imgList.forEach((v) => {
    v.classList.remove('is-active');
  });

  node.classList.add('is-active');
};

// 제목 변경 함수
const setNameText = (name) => {
  title.textContent = name;
};

// 이미지 변경 함수
const setImage = (alt, url) => {
  visual.alt = alt;
  visual.src = url;
};

//배경색 이미지 함수
const setBgIMG = (url) => {
  document.body.style.backgroundImage = `url(${url})`;
};

const handleClick = (e) => {
  // li 영역 선택(img를 클릭했어도 li를 반환하도록 closest사용)
  const li = e.target.closest('li');
  if (!li) return;

  const img = getNode('img', li);

  // 만약 li의 영역을 빠져 나갔다면 이벤트 실행X

  setIsActive(li);

  // 제목 변경
  setNameText(img.alt);

  // 사진 바꾸기

  setImage(img.alt, img.src);

  // 배경색 바꾸기
  setBgIMG(img.src);

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

// li태그 생성
getAlbumData();

// 이벤트 할당
nav.addEventListener('click', handleClick);
