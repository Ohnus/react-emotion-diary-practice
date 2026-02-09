import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext, DiaryDispatchContext } from "../App";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const data = useContext(DiaryStateContext);
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
  const [curDiaryItem, setCurDiaryItem] = useState();

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(params.id)
    );

    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
  }, [params.id]);

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
