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
const imgList = getNodes('ul > li');

// INDEX설정을 위한 i 값
let i = 0;

//배경색 이미지 함수
const setBgIMG = (url) => {
  document.body.style.backgroundImage = `url(${url})`;
};

// 이미지 변경 함수
const setImage = (alt, url) => {
  visual.alt = alt;
  visual.src = url;
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

const handleClick = (e) => {
  // li 영역 선택(img를 클릭했어도 li를 반환하도록 closest사용)
  const li = e.target.closest('li');
  const img = getNode('img', li);

  // 만약 li의 영역을 빠져 나갔다면 이벤트 실행X
  if (!li) return;

  setIsActive(li);

  // data-index의 값과 그에 해당하는 data를 index와 dataSet에 저장
  const index = li.dataset.index;

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

// 앨범 정보 가져오는 함수

const getAlbum = async (artist, albumName) => {
  const result = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=ed010a27ee3ead3137b0fe3ef45b9187&artist=${artist}&album=${albumName}&format=json`
  );

  const data = await result.json();
  console.log(data);
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

getAlbumData();

// 이벤트 할당
nav.addEventListener('click', handleClick);
