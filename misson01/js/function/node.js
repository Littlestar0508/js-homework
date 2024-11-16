const getNode = (node, context = document) => {
  if (context.nodeType !== 9) {
    //element node가 아니라면 element node로 변환해주는 재귀함수
    context = getNode(context);
  }

  return context.querySelector(node); // context가 있다면 context를 설정하고 그 안에서 node의 값을 return
};

const getNodes = (node, context = document) => {
  if (context.nodeType !== 9) {
    //element node가 아니라면 element node로 변환해주는 재귀함수
    context = getNode(context);
  }

  return context.querySelectorAll(node); // context가 있다면 context를 설정하고 그 안에서 node의 값을 return
};
