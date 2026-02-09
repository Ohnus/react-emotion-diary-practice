import "./App.css";
import {
  useReducer,
  useRef,
  createContext,
  useMemo,
  useEffect,
  useState,
} from "react";
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

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    // 어차피 localStorage에서 불러 온 값이므로 nextState에 담을 필요 x
    case "INIT":
      return action.data;
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id)
          ? action.data
          : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter(
        (item) => String(item.id) !== String(action.id)
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  // useEffect로 인해 자식 컴포넌트들이 빈 state 받는 것 방지하는 로딩
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  // 후위 연산이므로 객체 마지막 id + 1을 기본 값으로
  const idRef = useRef(0);

  // 앱 컴포넌트 마운트 되고 나서 localStorage에서 불러와서 data 초기값 설정
  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

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

  // 로딩
  if (isLoading) {
    return <div>데이터 로딩중 입니다..</div>;
  }

  return (
    // Routes 컴포넌트 내에 Route 컴포넌트로 각 페이지 컴포넌트 설정
    // 요청한 경로와 동일한 path prop을 위에서부터 아래로 찾는다.
    // Notfound의 path prop은 wildcard로 switch문의 default 느낌
    // 일치하는 경로가 없을 때 Notfound 컴포넌트 렌더링
    // Routes 컴포넌트 안에는 Route 컴포넌트만 들어갈 수 있다.
    // Routes 컴포넌트 밖의 요소는 Routes 안의 모든 페이지에서 렌더링된다.
    <>
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
