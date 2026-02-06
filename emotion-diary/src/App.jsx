import "./App.css";
import { useReducer, useRef, createContext, useMemo } from "react";
// 경로로 페이지에 접근하기 위해 Routes, Route 컴포넌트 호출
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import New from "./pages/New.jsx";
import Diary from "./pages/Diary.jsx";
import Edit from "./pages/Edit.jsx";
import Notfound from "./pages/Notfound.jsx";

import Button from "./components/Button.jsx";
import Header from "./components/Header.jsx";

import { getEmotionImage } from "./util/get-emotion-image.js";

// 페이지 설정
// 1. "/": 모든 일기를 조회하는 Home 페이지
// 2. "/new": 새로운 일기를 작성하는 New 페이지
// 3. "/diary": 일기를 상세히 조회하는 Diary 페이지

const mockData = [
  {
    id: 1,
    createdDate: new Date().getTime(),
    emotionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdDate: new Date().getTime(),
    emotionId: 2,
    content: "2번 일기 내용",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id)
          ? action.data
          : item
      );
    case "DELETE":
      return state.filter(
        (item) => String(item.id) !== String(action.id)
      );
    default:
      return state;
  }
}

const DiaryStateContext = createContext();
const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  const memoizedData = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    // Routes 컴포넌트 내에 Route 컴포넌트로 각 페이지 컴포넌트 설정
    // 요청한 경로와 동일한 path prop을 위에서부터 아래로 찾는다.
    // Notfound의 path prop은 wildcard로 switch문의 default 느낌
    // 일치하는 경로가 없을 때 Notfound 컴포넌트 렌더링
    // Routes 컴포넌트 안에는 Route 컴포넌트만 들어갈 수 있다.
    // Routes 컴포넌트 밖의 요소는 Routes 안의 모든 페이지에서 렌더링된다.
    <>
      <button
        onClick={() => {
          onCreate(new Date().getTime(), 1, "Hello");
        }}
      >
        일기 추가 테스트
      </button>
      <button
        onClick={() => {
          onUpdate(1, new Date().getTime(), 3, "Bye");
        }}
      >
        일기 수정 테스트
      </button>
      <button
        onClick={() => {
          onDelete(3);
        }}
      >
        일기 삭제 테스트
      </button>

      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
