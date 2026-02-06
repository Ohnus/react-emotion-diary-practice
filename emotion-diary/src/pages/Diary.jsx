// URL 파라미터를 사용하기 위한 훅
import { useParams } from "react-router-dom";

const Diary = () => {
  const params = useParams();
  console.log(params);

  return <div>{params.id}번 일기입니다.</div>;
};

export default Diary;
