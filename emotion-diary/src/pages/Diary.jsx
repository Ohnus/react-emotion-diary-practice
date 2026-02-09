import { useParams, useNavigate } from "react-router-dom";
import useDiary from "./../hooks/useDiary";
import Header from "./../components/Header";
import Button from "./../components/Button";
import Viewer from "./../components/Viewer";
import { getStringedDate } from "../util/get-stringed-date";
import usePageTitle from "../hooks/usePageTitle";

const Diary = () => {
  const nav = useNavigate();
  const params = useParams();

  usePageTitle(`${params.id}번 일기`);

  // useEffect 활용한 커스텀 훅
  // useDiary에서 state가 빈 값이므로 undefined
  // 마운트 이후 return으로 state에 값 저장하므로
  // undefined일 경우 대비 세워야 함
  const curDiaryItem = useDiary(params.id);

  if (!curDiaryItem) {
    return <div>데이터 로딩중..</div>;
  }

  const { createdDate, emotionId, content } = curDiaryItem;
  const headerTitle = getStringedDate(new Date(createdDate));

  return (
    <div>
      <div>
        <Header
          title={`${headerTitle} 기록`}
          leftChild={
            <Button onClick={() => nav(-1)} text="< 뒤로 가기" />
          }
          rightChild={
            <Button
              onClick={() => nav(`/edit/${params.id}`)}
              text="수정하기"
            />
          }
        />
        <Viewer emotionId={emotionId} content={content} />
      </div>
    </div>
  );
};

export default Diary;
