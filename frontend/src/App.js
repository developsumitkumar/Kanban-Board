import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BoardListPage from "./pages/BoardListPage";
import BoardPage from "./pages/BoardPage";
import TopBar from "./components/TopBar";

function AppLayout() {
  // layout that includes TopBar
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* no TopBar here */}
        <Route path="/" element={<LandingPage />} />

        {/* everything inside this uses TopBar */}
        <Route element={<AppLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/boards" element={<BoardListPage />} />
          <Route path="/boards/:boardId" element={<BoardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
