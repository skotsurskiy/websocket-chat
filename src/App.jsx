import './App.scss'
import ChatWindow from "./pages/ChatWindow/ChatWindow.jsx";
import AuthorizationSection from "./pages/Authorization/AuthorizationSection.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import ProfileSection from "./pages/Profile/ProfileSection.jsx";

export default function App() {
  const token = useSelector(state => state.token.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <ChatWindow /> : <Navigate to="/auth/login" />} />

        <Route path="/auth/*" element={<AuthorizationSection />} />

        <Route path="*" element={<h2>404 Page not found</h2>} />

        <Route path="/me" element={<ProfileSection />} />
      </Routes>
    </BrowserRouter>
  )
}
