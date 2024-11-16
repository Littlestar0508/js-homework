const user = {
  id: 'asd@naver.com',
  pw: 'spdlqj123!@',
};

/*

1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

*/

function emailReg(text) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

let email = false; // email의 유효성 검사의 판별 저장하기 위한 변수
let pwd = false; // pwd의 유효성 검사의 판별을 저장하기 위한 변수

const emailValidate = getNode('.user-email-input'); // email입력란의 node를 추출

//email 유효성 검사를 위한 함수
function validationEmail() {
  if (!emailReg(this.value)) {
    emailValidate.classList.add('is--invalid');
    email = false;
  } else {
    emailValidate.classList.remove('is--invalid');
    email = true;
  }
}

// email 입력란에 이벤트를 추가
emailValidate.addEventListener('input', validationEmail);

// 비밀번호 입력란의 node를 추출
const pwdValidate = getNode('.user-password-input');

// 비밀번호 유효성 검사를 위한 함수
function validationPWD() {
  if (!pwReg(this.value)) {
    pwdValidate.classList.add('is--invalid');
    pwd = false;
  } else {
    pwdValidate.classList.remove('is--invalid');
    pwd = true;
  }
}

// 비밀번호 입력란에 이벤트를 추가
pwdValidate.addEventListener('input', validationPWD);

// 로그인 버튼의 node를 추출
const btn = getNode('.btn-login');

// 페이지 이동을 위한 함수
function movePage(e) {
  if (email === true && pwd === true) {
    window.location.href = 'welcome.html';
  }
  e.preventDefault();
}

// 버튼에 click이벤트 추가
btn.addEventListener('click', movePage);
