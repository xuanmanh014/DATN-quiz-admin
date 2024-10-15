import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import RootLayout from "./layouts"
import QuizPage from "./pages/quiz"
import { useEffect } from "react";
import AuthPage from "./pages/auth";
import TopicPage from "./pages/topic";

function App() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const accessToken = localStorage.getItem("AccessToken");

    useEffect(() => {
        if (pathname === "/") {
            navigate("/quiz");
        }
    }, [])

    return (
        <Routes>
            <Route element={accessToken ? <RootLayout /> : <Navigate to={"/auth"} />}>
                <Route path="/*" element={<QuizPage />} />
                <Route path="/quiz/*" element={<QuizPage />} />
                <Route path="/topic/*" element={<TopicPage />} />
            </Route>

            <Route path="/auth" element={!accessToken ? <AuthPage /> : <Navigate to={"/quiz"} />} />
        </Routes>
    )
}

export default App
