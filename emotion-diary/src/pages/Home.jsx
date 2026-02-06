import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

const getMonthlyData = (pivotDate, data) => {
  // 현재 날짜의 시작일과 말일 사이의 데이터를 필터하는 방법
  // 타임스탬프로 변환하여 넘버 타입으로 비교
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();

  // 현재 날짜의 다음 달 0일로 설정하면, 전월이 설정됨
  // ex) 3월 0일 -> 2월28일
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter(
    (item) =>
      beginTime <= item.createdDate && item.createdDate <= endTime
  );
  // 현재 날짜의 연도, 월만 비교해서 배열 필터하는 방법
  // return data.filter(
  //   (item) =>
  //     new Date(item.createdDate).getFullYear() ===
  //       pivotDate.getFullYear() &&
  //     new Date(item.createdDate).getMonth() === pivotDate.getMonth()
  // );
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  // pivotDate: 현재 일기의 기준이 되는 날짜
  const [pivotDate, setPivotDate] = useState(new Date());
  const monthlyData = getMonthlyData(pivotDate, data);

  const onIncreaseMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1)
    );
  };
  const onDecreaseMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1)
    );
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      <div></div>
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
