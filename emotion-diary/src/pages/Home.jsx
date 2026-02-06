import { useSearchParams } from "react-router-dom";

const Home = () => {
  // params: 넘어온 파라미터 값이 담겨있는 객체
  // setParams: 넘어온 파라미터를 조작할 수 있는 함수(Like State)
  const [params, setParams] = useSearchParams();
  console.log(params.get("value"));

  return <div>Home</div>;
};

export default Home;
