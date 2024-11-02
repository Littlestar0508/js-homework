// object와 key를 입력받아 판단하는 함수
function getValueAtObject(obj, key) {
  //만약 object 내부에 key를 가지고 있다면 key에 해당하는 value를 리턴하는 조건문
  if (Object.keys(obj).includes(key)) {
    return obj[key];

    //만약 condition이 만족하지 않았다면 Error 발생 -> 메세지는 Error !
  } else {
    return new Error("Error !");
  }
}

const person = {
  undefined: undefined,
  un: null,
  name: "Alice",
  age: 25,
  city: "Wonderland",
};

//key에 해당하는 value가 적절하게 출력됨
console.log(getValueAtObject(person, "name")); // 'Alice'
console.log(getValueAtObject(person, "age")); // 25
console.log(getValueAtObject(person, "city")); // 'Wonderland'
//country라는 key값은 없으니 Error를 반환
console.error(getValueAtObject(person, "country")); // Error !

// undefined와 null 테스트
console.log(getValueAtObject(person, "undefined")); // undefined
console.log(getValueAtObject(person, "un")); // null

/* --------------------------------------------- */

//배열과 index를 전달받아 값을 출력하는 함수
function getNumberAtArray(arr, index) {
  //만약 index가 음수이거나 혹은 index가 배열 내부에 존재하지 않는다면 Error를 반환하는 조건문
  if (index < 0 || index >= arr.length) {
    return new Error("Error !");

    //condition이 만족하지 않았다면 배열 내부에 정상적으로 있는 것이므로 배열의 index에 해당하는 값을 반환
  } else {
    return arr[index];
  }

  // 시행착오 코드
  // if (arr[index] === undefined) {
  //   return new Error("Error !");
  // } else {
  //   return arr[index];
  // }
}

const numbers = [10, 20, 30, 40, 50, undefined];

//배열 내부에 2,4 index는 존재하므로 값을 반환
console.log(getNumberAtArray(numbers, 2)); // 30
console.log(getNumberAtArray(numbers, 4)); // 50
console.error(getNumberAtArray(numbers, 5)); // Undefined

//배열 내부에 -1이라는 index는 존재하지 않으므로 Error를 반환
console.error(getNumberAtArray(numbers, -1)); // Error!
