import { useEffect } from "react";

const usePageTitle = (title) => {
  // 페이지마다 다른 타이틀 만들어보자
  // 마운트 될 때 요소 조작
  // 변수 앞에 $ 사인 있는 것은 관례상 해당 변수에 DOM 요소가 저장될 것이라는 의미
  useEffect(() => {
    const $title = document.getElementsByTagName("title")[0];
    $title.innerText = title;
  });
};

export default usePageTitle;
