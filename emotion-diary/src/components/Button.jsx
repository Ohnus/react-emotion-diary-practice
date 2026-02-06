import "./Button.css";

// 다양한 곳에서 사용되기 때문에 매개변수에 Props를 객체 구조 분해 할당으로..
// -> text: 동작별 이름
// -> type: 동작 타입(생성, 수정, 삭제 등)별로 디자인, 함수 설정
// -> onClick: 동작 함수
const Button = ({ text, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`Button Button_${type}`}
    >
      {text}
    </button>
  );
};

export default Button;
