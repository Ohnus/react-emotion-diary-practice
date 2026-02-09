import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import useDiary from "./../hooks/useDiary";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import usePageTitle from "../hooks/usePageTitle";

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);

  usePageTitle(`${params.id}번 일기 수정하기`);

  // useEffect 호출하는 커스텀 훅
  const curDiaryItem = useDiary(params.id);
  console.log(curDiaryItem);

  const onClickDelete = () => {
    if (
      window.confirm(
        "일기를 정말 삭제할까요? 삭제한 일기는 복구되지 않습니다."
      )
    ) {
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(
        input.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <div>
        <Header
          title="일기 수정하기"
          leftChild={
            <Button onClick={() => nav(-1)} text="< 뒤로 가기" />
          }
          rightChild={
            <Button
              onClick={onClickDelete}
              text="삭제하기"
              type="NEGATIVE"
            />
          }
        />
        <Editor onSubmit={onSubmit} initData={curDiaryItem} />
      </div>
    </div>
  );
};

export default Edit;
