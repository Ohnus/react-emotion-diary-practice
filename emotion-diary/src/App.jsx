import "./App.css";
// 경로로 페이지에 접근하기 위해 Routes, Route 컴포넌트 호출
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import New from "./pages/New.jsx";
import Diary from "./pages/Diary.jsx";
import Notfound from "./pages/Notfound.jsx";

// 페이지 설정
// 1. "/": 모든 일기를 조회하는 Home 페이지
// 2. "/new": 새로운 일기를 작성하는 New 페이지
// 3. "/diary": 일기를 상세히 조회하는 Diary 페이지
function App() {
  return (
    // Routes 컴포넌트 내에 Route 컴포넌트로 각 페이지 컴포넌트 설정
    // 요청한 경로와 동일한 path prop을 위에서부터 아래로 찾는다.
    // Notfound의 path prop은 wildcard로 switch문의 default 느낌
    // 일치하는 경로가 없을 때 Notfound 컴포넌트 렌더링
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/diary" element={<Diary />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
